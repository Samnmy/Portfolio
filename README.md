# 🚀 Samuel Monsalve — Personal Portfolio

A modern, animated, and fully responsive personal portfolio built to showcase technical skills, projects, and professional experience. Designed with a premium dark aesthetic and high attention to detail.

**Live demo:** [github.com/Samnmy/Portfolio](https://github.com/Samnmy/Portfolio)

---

## 🧩 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI library — component-based architecture |
| **TypeScript** | Static typing for robust, maintainable code |
| **Vite** | Lightning-fast dev server and build tool |
| **Tailwind CSS** | Utility-first styling + custom design tokens |
| **Framer Motion** | Animations, gestures, and entrance effects |
| **Lucide React** | Clean, consistent SVG icon set |
| **Context API** | Global state for language and theme |

---

## ✨ Features

### 🌐 Internationalization
- Full **English / Spanish** toggle with instant UI re-render.
- All text content lives in `/src/utils/translations.ts` — easy to extend.

### 🌗 Dark / Light Mode
- Fully themed with CSS custom properties (`hsl(var(--*))`).
- Every component adapts correctly to both modes with no hardcoded colors.

### 📱 Responsive Design
- Mobile-first layout adapts from 320px to 4K.
- Floating navbar collapses into an animated full-screen mobile menu.

### 🎯 Sections
| Section | Description |
|---|---|
| **Hero** | Animated introduction with 3D interactive sphere, CTA buttons, and CV download modal |
| **About** | Personal highlights and characteristic cards |
| **Skills** | Animated progress bars grouped by technology area |
| **Projects** | Featured project gallery with live demo and GitHub links |
| **Experience** | Professional timeline |
| **Contact** | Contact form with styled terminal aesthetic |

---

## 🌀 3D Interactive Sphere (Hero Section)

A custom `SphereCard` component built with pure CSS 3D transforms — **no Three.js, no canvas, no heavy libraries**.

### How it works

```
CSS engine:   perspective + transform-style: preserve-3d
Rotation:     requestAnimationFrame loop (zero React re-renders)
Physics:      velocity-based inertia with framerate-independent friction
```

**Front face:** Professional photo (`/public/images/samuel.jpg`), circular with a subtle specular highlight overlay.

**Back face:** "SM" monogram with a purple gradient on a glassmorphism background.

### Interaction model

| Event | Behavior |
|---|---|
| Auto (idle) | Slow continuous Y-axis rotation at `BASE_SPEED` |
| `pointerdown` | Captures pointer, resets velocity to 0 |
| `pointermove` | Computes velocity as `Δpx / Δms × 16.667` (framerate-independent) |
| `pointerup` | Releases pointer, enters **coasting** mode |
| Coasting | `velocity *= FRICTION^(dt/16.667)` each frame |
| Velocity → 0 | Smoothly interpolates back to `BASE_SPEED` (no snap) |

### Tunable constants (`SphereCard.tsx`)

| Constant | Default | Effect |
|---|---|---|
| `BASE_SPEED` | `1.2` | Auto-rotation speed (deg/frame) |
| `DRAG_SENSITIVITY` | `0.55` | Drag responsiveness |
| `FRICTION` | `0.92` | Deceleration rate after release |
| `MAX_VELOCITY` | `12` | Cap to prevent wild spins |
| `SPHERE_SIZE` | `180` | Diameter in px |

**To change the photo:** drop any image into `public/images/` and update `PHOTO_SRC` at the top of `SphereCard.tsx`.

---

## 📄 CV Download Modal

A polished modal (`CVModal.tsx`) launched from the **CV** button in the Hero section.

- Centered on screen with backdrop blur
- Two download options:
  - **CV Estándar** — visual design format (`CV_Samuel_Monsalve_Orrego.pdf`)
  - **CV ATS** — plain-text optimized for applicant tracking systems (`CV_ATS_Samuel_Monsalve_Orrego.pdf`)
- PDFs live in `/public/CVs/`

---

## 📂 Project Structure

```
Portfolio/
└── app/
    ├── public/
    │   ├── images/          # Profile photo (samuel.jpg)
    │   └── CVs/             # CV PDF files
    └── src/
        ├── components/
        │   ├── animations/
        │   │   ├── SphereCard.tsx    # 3D interactive sphere
        │   │   ├── GradientText.tsx  # Purple gradient text
        │   │   └── FadeIn.tsx        # Scroll-triggered fade
        │   ├── layout/
        │   │   ├── Navbar.tsx        # Floating responsive navbar
        │   │   └── Footer.tsx
        │   └── ui/
        │       ├── CVModal.tsx       # CV download modal
        │       └── ...               # shadcn/ui primitives
        ├── context/
        │   ├── LanguageContext.tsx   # EN/ES i18n
        │   └── ThemeContext.tsx      # Dark/Light mode
        ├── sections/
        │   ├── HeroSection.tsx
        │   ├── AboutSection.tsx
        │   ├── SkillsSection.tsx
        │   ├── ProjectsSection.tsx
        │   ├── ExperienceSection.tsx
        │   └── ContactSection.tsx
        └── utils/
            └── translations.ts      # All UI strings (EN + ES)
```

---

## 🛠️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Samnmy/Portfolio.git
cd Portfolio/app

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build
```

---

## 📌 Recent Updates

- **3D Interactive Sphere** — Physics-based inertia drag, auto-rotation, front/back faces
- **CV Download Modal** — Two-format CV selector with styled dialog
- **Hero Layout Fixes** — Proper navbar clearance, scroll indicator positioning
- **Theme-aware Components** — All colors use CSS variables, compatible with dark and light mode
- **Internationalization Expansion** — Full EN/ES support across all new components

---

Created with ❤️ by **Samuel Monsalve** · [LinkedIn](https://www.linkedin.com/in/samuel-monsalve-orrego) · [GitHub](https://github.com/Samnmy)
