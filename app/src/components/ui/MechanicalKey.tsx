import { useRef, useCallback, type ElementType } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMechanicalSound } from '@/hooks/useMechanicalSound';

interface MechanicalKeyProps {
    /** Lucide-react (or any) icon component */
    icon: ElementType;
    /** URL to open on click */
    href: string;
    /** Accessible label */
    label: string;
    /** Icon size in px — matches your current 20px icons */
    iconSize?: number;
}

export function MechanicalKey({
    icon: Icon,
    href,
    label,
    iconSize = 20,
}: MechanicalKeyProps) {
    const { playClick } = useMechanicalSound();
    const isHovered = useRef(false);

    // ── Motion values for the press animation ───────────────────────────────
    const rawY = useMotionValue(0);
    const y = useSpring(rawY, { stiffness: 420, damping: 22, mass: 0.6 });

    // Side height shrinks as the cap presses down (parallax depth illusion)
    const sideHeight = useTransform(y, [0, 5], [5, 1]);
    const sideOpacity = useTransform(y, [0, 5], [1, 0.4]);

    // Glow intensity on hover
    const glowOpacity = useMotionValue(0);
    const glowSpring = useSpring(glowOpacity, { stiffness: 300, damping: 20 });

    const handleHoverStart = useCallback(() => {
        isHovered.current = true;
        rawY.set(4);
        glowOpacity.set(1);
        playClick();
    }, [rawY, glowOpacity, playClick]);

    const handleHoverEnd = useCallback(() => {
        isHovered.current = false;
        rawY.set(0);
        glowOpacity.set(0);
    }, [rawY, glowOpacity]);

    const handleClick = useCallback(() => {
        playClick();
    }, [playClick]);

    return (
        /**
         * Outermost wrapper establishes the 3-D perspective space.
         * The extra padding/margin ensures the glow ring isn't clipped.
         */
        <div className="mkey-perspective" style={{ perspective: '400px' }}>
            {/* ── Key assembly (cap + side stacked) ─────────────────────────── */}
            <div className="relative" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch' }}>

                {/* ── Key cap (the clickable top face) ────────────────────────── */}
                <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="mkey-cap group relative block"
                    style={{ y }}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onClick={handleClick}
                    whileTap={{ scale: 0.95 }}
                    tabIndex={0}
                >
                    {/* Glassmorphism tint layer */}
                    <span className="mkey-glass" aria-hidden="true" />

                    {/* Shimmer sweep on hover */}
                    <motion.span
                        className="mkey-shimmer"
                        aria-hidden="true"
                        style={{ opacity: glowSpring }}
                    />

                    {/* Purple glow ring */}
                    <motion.span
                        className="mkey-glow-ring"
                        aria-hidden="true"
                        style={{ opacity: glowSpring }}
                    />

                    {/* Icon */}
                    <span className="mkey-icon-wrapper">
                        <Icon size={iconSize} strokeWidth={1.8} />
                    </span>
                </motion.a>

                {/* ── Key side (bottom edge — gives 3-D depth) ─────────────────── */}
                <motion.div
                    className="mkey-side"
                    aria-hidden="true"
                    style={{ height: sideHeight, opacity: sideOpacity, y }}
                />
            </div>
        </div>
    );
}
