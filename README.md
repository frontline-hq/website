# Frontline Cybersecurity Agency

The website and tools for Frontline, a cybersecurity agency specializing in email security and domain protection.

## 🚀 Features

-   **Cal.com Integration** - Seamless appointment booking system
-   **End-to-End Encrypted Email Contact Form** - Secure communication using OpenPGP encryption
-   **Untitled UI Component Library** - Comprehensive usage of self-developed design system
-   **DMARC Domain Checker** - Client-side domain security analysis with Quad9 DNS queries
-   **Multi-language Support** - Internationalization with German and English locales
-   **Security Assessment Tools** - Comprehensive cybersecurity evaluation forms

## 📁 Project Structure

This is a **pnpm monorepo** containing multiple applications and shared packages:

### Applications (`apps/`)

#### 🌐 [`frontline-website`](apps/frontline-website/)

The main Frontline cybersecurity agency website built with SvelteKit.

**Key Features:**

-   Modern, responsive design using Tailwind CSS
-   Internationalization (i18n) support with Paraglide.js
-   Cal.com embedded booking system
-   Encrypted contact forms with OpenPGP
-   Security assessment forms
-   Domain checker integration
-   Privacy-focused architecture

**Tech Stack:**

-   SvelteKit with TypeScript
-   Tailwind CSS with custom design system
-   Paraglide.js for internationalization
-   OpenPGP for email encryption
-   Felte for form handling with Yup validation
-   Vite for build tooling

#### 🔍 [`mailguard-domain-checker`](apps/mailguard-domain-checker/)

Standalone DMARC and email security domain checker tool.

**Key Features:**

-   Client-side DNS queries using Quad9
-   DMARC record analysis
-   Domain security assessment
-   Real-time validation
-   Multi-language interface

**Tech Stack:**

-   SvelteKit with TypeScript
-   Same core stack as frontline-website
-   Specialized domain checking logic

### Packages (`packages/`)

The packages directory contains shared libraries and components (primarily submodules):

-   **`tailwind-dynamic-components`** - Dynamic Tailwind CSS component system
-   **`tailwind-styles`** - Shared Tailwind configuration and styles
-   **`untitled-ui`** - Core design system foundations
-   **`untitled-ui-components`** - Reusable UI components library
-   **`untitledui-icons`** - Icon library with comprehensive icon set

## 🛠️ Prerequisites

-   **Node.js**: `v22.14.0`
-   **pnpm**: `9.10.0`

## 🚀 Getting Started

### Installation

```bash
# Install dependencies for all packages and apps
pnpm install
```

### Development

#### Run the main website

```bash
# Start frontline-website in development mode
pnpm --filter frontline-website dev
```

#### Run the domain checker

```bash
# Start mailguard-domain-checker in development mode
pnpm --filter mailguard-domain-checker dev
```

#### Run all applications

```bash
# Start all apps simultaneously
pnpm --parallel --filter "./apps/*" dev
```

### Building

#### Build specific app

```bash
# Build frontline-website
pnpm --filter frontline-website build

# Build mailguard-domain-checker
pnpm --filter mailguard-domain-checker build
```

#### Build all apps

```bash
# Build all applications
pnpm --filter "./apps/*" build
```

### Code Quality

```bash
# Lint all projects
pnpm --filter "./apps/*" lint

# Format code
pnpm --filter "./apps/*" format

# Type checking
pnpm --filter "./apps/*" check
```

## 🌍 Internationalization

Both applications support multiple languages:

-   **English** (`en`) - Default language
-   **German** (`de`) - Secondary language

Translation files are located in each app's `messages/` directory and managed through Paraglide.js with automatic compilation.

## 🔒 Security Features

### Email Encryption

-   End-to-end encryption using OpenPGP
-   Client-side key generation and encryption
-   Secure message transmission

### Domain Security Analysis

-   DMARC record validation
-   SPF record checking
-   DKIM configuration analysis
-   DNS security assessment via Quad9

### Privacy-First Architecture

-   Client-side processing where possible
-   Minimal data collection
-   Secure communication protocols

## 📦 Workspace Commands

```bash
# Install dependencies
pnpm install

# Run specific app
pnpm --filter <app-name> <command>

# Run command in all apps
pnpm --filter "./apps/*" <command>

# Run command in all packages
pnpm --filter "./packages/*" <command>

# Parallel execution
pnpm --parallel --filter "./apps/*" dev
```

## 🤝 Development Workflow

1. **Setup**: Clone repository and run `pnpm install`
2. **Development**: Use `pnpm --filter <app-name> dev` for local development
3. **Testing**: Run `pnpm --filter <app-name> check` for type checking
4. **Linting**: Use `pnpm --filter <app-name> lint` for code quality
5. **Building**: Execute `pnpm --filter <app-name> build` for production builds
6. **Deployment**: Use Docker or direct Node.js deployment with Infisical

## 📄 License

This project is private and proprietary to Frontline Cybersecurity Agency.

---

**Frontline Cybersecurity Agency** - Protecting your digital frontier with advanced email security and domain protection solutions.
