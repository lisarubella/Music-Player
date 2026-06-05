# Installation Guide - Cute Music Player

Complete guide for installing and running the Cute Music Player on your phone and laptop.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Initial Setup](#initial-setup)
3. [Development](#development)
4. [Building for Production](#building-for-production)
5. [Installation on Devices](#installation-on-devices)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

### For Development
- **Windows 10/11**, **macOS 10.15+**, or **Linux**
- **Node.js 16.0.0+** ([Download](https://nodejs.org))
- **npm 7.0.0+** (comes with Node.js)
- **4GB RAM minimum**
- **500MB disk space** for node_modules

### For Using the App
- **Any modern web browser** (Chrome, Firefox, Safari, Edge)
- **Internet connection** (first time only, works offline after)

---

## Initial Setup

### Step 1: Download/Clone the Project

**Option A: Download ZIP**
1. Download the project as ZIP
2. Extract to your desired location
3. Navigate to the folder

**Option B: Clone from Git**
```bash
git clone <repository-url>
cd cute-music-player
```

### Step 2: Install Node.js

If you don't have Node.js installed:
1. Go to https://nodejs.org
2. Download the LTS version
3. Run the installer
4. Follow the installation steps
5. Restart your terminal/computer

**Verify installation:**
```powershell
node --version  # Should show v16.0.0 or higher
npm --version   # Should show 7.0.0 or higher
```

### Step 3: Install Dependencies

**On Windows (PowerShell or Command Prompt):**
```powershell
cd "E:\Cute App"
npm install
```

**On macOS/Linux (Terminal):**
```bash
cd ~/path/to/cute-music-player
npm install
```

This will download and install all required packages (takes 2-5 minutes).

---

## Development

### Start Development Server

```powershell
npm run dev
```

**What happens:**
- Starts development server at `http://localhost:5173`
- Browser automatically opens
- Hot reload enabled (changes reflect instantly)
- Press `Ctrl+C` to stop

### Development Workflow

1. Edit files in `src/` folder
2. Changes appear automatically in browser
3. Check browser console (F12) for errors
4. Edit CSS for styling changes
5. Edit TypeScript for logic changes

---

## Building for Production

### Build the App

```powershell
npm run build
```

**What happens:**
- Optimizes and minifies code
- Creates `dist/` folder with production files
- Generates service worker for offline support
- Creates PWA manifest for installation

### Preview Production Build

```powershell
npm run preview
```

This shows exactly what your users will see.

---

## Installation on Devices

### Desktop (Windows, macOS, Linux)

#### Option 1: Browser Install
1. Run `npm run dev` in terminal
2. Open the app in your browser
3. Look for **Install** button in address bar or menu
4. Click to install
5. App opens in standalone window

#### Option 2: From Production Build
1. Run `npm run build`
2. Deploy `dist/` folder to web hosting (see Deployment section)
3. Visit your deployed URL
4. Install from browser

#### Option 3: Local Server
```powershell
npm run preview
```
App runs at `http://localhost:4173` - install from there.

### iPhone/iPad Installation

**Method 1: Safari (Recommended)**
1. Open Safari browser
2. Navigate to your app URL (or `http://localhost:5173` if local)
3. Tap the **Share** button (arrow icon at bottom)
4. Scroll down and tap **"Add to Home Screen"**
5. Enter a name (keep it short)
6. Tap **"Add"**
7. App icon appears on home screen

**Method 2: Full Screen Web App**
- Same steps as above
- When launched, appears as full-screen app
- Works offline after first visit
- Can be deleted like any app

### Android Installation

**Chrome Browser**
1. Open Chrome or compatible browser
2. Navigate to your app URL
3. Tap the **Menu** icon (three dots ⋮) at top right
4. Tap **"Install app"** or **"Add to Home screen"**
5. Confirm installation
6. App appears in app drawer and home screen

**Firefox Browser**
1. Open Firefox
2. Navigate to your app URL
3. Tap the **Menu** button
4. Tap **"Install"**
5. App installs to home screen

### Tablet Installation

Same process as phone for your device type (iOS or Android).

---

## Deployment

### Quick Deployment Options

#### Option 1: Vercel (Easiest - Recommended)
```powershell
npm install -g vercel
vercel
```
- Zero configuration
- Automatic HTTPS
- Free tier available
- Global CDN

#### Option 2: Netlify
1. Go to https://netlify.com
2. Sign up with GitHub
3. Connect repository
4. Auto-deploys on push
5. Free SSL included

#### Option 3: GitHub Pages
1. Push to GitHub
2. Enable Pages in repository settings
3. Free hosting
4. Your URL: `yourusername.github.io/repo-name`

#### Option 4: Manual Hosting
1. Build: `npm run build`
2. Upload `dist/` folder to any web host
3. Ensure HTTPS is enabled
4. Share URL with users

**See DEPLOYMENT.md for detailed instructions.**

---

## Troubleshooting

### Installation Issues

#### "npm: command not found"
- Node.js not installed
- Solution: Install from https://nodejs.org

#### "Module not found" or "npm ERR!"
```powershell
# Clear and reinstall
Remove-Item node_modules -Recurse -Force
npm install
```

#### Port 5173 already in use
```powershell
npm run dev -- --port 3000
```

### Runtime Issues

#### App won't load
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check browser console (F12) for errors

#### Service worker not updating
```powershell
# In DevTools > Application > Service Workers
# Click "Unregister"
# Reload page
```

#### Installation button not showing
- Ensure HTTPS is used (required for PWA)
- Check manifest.json is valid
- Try different browser
- Check DevTools for errors

#### App not working offline
- First load must be online to cache files
- Check service worker in DevTools
- Check browser storage/cache settings

### Performance Issues

#### App loads slowly
- First load: normal (caches files)
- Subsequent loads: should be fast
- Check network tab in DevTools
- Ensure service worker is active

#### High disk usage
```powershell
# Clear node_modules cache
npm cache clean --force
```

### Build Issues

#### Build fails with TypeScript errors
```powershell
npm run type-check  # See all errors
# Fix errors in src/ files
npm run build
```

#### Build succeeds but app doesn't work
```powershell
npm run preview  # Test locally first
```

---

## Project Structure

```
E:\Cute App/
│
├── src/
│   ├── App.tsx              Main app component
│   ├── App.css              App styling
│   ├── main.tsx             React entry point
│   └── index.css            Global styles
│
├── public/                  Static files (if needed)
│
├── dist/                    Production build (generated)
│   ├── index.html
│   ├── assets/
│   ├── sw.js               Service worker
│   └── manifest.json       PWA manifest
│
├── node_modules/           Dependencies (generated)
│
├── index.html              HTML template
├── vite.config.ts          Vite & PWA configuration
├── tsconfig.json           TypeScript configuration
├── package.json            Dependencies & scripts
├── setup.bat               Windows setup script
├── README.md               Main documentation
├── DEPLOYMENT.md           Deployment guide
├── QUICKSTART.md           Quick start guide
└── INSTALLATION.md         This file
```

---

## Common Commands Reference

```powershell
# Setup
npm install                 Install dependencies
./setup.bat                Run Windows setup script

# Development
npm run dev                Start dev server
npm run type-check         Check TypeScript errors
npm run lint               Run linter

# Production
npm run build              Build for production
npm run preview            Preview production build

# Utilities
npm cache clean --force    Clear npm cache
npm outdated               Check for updates
npm update                 Update dependencies
```

---

## Updating the App

### Update Dependencies
```powershell
npm update
npm run build
```

### Update Node.js
1. Download latest from https://nodejs.org
2. Install as normal
3. Verify: `node --version`

---

## Getting Help

1. **Check README.md** - Full documentation
2. **Check DEPLOYMENT.md** - Hosting options
3. **Check QUICKSTART.md** - Fast setup
4. **Browser DevTools** - Press F12 for debugging
5. **Error messages** - Read them carefully, they're helpful

---

## Security Notes

- ✅ App is secure by default
- ✅ Service worker is signed
- ✅ All major browsers supported
- ✅ No sensitive data stored locally
- ✅ HTTPS required for PWA features

---

## System Specifications

Minimum requirements:
- **CPU**: Intel Core i3 or equivalent
- **RAM**: 4GB
- **Storage**: 500MB for development, 5MB for app
- **Network**: Internet for first load

Recommended:
- **CPU**: Intel Core i5 or equivalent
- **RAM**: 8GB+
- **Storage**: SSD (faster builds)
- **Network**: Broadband

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. ✅ Test the app
5. ✅ Install on your device
6. ✅ Deploy to production
7. ✅ Share with friends!

---

**Version**: 1.0.0  
**Last Updated**: 2026-06-05  
**License**: MIT

Happy listening! 🎵
