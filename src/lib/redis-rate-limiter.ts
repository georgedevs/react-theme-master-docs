import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limit configuration
export const RATE_LIMIT_CONFIG = {
  REQUESTS_PER_DAY: 50, // Maximum requests per day
  MESSAGES_PER_CHAT: 10, // Maximum messages per chat
};

/**
 * Check if an IP has exceeded the rate limit
 * @param ip IP address to check
 * @returns Object with rate limit information
 */
export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetAt: number;
}> {
  const now = Date.now();
  
  // Calculate today's key (resets at midnight)
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const key = `rate-limit:${ip}:${today}`;
  
  // Calculate expiry time (end of day)
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 999);
  const expirySeconds = Math.ceil((midnight.getTime() - now) / 1000);
  
  try {
    // Increment count and set expiry
    const count = await redis.incr(key);
    
    // Set expiry if this is a new key
    if (count === 1) {
      await redis.expire(key, expirySeconds);
    }
    
    // Get TTL to determine reset time
    const ttl = await redis.ttl(key);
    const resetAt = now + (ttl * 1000);
    
    // Check if limit reached
    const remaining = Math.max(0, RATE_LIMIT_CONFIG.REQUESTS_PER_DAY - count);
    const allowed = count <= RATE_LIMIT_CONFIG.REQUESTS_PER_DAY;
    
    return {
      allowed,
      remaining,
      resetAt
    };
  } catch (error) {
    console.error('Redis rate limit error:', error);
    
    // Fail open if Redis is unavailable
    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.REQUESTS_PER_DAY - 1,
      resetAt: midnight.getTime()
    };
  }
}

/**
 * Track chat message count
 * @param chatId Chat ID to track
 * @returns Updated count and whether limit was reached
 */
export async function trackChatMessage(chatId: string): Promise<{
  count: number;
  limitReached: boolean;
}> {
  const key = `chat-messages:${chatId}`;
  
  try {
    // Increment the message count
    const count = await redis.incr(key);
    
    // Set expiry if this is a new chat (30 days)
    if (count === 1) {
      await redis.expire(key, 60 * 60 * 24 * 30); // 30 days
    }
    
    return {
      count,
      limitReached: count >= RATE_LIMIT_CONFIG.MESSAGES_PER_CHAT
    };
  } catch (error) {
    console.error('Redis chat tracking error:', error);
    
    // Fail open if Redis is unavailable
    return {
      count: 1,
      limitReached: false
    };
  }
}

/**
 * Reset chat message count
 * @param chatId Chat ID to reset
 */
export async function resetChatCount(chatId: string): Promise<void> {
  try {
    await redis.del(`chat-messages:${chatId}`);
  } catch (error) {
    console.error('Redis reset error:', error);
  }
}