# Digilid website

React (Vite) + Tailwind CSS + GSAP (ScrollTrigger, MotionPath, Draggable, Inertia via @gsap/react `useGSAP`) + Lenis.
Built to the Digilid Brand Guidelines v1.0 (Ink, Canvas, Signal, Coucal; Manrope + Sora; red pixel, grid, lines, arrows).

## Run
    npm install
    npm run dev           # local dev server
    npm run build         # production build in /dist (host anywhere: Netlify, Vercel, cPanel)
    npm run build:single  # one self-contained index.html in /dist-single

## Edit
- All copy: `src/content.js` (items marked SAMPLE need real case studies, reviews, metrics and the studio email).
- Brand tokens: `tailwind.config.js` and `:root` in `src/index.css`.
- Logos: `src/assets/*.svg` (vector, extracted from the brand guide).
- Portfolio images: `src/assets/work-*.jpg` (from the brand guide; swap for client work).

## Sections
Navbar (hide on scroll down, blur on scroll up) · Hero (masked line reveal, 3D cube field with cursor tilt, 4-step process bar) ·
About (sticky story column, scrubbed philosophy fill, mission cards, 5 values) · Services (pinned hanging-bulb sequence:
cord drop and ignition, 8 services burst from the bulb on curved paths, dotted arrows draw out, hover glow + marching ants) ·
Work (pinned horizontal showcase, image scale-down reveal, magnetic “View case” cursor) · Reviews (marquee, 3D flip-in bento,
draggable track) · Footer (curtain reveal, large CTA, nav columns, socials, copyright grid).

Mobile (<900px) and reduced-motion users get static, fully readable layouts.
