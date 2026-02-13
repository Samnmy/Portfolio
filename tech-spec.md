# Portfolio Website Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
- Button - CTAs and actions
- Card - Project cards, feature cards
- Input - Contact form fields
- Textarea - Contact form message
- Badge - Tech tags, skill tags
- Separator - Visual dividers
- Sheet - Mobile navigation drawer

### Custom Components

**Layout Components:**
- `Navbar` - Fixed navigation with scroll effect
- `Footer` - Site footer with social links
- `Section` - Reusable section wrapper with consistent padding
- `Container` - Max-width container with responsive padding

**Section Components:**
- `HeroSection` - Full-height hero with animated content
- `AboutSection` - About me with feature cards
- `SkillsSection` - Technical skills with progress bars
- `ProjectsSection` - Featured projects grid
- `ExperienceSection` - Timeline with work/education
- `ContactSection` - Contact info and form

**Animation Components:**
- `FadeIn` - Scroll-triggered fade in wrapper
- `StaggerContainer` - Container for staggered children animations
- `ProgressBar` - Animated skill progress bar
- `GradientText` - Text with gradient animation
- `ScrollIndicator` - Animated scroll down indicator

**UI Components:**
- `ProjectCard` - Individual project card with hover effects
- `FeatureCard` - About section feature card
- `SkillCategory` - Skill category with progress bars
- `TimelineItem` - Timeline entry for experience
- `ContactCard` - Contact info card with icon
- `SocialLinks` - Social media links row
- `TechTag` - Technology badge/tag

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load sequence | Framer Motion | AnimatePresence + staggered children | Medium |
| Navbar scroll effect | React hooks | useScroll hook + conditional classes | Low |
| Hero text reveal | Framer Motion | motion.div with stagger variants | Medium |
| Gradient text shimmer | CSS | Background-position animation | Low |
| Badge pulse | CSS | Keyframe pulse animation | Low |
| Button hover glow | CSS | Box-shadow transition | Low |
| Scroll indicator bounce | CSS | Keyframe bounce animation | Low |
| Section fade-in on scroll | Framer Motion | whileInView + viewport options | Medium |
| Card stagger reveal | Framer Motion | staggerChildren in parent variants | Medium |
| Card hover lift | CSS | Transform + shadow transition | Low |
| Progress bar fill | Framer Motion | animate width on inView | Medium |
| Timeline draw | Framer Motion | SVG path animation or CSS | Medium |
| Timeline card slide | Framer Motion | x/opacity animation based on position | Medium |
| Form input focus | CSS | Border-color transition | Low |
| Social icon hover | CSS | Scale + color transition | Low |
| Mobile menu slide | Framer Motion | Sheet + AnimatePresence | Low |

## Animation Library Choices

**Primary: Framer Motion**
- Best for React component animations
- Declarative API with motion components
- Built-in scroll-triggered animations (whileInView)
- AnimatePresence for enter/exit animations
- Stagger support for sequential animations

**Secondary: CSS Animations**
- Simple hover effects
- Continuous animations (pulse, bounce, shimmer)
- Performance-critical micro-interactions

## Project File Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── layout/          # Navbar, Footer, Section
│   │   ├── animations/      # FadeIn, GradientText, etc.
│   │   └── cards/           # ProjectCard, FeatureCard, etc.
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   └── ContactSection.tsx
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts    # Animation variants
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── images/              # Project images
├── components.json
├── tailwind.config.js
└── package.json
```

## Dependencies

**Core:**
- react
- react-dom
- typescript
- vite

**Styling:**
- tailwindcss
- @tailwindcss/typography
- class-variance-authority
- clsx
- tailwind-merge

**Animation:**
- framer-motion

**Icons:**
- lucide-react

**UI Components:**
- @radix-ui/* (via shadcn)

## Technical Notes

### Performance Considerations
- Use `will-change: transform` on animated elements
- Prefer transform/opacity over layout-triggering properties
- Use `viewport={{ once: true }}` for scroll animations to prevent re-animation
- Lazy load images below the fold

### Accessibility
- Respect `prefers-reduced-motion` media query
- Ensure sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Focus states on interactive elements

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Dark Mode
- Default to dark theme
- Optional toggle for light mode
- Use CSS variables for theme colors
