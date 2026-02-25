# 🚀 Portfolio — Samuel Monsalve Orrego

Portfolio personal desarrollado con **React**, **TypeScript**, **Tailwind CSS** y **Framer Motion**. Diseño futurista, dark-mode con acento morado, totalmente responsive.

---

## ✨ Características

- **Hero Section** con esfera 3D interactiva, botones de CTA y teclas mecánicas para redes sociales
- **About Section** con presentación y stack tecnológico
- **Experience Section** con línea de tiempo profesional
- **Projects Section** con tarjetas de proyectos destacados
- **Skills Section** con barras de progreso animadas
- **Contact Section** estilo terminal / transmisión
- Soporte bilingüe **ES / EN** mediante `LanguageContext`
- **Modal de CV** con vista previa y descarga directa

---

## 🎹 Teclas Mecánicas — Social Icons

Los íconos de **GitHub**, **LinkedIn** y **Gmail** en la hero section son teclas de teclado mecánico 3D interactivas, construidas con:

| Tecnología | Uso |
|---|---|
| **Framer Motion** | Spring physics (`stiffness: 420, damping: 22`) para el efecto de tecla presionada |
| **CSS 3D transforms** | Keycap con gradiente PBT-style + `div` lateral para profundidad real |
| **Web Audio API** | Sonido de click sintetizado en tiempo real — sin archivos de audio, cero latencia |
| **React hooks** | `useMechanicalSound` encapsula la síntesis de audio de forma reutilizable |

### Comportamiento
- **Hover** → la tecla se presiona 4px hacia abajo con rebote suave + glow morado + shimmer diagonal + sonido de click
- **Click** → feedback adicional de escala + segundo sonido
- **Leave** → vuelve a su posición con spring physics
- El borde lateral visible se contrae al mismo tiempo que el keycap baja, simulando perspectiva real

### Componente reutilizable

```tsx
import { MechanicalKey } from '@/components/ui/MechanicalKey';
import { Github } from 'lucide-react';

<MechanicalKey
  icon={Github}
  href="https://github.com/Samnmy"
  label="GitHub"
/>
```

**Props:** `icon`, `href`, `label`, `iconSize` (default `20`)

---

## 🛠️ Stack Tecnológico

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion 12](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- Web Audio API (nativo del navegador)

---

## 📁 Estructura del Proyecto

```
app/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── MechanicalKey.tsx   ← teclas mecánicas 3D
│   │   │   ├── CVModal.tsx
│   │   │   └── ...
│   │   ├── animations/
│   │   │   ├── SphereCard.tsx
│   │   │   └── GradientText.tsx
│   │   └── layout/
│   ├── hooks/
│   │   └── useMechanicalSound.ts   ← síntesis de audio Web Audio API
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ContactSection.tsx
│   ├── context/
│   │   └── LanguageContext.tsx
│   └── index.css
└── public/
    └── icon/
```

---

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build
```

---

## 🔗 Links

- **GitHub:** [github.com/Samnmy](https://github.com/Samnmy)
- **LinkedIn:** [linkedin.com/in/samuel-monsalve-orrego](https://www.linkedin.com/in/samuel-monsalve-orrego)
- **Email:** samuel.monsalve.orrego@gmail.com
