# React Theme Master Documentation

This repository contains the official documentation and showcase website for [React Theme Master](https://github.com/georgedevs/react-theme-master), a flexible theme management system for React applications with Tailwind CSS integration.

## Overview

The React Theme Master documentation site provides:

- Comprehensive guides and API references
- Interactive examples and code samples
- Live playground for experimenting with themes
- Theme builder for creating custom themes
- Showcase of different theme configurations

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/georgedevs/react-theme-master-docs.git
cd react-theme-master-docs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── (docs)/           # Documentation pages
│   ├── (marketing)/      # Landing and marketing pages
│   └── layout.tsx        # Root layout
├── components/           # UI components
│   ├── layout/           # Layout components
│   ├── playground/       # Interactive playground components
│   ├── theme-showcase/   # Theme showcase components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
└── theme/                # Theme-related constants
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Theme Master](https://github.com/georgedevs/react-theme-master) - Theming library
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Contributing

Contributions to improve the documentation are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [React Theme Master](https://github.com/georgedevs/react-theme-master) - The core package repository

## Acknowledgments

- Thanks to everyone who has provided feedback on the initial implementation
- The React and Tailwind CSS communities for inspiration