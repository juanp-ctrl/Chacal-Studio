# Chacal Studio Website 🐺 👨‍🎨

A fast, animated portfolio/agency website built with Next.js, TypeScript and Tailwind CSS to showcase Chacal Studio's projects and creative work.

Quick links
- Website: https://chacalestudio.ar/
- Environment example: .env.example
- Source: this repository

## What this project does
Chacal Studio is a production-ready frontend for a creative agency portfolio. It provides:
- A performant, SEO-friendly website built on Next.js (app router)
- Smooth scroll and animation primitives for a polished UX
- Reusable UI primitives using Radix UI, Tailwind and utility components
- Internationalization support via next-intl
- Forms and validation with react-hook-form + zod
- Carousel, charts and other interactive components for portfolio pages

## Why this project is useful
- Production-ready starter for creative/agency sites with accessible UI components
- Focus on performance and animations for strong visual presentation
- Modular structure (app, components, lib) makes it easy to extend
- Integrates common services (email, captcha, analytics) in a developer-friendly way

## Key features
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS and utility-first styling
- Radix UI primitives for accessible components
- Smooth scrolling and animation libs (lenis, motion)
- Embla carousel for project sliders
- next-intl for i18n support
- Form handling with react-hook-form + zod
- Email + verification integrations (resend, Turnstile) included
- Scripts for linting and formatting (eslint, prettier, husky)

## Prerequisites
- Node.js (recommended: 18.x or 20.x)
- pnpm (preferred; repository contains pnpm-lock.yaml)
- Git

## Get started (local development)
1. Clone the repo
   git clone https://github.com/juanp-ctrl/Chacal-Studio.git
   cd Chacal-Studio

2. Install dependencies
   pnpm install

3. Environment
   - Copy the example env:
     cp .env.example .env
   - Edit `.env` and provide the required values (see .env.example for keys)

4. Run development server
   pnpm dev
   - Visit http://localhost:3000

5. Build for production
   pnpm build
   pnpm start

Useful npm scripts (from package.json)
- pnpm dev — run development server
- pnpm build — production build
- pnpm start — start built server
- pnpm lint — run ESLint
- pnpm lint:fix — run ESLint and attempt automatic fixes
- pnpm format — format code with Prettier
- pnpm format:check — check formatting

## Project structure (high level)
- app/ — Next.js app routes and page layout (app router)
- components/ — shared React components and UI primitives
- public/ — static assets (images, icons)
- i18n/ — translation files
- lib/ — utility functions and service wrappers
- messages/ — localized messages
- next.config.ts, tsconfig.json, postcss.config.mjs — core configs

(See the repository for the full structure)

## Configuration & deployment
- Review DEPLOYMENT.md for recommended hosting/deployment steps and environment options
- Check next.config.ts for Next.js configuration and proxy.ts for any proxy rules
- Use .env.example as the source of truth for environment variables

## Where to get help
- Open an issue in this repository for bugs or feature requests: Issues
- For quick questions, use the repository Discussions or open an issue (if enabled) or contact the maintainer via their GitHub profile

## Maintainers & Contributors
- Maintained by @juanp-ctrl — see their GitHub profile for contact and other projects
- Before opening PRs:
  - Run linting and formatting locally (pnpm lint, pnpm format)
  - Provide meaningful commit messages and follow the repository's contribution conventions

## Quick troubleshooting
- If you run into dependency issues, remove node_modules and the pnpm store and reinstall:
  rm -rf node_modules && pnpm install
- If environment variables are missing, re-check .env.example and ensure values are present
- For build/runtime errors, check next.config.ts and ensure any service keys (email, captcha) are configured

## Helpful files
- .env.example — example environment variables
- DEPLOYMENT.md — deployment instructions
- CONTRIBUTING.md — how to contribute
- package.json — scripts & dependencies
- pnpm-lock.yaml — lockfile for reproducible installs
- next.config.ts — Next.js configuration
- tsconfig.json — TypeScript configuration