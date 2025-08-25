# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# To Memorize

- **Responder siempre en español** - Always respond in Spanish to the user.

## Development Commands

### Main Development

- `npm run dev` or `bun:dev` - Start development server at localhost:4321
- `npm run build` or `bun:build` - Build for production (includes Astro type checking)
- `npm run preview` or `bun:preview` - Preview production build locally

### Code Quality

- `npm run lint` - Check code with Biome linter
- `npm run lint:fix` - Auto-fix linting issues with Biome
- `npm run prettier` - Format code with Prettier
- `npm run prettier:check` - Check code formatting

### Build Process

The build command runs `astro check` first for TypeScript validation, then builds the project. Always run type checking before building.

## Architecture

### Tech Stack

- **Astro 5.13+** - Static site generator with partial hydration
- **TailwindCSS 4.1+** - Utility-first CSS framework via Vite plugin
- **TypeScript** - Using Astro's strict TypeScript config
- **Biome** - Primary linter with custom rules
- **Prettier** - Code formatter with Astro plugin

### Project Structure

```
src/
├── components/     # Reusable Astro components
├── layouts/        # Page layout templates
├── pages/          # File-based routing
├── styles/         # Global CSS styles
└── assets/         # Static assets (images, etc.)
```

### Key Conventions

- Language: Spanish (`lang="es"` in HTML)
- Component structure: Standard Astro component pattern
- CSS: Global styles in `src/styles/global.css`
- Layout: Main layout includes Header component by default

### Linting Configuration

- Biome handles linting with strict rules
- Formatter is disabled in Biome (Prettier handles formatting)
- Key rules: `useConst`, no unused variables, template literals preferred
- Console warnings allowed for `warn` and `error` only

### Code Style

- Prettier with 4-space indentation
- Double quotes, trailing commas
- 100 character line width
- Specific parsers for .astro, .ts/.js, .css, .json files

## Runtime Environment

Supports both npm and bun package managers with dedicated scripts for bun users.
