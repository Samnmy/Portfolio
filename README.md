# 🚀 Samuel Monsalve — Developer Portfolio

> **A futuristic, premium-grade developer portfolio** built with a modern React stack, featuring interactive 3D components, mechanical keyboard sound effects, smooth physics-based animations, dark/light mode, full i18n, and a fully responsive layout.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF0088?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## ✨ Highlights

| Feature | Description |
|---|---|
| 🎹 **3D Mechanical Keys** | GitHub, LinkedIn & Gmail buttons crafted as photorealistic keycaps with PBT-plastic depth, press animation, purple glow and synthesized click sound |
| 🌐 **Interactive SphereCard** | CSS `preserve-3d` sphere with drag-to-spin interaction, momentum physics, friction deceleration and a spinning conic-gradient halo ring |
| 🔊 **Web Audio Synthesis** | Real-time mechanical keyboard click sound generated with zero-latency pure Web Audio API — no audio files needed |
| 🌗 **Dark / Light Mode** | Full theme toggle with curated palettes for each mode — purple branding maintained in both themes |
| 🌍 **Internationalization** | Spanish / English toggle via a custom React Context |
| 📱 **Responsive Design** | Mobile-first layout tested from 320 px to 4K — no horizontal scroll anywhere |
| ⚡ **Physics Animations** | Spring-based press animations with `useSpring` + `useMotionValue` from Framer Motion |

---

## 🛠️ Tech Stack

### Languages & Core
| Technology | Version | Role |
|---|---|---|
| **TypeScript** | 5.9 | Type-safe development across the entire codebase |
| **TSX / JSX** | — | React component syntax |
| **CSS** | — | Custom properties, keyframe animations, glassmorphism, 3D transforms |

### Framework & Build
| Technology | Version | Role |
|---|---|---|
| **React** | 19 | UI library — hooks, context, refs |
| **Vite** | 7 | Instant HMR dev server and optimized production bundler |
| **PostCSS** | 8 | CSS transformation pipeline |

### Styling
| Technology | Version | Role |
|---|---|---|
| **Tailwind CSS** | 3.4 | Utility-first CSS framework |
| **tailwindcss-animate** | 1.0 | Predefined Tailwind animation utilities |
| **tailwind-merge** | 3 | Merge conflicting Tailwind class names safely |
| **class-variance-authority** | 0.7 | Type-safe component variants |
| **Google Fonts — Inter** | — | Primary typeface throughout the site |

### Animation & Interaction
| Technology | Version | Role |
|---|---|---|
| **Framer Motion** | 12 | Spring physics, layout animations, `useMotionValue`, `useSpring`, `useTransform` |
| **Web Audio API** | Native | Synthesized mechanical keyboard click sound (zero latency, no files) |
| **CSS 3D Transforms** | Native | `perspective`, `rotateY`, `preserve-3d`, `backface-visibility` for the sphere and keycaps |
| **Pointer Events API** | Native | Drag-to-spin on the SphereCard with velocity tracking |
| **requestAnimationFrame** | Native | Smooth physics loop for the sphere's auto-rotate and coasting |

### UI Components
| Technology | Version | Role |
|---|---|---|
| **Radix UI** | Various | Accessible, headless primitives (Dialog, Accordion, Tooltip, etc.) |
| **shadcn/ui** | — | Pre-built component layer on top of Radix UI + Tailwind |
| **lucide-react** | 0.56 | Pixel-perfect SVG icon library |

### Forms & Validation
| Technology | Version | Role |
|---|---|---|
| **react-hook-form** | 7 | Performant form state management |
| **Zod** | 4 | Schema-based runtime validation |
| **@hookform/resolvers** | 5 | Zod ↔ react-hook-form bridge |

### Utilities
| Technology | Version | Role |
|---|---|---|
| **clsx** | 2 | Conditional className construction |
| **next-themes** | 0.4 | SSR-safe dark/light theme provider |
| **date-fns** | 4 | Date utilities |

### Developer Experience
| Technology | Version | Role |
|---|---|---|
| **ESLint** | 9 | Linting with React hooks and React Refresh plugins |
| **typescript-eslint** | 8 | TypeScript-aware linting rules |

---

## 🎯 Special Features Deep Dive

### 🎹 Mechanical Keycap Buttons (`MechanicalKey.tsx`)

The social link buttons (GitHub, LinkedIn, Gmail) are fully custom 3D mechanical keyboard keycaps:

- **3D depth illusion** — A separate `.mkey-side` div acts as the physical bottom edge visible below the cap, giving real Z-axis depth perception without WebGL.
- **Press animation** — On hover, a `useSpring` value (stiffness 420, damping 22) moves the cap down 4 px and simultaneously shrinks the side height, creating a convincing physical press.
- **PBT plastic material** — The cap uses a `linear-gradient` on a dark/light base to simulate the convex surface texture of real PBT keycaps.
- **Purple glow ring** — A `motion.span` with layered `box-shadow` fades in on hover via `useSpring` + `useMotionValue`.
- **Glassmorphism shimmer** — A sweeping gradient layer (`mkey-shimmer`) rides across the cap surface when hovered.
- **Web Audio click** — Every hover triggers `useMechanicalSound`, which synthesizes a 3-layer sound in real time:
  1. **Noise burst** — 25 ms of bandpass-filtered white noise (3200 Hz) for the "tick" transient.
  2. **Tonal thump** — A square oscillator that sweeps 260 Hz → 80 Hz in 18 ms for the low-mid body.
  3. **High-frequency snap** — A 5800 Hz sine wave that decays in 8 ms for the tactile "snap" feel.

### 🌐 Interactive SphereCard (`SphereCard.tsx`)

A pure CSS/DOM 3D sphere with photo on the front and the "SM" monogram on the back:

- **CSS `preserve-3d`** — A `div` with `transformStyle: preserve-3d` holds two absolutely-positioned circular faces (`backface-visibility: hidden`). The back face is pre-rotated 180°.
- **Auto-rotation** — A `requestAnimationFrame` loop increments `angleY` by `BASE_SPEED` (1.2°/frame) and applies it directly through a DOM ref, producing zero unnecessary React re-renders.
- **Drag-to-spin** — `onPointerDown/Move/Up` events track the cursor delta to compute a velocity in deg/frame. `setPointerCapture` keeps the drag alive even when the cursor leaves the element.
- **Momentum physics** — On pointer release the sphere enters a "coasting" state. Framerate-independent friction (`Math.pow(FRICTION, dt/16.667)`) decelerates the spin until it seamlessly blends back to auto-rotation speed via linear interpolation.
- **Spinning halo ring** — A conic-gradient on a transparent-border div spins via a CSS keyframe animation (`sphere-ring-spin`), creating an aurora-like arc that traces the equator.
- **Ambient glow** — Layered `box-shadow` values produce a soft purple aura around the sphere.

### 🌗 Dark / Light Mode

- Implemented with `next-themes` provider at the app root.
- CSS custom properties (HSL) drive all colors — switching themes requires zero JavaScript color logic.
- The mechanical keys have a dedicated light-mode palette: lavender cap surface, dark-purple icons (`hsl(270 65% 28%)`), and a deep-purple 3D bottom edge for depth.

### 🌍 Internationalization (i18n)

- Custom `LanguageContext` + `useLanguage` hook expose a `t(key)` function similar to i18next, but with zero bundle overhead.
- Supports **Spanish** and **English** — toggleable from the Navbar at runtime.

---

## 📁 Project Structure

```
app/
├── public/
│   ├── icon/              # Favicon (Gengar.png)
│   └── images/            # Profile photo (samuel.jpg)
│
├── src/
│   ├── sections/          # Full-page sections
│   │   ├── HeroSection.tsx        # Landing — SphereCard + MechanicalKey buttons + CTA
│   │   ├── AboutSection.tsx       # Biography and personal info
│   │   ├── SkillsSection.tsx      # Tech skills with progress indicators
│   │   ├── ProjectsSection.tsx    # Portfolio project cards
│   │   ├── ExperienceSection.tsx  # Work & education timeline
│   │   └── ContactSection.tsx     # Contact cards + message form
│   │
│   ├── components/
│   │   ├── animations/
│   │   │   ├── SphereCard.tsx     # Interactive 3D CSS sphere with physics
│   │   │   ├── GradientText.tsx   # Animated gradient text wrapper
│   │   │   └── FadeIn.tsx         # Scroll-triggered entrance animation
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Sticky nav — theme + language toggles
│   │   │   └── Footer.tsx         # Footer with social links
│   │   └── ui/
│   │       ├── MechanicalKey.tsx  # 3D keycap button with sound
│   │       ├── CVModal.tsx        # PDF CV viewer modal
│   │       └── ...                # shadcn/ui primitives (Button, Input, etc.)
│   │
│   ├── context/
│   │   └── LanguageContext.tsx    # i18n context — ES / EN translations
│   │
│   ├── hooks/
│   │   ├── useMechanicalSound.ts  # Web Audio API keyboard click synthesizer
│   │   ├── useScrollPosition.ts   # Scroll offset tracking
│   │   └── use-mobile.ts          # Responsive breakpoint detection
│   │
│   ├── lib/
│   │   └── utils.ts               # clsx + tailwind-merge helper
│   │
│   ├── index.css                  # Global CSS — design tokens, mkey-* styles
│   └── App.tsx                    # Root component — section composition
│
├── tailwind.config.js             # Extended palette, animation config
├── vite.config.ts                 # Path aliases (@/ → src/)
└── package.json                   # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Samnmy/Portfolio.git
cd Portfolio/app

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The dev server starts at **http://localhost:5173** with instant Hot Module Replacement.

### Production Build

```bash
npm run build       # TypeScript check + Vite bundle
npm run preview     # Preview the production build locally
```

### Lint

```bash
npm run lint
```

---

## 📞 Contact

| Channel | Details |
|---|---|
| 📧 **Email** | [samuel.monsalve.orrego@gmail.com](mailto:samuel.monsalve.orrego@gmail.com) |
| 💼 **LinkedIn** | [linkedin.com/in/samuel-monsalve-orrego](https://www.linkedin.com/in/samuel-monsalve-orrego) |
| 🐙 **GitHub** | [github.com/Samnmy](https://github.com/Samnmy) |
| 📍 **Location** | Medellín, Antioquia, Colombia |

---

## 📄 License

This project is personal and proprietary. All rights reserved © 2026 Samuel Monsalve Orrego.

---

<p align="center">
  Designed & built with ❤️ by <strong>Samuel Monsalve Orrego</strong>
  <br />
  <em>Medellín, Colombia · 2026</em>
</p>
