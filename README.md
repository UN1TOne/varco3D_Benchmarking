# VARCO 3D --- R3F Demo Project

This project is a **benchmarking implementation of the VARCO 3D
homepage**, rebuilt using:

- **React Three Fiber (R3F)**
- **TypeScript**
- **Vite**
- **Three.js**
- **Custom shaders & postprocessing**
- **Parallax UI / 3D-integrated interface**

## 📌 Overview

This repository demonstrates a **concept demo** of a VARCO‑style
3D-driven landing page experience.\
The focus is on recreating the feel of a modern WebGL‑powered portfolio
site with smooth transitions, parallax motion, and a clean UI/UX.

### Implemented Pages

---

Page Description

---

**Landing Page (`/`)** 3D hero scene, VARCO-style typography, parallax
DOM, floating scroll hint, marquee gallery.

**Start Page Fullscreen model viewer (hamburger), orbit
(`/start`)** controller, zoom, custom environment lighting,
sidebar UI, history list, modal image preview.

---

This is an early **demo build**, not a full service implementation.

---

## 🛠 Tech Stack

### Core Libraries

- **React 19**
- **TypeScript**
- **Vite**
- **react-three-fiber (`@react-three/fiber`)**
- **drei utilities (`@react-three/drei`)**
- **postprocessing (`@react-three/postprocessing`)**
- **Zustand (planned for future state control)**

### Rendering

- ACES tone mapping
- HDR environment lighting
- Custom Three.js orbit controller
- Model switcher
- Bloom postprocessing
- R3F `<Canvas>` with high-DPI rendering

---

## 🎨 UI / UX Features

### Landing Page

- Large **VARCO-style headline typography**
- Multi‑layer parallax:
  - background text
  - blur text
  - outline text
  - canvas movement
- Floating "Scroll" cursor hint
- Marquee gallery rows with hover pause
- Blur/glow effects matching modern creative AI tools

### Start Page

- Fullscreen 3D model viewer
- Orbit (drag), zoom (wheel), inertia
- High-quality environment reflections
- Sidebar with:
  - Generation history
  - Image preview modal
  - Action rows (new, edit, remake)
- Topbar with share button and scene actions

---

## 📁 Project Structure

    src/
    ├─ App.tsx
    ├─ Header.tsx
    ├─ Scene.tsx           # Landing page R3F scene
    ├─ StartScene.tsx      # Start page R3F model viewer
    ├─ StartPage.tsx
    ├─ useParallaxDom.ts
    ├─ FloatingScrollHint.tsx
    ├─ Marquee/
    │   ├─ MarqueeRow.tsx
    │   └─ MarqueeSection.tsx
    ├─ models/
    ├─ images/
    └─ index.css

---

## 🚀 Development

### Install

    yarn install

### Start Dev Server

    yarn dev

### Build

    yarn build

### Preview

    yarn preview

---

## 🔧 Deployment Note (Netlify)

Netlify requires a redirect rule to make SPA routing work:

Create `/public/_redirects`:

    /*    /index.html   200

This ensures `/start` loads correctly after deployment.

---

## 📄 License

This project is for **educational and demo purposes only**.\
Do not use VARCO 3D trademarks or assets commercially.

---

## ✨ Author

Developed by **UNIT** -- BabylonJS & WebGL Specialist\

---
