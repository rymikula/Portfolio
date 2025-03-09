# Portfolio Website

A modern portfolio website built with Next.js, Tailwind CSS, Three.js, and Framer Motion.

## Features

- Stunning 3D hero section with animated elements
- Responsive design that works on all devices
- Smooth animations and transitions
- Sections for About, Skills, Projects, Experience, and Contact
- Subtle brown/gray/white color scheme
- Interactive components
- Optimized for performance

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Three.js**: 3D graphics library for WebGL
- **React Three Fiber**: React renderer for Three.js
- **Framer Motion**: Animation library for React
- **React Icons**: Icon set for React applications

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js app directory with pages and layouts
- `components/`: React components organized by feature
- `public/`: Static assets
- `styles/`: Global styles and Tailwind configuration

## Customization

### Changing Colors

The color scheme is defined in `tailwind.config.js` and can be easily changed to match your preference.

### Updating Content

- Update personal information in each component file
- Replace placeholder images with your own in the `public/` directory
- Add your own projects in the `Projects.tsx` component
- Update experience and education information in `Experience.tsx`

## Deployment

This website can be easily deployed to platforms like Vercel, Netlify, or GitHub Pages.

### Deploying to Vercel (Recommended)

```sh
npm install -g vercel
vercel
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern portfolio website designs
- Three.js examples and documentation
- Framer Motion examples 