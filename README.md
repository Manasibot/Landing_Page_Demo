# Leading Under Pressure - Landing Page

A sleek, modern, and professional landing page for the "Leading Under Pressure" executive leadership experience event in Dubai.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Professional animations and transitions
- **Lucide React** - Beautiful, consistent icons

## Features

- Fully responsive design (mobile, tablet, desktop)
- Smooth scroll animations with viewport detection
- Interactive FAQ accordion
- Premium dark theme with gold accents
- Optimized performance with Next.js
- SEO-ready with proper meta tags

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles & Tailwind
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page component
├── components/
│   ├── ui/
│   │   └── motion.tsx   # Reusable animation components
│   ├── Navigation.tsx   # Fixed navigation header
│   ├── Hero.tsx         # Hero section
│   ├── WhyExists.tsx    # Purpose section
│   ├── Philosophy.tsx   # ASSESS → ALIGN → ASCEND framework
│   ├── WhatMakesDifferent.tsx  # Key highlights
│   ├── Journey.tsx      # 5-day timeline
│   ├── WhoIsFor.tsx     # Target audience
│   ├── Faculty.tsx      # Facilitator profiles
│   ├── EventDetails.tsx # Event logistics
│   ├── Invitation.tsx   # CTA section
│   ├── FAQ.tsx          # Accordion FAQ
│   └── Footer.tsx       # Site footer
├── lib/
│   └── utils.ts         # Utility functions
└── tailwind.config.ts   # Tailwind configuration
```

## Design System

### Colors

- **Primary (Gold)**: `#d4a012` - Premium accent color
- **Dark palette**: Deep navy/slate tones for professional look
- **Gradients**: Subtle gold-to-amber transitions

### Typography

- **Serif**: Playfair Display - Headlines & quotes
- **Sans**: Inter - Body text & UI elements

### Components

- Glass-morphism cards with backdrop blur
- Animated gradient orbs in background
- Smooth hover transitions
- Custom scrollbar styling

## Customization

### Updating Content

All content is defined directly in the component files. Key files to modify:

- `components/Hero.tsx` - Event title, dates, tagline
- `components/Journey.tsx` - 5-day schedule
- `components/Faculty.tsx` - Facilitator information
- `components/FAQ.tsx` - FAQ items

### Styling

- Modify `tailwind.config.ts` for colors, fonts, animations
- Update `app/globals.css` for custom utilities

## License

Private - All rights reserved.
