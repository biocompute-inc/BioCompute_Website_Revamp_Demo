# BioCompute Website Revamp Demo

A modern, responsive website for BioCompute featuring integrated Substack blog feed, custom scroll animations, and cutting-edge biotech design.

## 🚀 Tech Stack

### Frontend Framework
- **Next.js 15.1.0** - React framework with App Router
- **React 18** - UI library with server components
- **TypeScript 5.9.2** - Type-safe development

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **@tailwindcss/typography** - Beautiful prose styling for blog content
- **Framer Motion 12.27.1** - Scroll-based animations and smooth transitions
- **Lucide React** - Modern icon library
- **Custom Components** - Reusable UI components (Button, Card, Form, etc.)

### Content & Integration
- **rss-parser 3.13.0** - Substack RSS feed integration
- **ISR (Incremental Static Regeneration)** - Blog content revalidation every 600 seconds
- **Modern Fetch API** - Server-side data fetching

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing with Autoprefixer
- **pnpm** - Fast, efficient package manager

## ✨ Key Features

### Scroll Animations
- Custom 3-section scroll control with smooth transitions
- Touchpad and mouse wheel support with delta accumulation
- Dynamic scroll-snap behavior for controlled navigation
- Position-based section detection for production reliability

### Blog Integration
- Substack RSS feed parsing with ISR
- Native Next.js routing for blog posts
- Responsive grid layouts (1/3 columns)
- Fixed aspect-ratio images with responsive loading
- Typography-styled blog content
- Translucent backgrounds with backdrop blur effects

### Responsive Design
- Mobile-first approach with optimized font sizes
- Breakpoints: mobile (320px+), tablet (640px+), desktop (1024px+)
- Responsive navigation with mobile menu
- Touch-friendly interactions

### Performance
- Server-side rendering (SSR)
- ISR for blog content freshness
- Optimized image loading with Next.js Image
- Static page generation where possible

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🏗️ Project Structure

```
app/                    # Next.js App Router pages
├── page.tsx            # Homepage with scroll animations
├── about/              # About page
├── blogs/              # Blog listing and detail pages
├── careers/            # Careers page
├── contact/            # Contact page
├── faq/                # FAQ page
└── globals.css         # Global styles

components/             # React components
├── Header.tsx          # Navigation header
├── Footer.tsx          # Site footer
└── sections/           # Homepage sections

lib/                    # Utilities and helpers
├── blogs.ts            # Substack RSS parser
├── jobs.ts             # Career data
└── utils.ts            # Utility functions

client/                 # Client-side components
└── components/ui/      # Reusable UI components
```

## 🌐 Deployment

Optimized for Vercel deployment with:
- Production-ready scroll behavior
- Hydration-safe state management
- Environment-specific optimizations

## 📝 License

All rights reserved - BioCompute
