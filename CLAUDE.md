# Music Player - Development Guide

## Project Overview
A beautiful React music player with brown aesthetic, centered layout, decorative flowers, and MP3 upload functionality.

## Tech Stack
- **React 18** with TypeScript
- **Vite** for build/dev
- **Lucide React** for icons
- **CSS3** with animations and gradients

## Key Features
- 🎵 Centered music player with logo animation
- 🌸 Decorative floating flowers
- 📁 Upload and play MP3 files
- 🎚️ Volume & progress controls
- 🎨 Dark background with brown player card

## Color Palette
- Background: `#2C2C2C` (dark)
- Player: `rgba(255, 248, 240, 0.95)` (cream)
- Accents: `#D4A574` to `#C9956D` (brown gradients)
- Text: `#5D4E37` (dark brown)

## File Structure
```
src/
  ├── App.tsx       (main component, file upload logic)
  ├── App.css       (all styling, animations)
  └── main.tsx      (entry point)
```

## Quick Start
```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Development Notes
- Player is centered using flexbox on body and .app
- Logo has continuous spin animation
- Flowers use fixed positioning with float animation
- No blue colors - all brown theme
- Responsive design for mobile/tablet/desktop

## Build
```bash
npm run build
```

Deploys to `dist/` folder ready for production.
