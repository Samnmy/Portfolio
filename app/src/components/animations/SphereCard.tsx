import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Drop your photo in public/images/ and set the path here.
// Leave as empty string "" to show the "SM" monogram on the front face.
const PHOTO_SRC = "/images/samuel.jpg";

const SPHERE_SIZE = 180;          // px – diameter
const BASE_SPEED = 1.2;          // deg/frame auto-rotate (~72°/s at 60fps → ~1 rev / 5s)
const DRAG_SENSITIVITY = 0.55;    // px of drag → degrees of rotation
const FRICTION = 0.92;         // velocity multiplier per frame (framerate-independent below)
const MAX_VELOCITY = 12;          // cap to avoid wild spin
const IDLE_THRESHOLD = 0.04;      // |velocity| below this → blend back to auto-rotation
const BLEND_RATE = 0.035;        // how fast we interpolate velocity → BASE_SPEED
// ───────────────────────────────────────────────────────────────────────────

export function SphereCard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Physics state – all in refs, zero re-renders
    const angleY = useRef(0);
    const velocity = useRef(0);
    const rafId = useRef<number>(0);
    const isDragging = useRef(false);
    const lastX = useRef(0);
    const lastTime = useRef(0);
    const isCoasting = useRef(false); // true while decelerating after drag

    // ── Main physics loop ────────────────────────────────────────────────────
    const startLoop = useCallback(() => {
        const tick = (now: number) => {
            const dt = Math.min(now - lastTime.current, 64); // cap at ~2 frames
            lastTime.current = now;

            if (!isDragging.current && cardRef.current) {
                if (isCoasting.current) {
                    // Apply framerate-independent friction
                    const frictionPerFrame = Math.pow(FRICTION, dt / 16.667);
                    velocity.current *= frictionPerFrame;

                    // Blend toward BASE_SPEED once slow enough
                    if (Math.abs(velocity.current) < IDLE_THRESHOLD) {
                        velocity.current += (BASE_SPEED - velocity.current) * BLEND_RATE;
                        if (Math.abs(velocity.current - BASE_SPEED) < 0.001) {
                            velocity.current = BASE_SPEED;
                            isCoasting.current = false;
                        }
                    }
                } else {
                    // Normal auto-rotation
                    velocity.current = BASE_SPEED;
                }

                angleY.current += velocity.current;
                cardRef.current.style.transform = `rotateY(${angleY.current}deg)`;
            }

            rafId.current = requestAnimationFrame(tick);
        };

        lastTime.current = performance.now();
        rafId.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        startLoop();
        return () => cancelAnimationFrame(rafId.current);
    }, [startLoop]);

    // ── Pointer events ────────────────────────────────────────────────────────
    const onPointerDown = useCallback((e: React.PointerEvent) => {
        isDragging.current = true;
        isCoasting.current = false;
        velocity.current = 0;
        lastX.current = e.clientX;
        lastTime.current = performance.now();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current || !cardRef.current) return;
        const now = performance.now();
        const dt = Math.max(now - lastTime.current, 1); // avoid /0
        const dx = e.clientX - lastX.current;

        // velocity in deg/ms then scaled to deg/frame
        velocity.current = Math.max(
            -MAX_VELOCITY,
            Math.min(MAX_VELOCITY, (dx / dt) * 16.667 * DRAG_SENSITIVITY)
        );
        lastX.current = e.clientX;
        lastTime.current = now;

        angleY.current += dx * DRAG_SENSITIVITY;
        cardRef.current.style.transform = `rotateY(${angleY.current}deg)`;
    }, []);

    const onPointerUp = useCallback(() => {
        isDragging.current = false;
        isCoasting.current = true; // begin deceleration
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center select-none my-6"
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
            {/* Outer sizing wrapper */}
            <div
                className="relative flex items-center justify-center"
                style={{ width: SPHERE_SIZE + 32, height: SPHERE_SIZE + 32 }}
            >
                {/* Spinning halo ring */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        border: '1.5px solid transparent',
                        backgroundImage:
                            'linear-gradient(hsl(var(--background)), hsl(var(--background))), ' +
                            'conic-gradient(from 0deg, rgba(168,85,247,0) 0%, rgba(168,85,247,0.85) 40%, rgba(168,85,247,0) 70%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                        animation: 'sphere-ring-spin 4s linear infinite',
                    }}
                />

                {/* Soft ambient glow */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        boxShadow:
                            '0 0 38px 6px rgba(168,85,247,0.16), 0 0 70px 14px rgba(168,85,247,0.06)',
                    }}
                />

                {/* 3D scene: perspective lives here */}
                <div
                    ref={containerRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                    style={{
                        width: SPHERE_SIZE,
                        height: SPHERE_SIZE,
                        perspective: '600px',
                        perspectiveOrigin: '50% 50%',
                    }}
                >
                    {/* The flipping card */}
                    <div
                        ref={cardRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                            transform: `rotateY(${angleY.current}deg)`,
                        }}
                    >

                        {/* ── FRONT FACE: Photo (or monogram fallback) ── */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                overflow: 'hidden',
                                border: '2px solid rgba(168,85,247,0.5)',
                                boxShadow:
                                    'inset 0 2px 12px rgba(168,85,247,0.2), 0 4px 24px rgba(168,85,247,0.3)',
                            }}
                        >
                            {PHOTO_SRC ? (
                                <>
                                    <img
                                        src={PHOTO_SRC}
                                        alt="Samuel Monsalve"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center top',
                                            borderRadius: '50%',
                                            display: 'block',
                                        }}
                                        draggable={false}
                                    />
                                    {/* Subtle top-left specular highlight */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '50%',
                                            background:
                                                'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12) 0%, transparent 55%)',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                </>
                            ) : (
                                <FrontMonogram />
                            )}
                        </div>

                        {/* ── BACK FACE: SM Monogram ── */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid rgba(168,85,247,0.5)',
                                background:
                                    'radial-gradient(circle at 35% 30%, rgba(168,85,247,0.2) 0%, hsl(var(--card)) 65%)',
                                boxShadow:
                                    'inset 0 2px 12px rgba(168,85,247,0.18), 0 4px 24px rgba(168,85,247,0.25)',
                            }}
                        >
                            {/* Inner highlight */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '50%',
                                    background:
                                        'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.06) 0%, transparent 55%)',
                                    pointerEvents: 'none',
                                }}
                            />
                            <span
                                style={{
                                    fontSize: '2.8rem',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    background: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontFamily: '"Inter", system-ui, sans-serif',
                                    userSelect: 'none',
                                    position: 'relative',
                                }}
                            >
                                SM
                            </span>
                        </div>

                    </div>{/* /card */}
                </div>{/* /perspective */}
            </div>{/* /sizing wrapper */}
        </motion.div>
    );
}

// ── Front face monogram (shown when PHOTO_SRC is empty) ─────────────────────
function FrontMonogram() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background:
                    'radial-gradient(circle at 35% 30%, rgba(168,85,247,0.25) 0%, hsl(var(--card)) 65%)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.06) 0%, transparent 55%)',
                    pointerEvents: 'none',
                }}
            />
            <span
                style={{
                    fontSize: '2.8rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #e2c9ff 0%, #a855f7 60%, #7c3aed 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: '"Inter", system-ui, sans-serif',
                    userSelect: 'none',
                    position: 'relative',
                }}
            >
                SM
            </span>
        </div>
    );
}
