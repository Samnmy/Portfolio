import { useRef, useCallback } from 'react';

/**
 * Synthesizes a realistic mechanical keyboard click sound using Web Audio API.
 * No external audio files needed — pure synthesis = zero latency.
 */
export function useMechanicalSound() {
    const ctxRef = useRef<AudioContext | null>(null);

    const getCtx = useCallback((): AudioContext => {
        if (!ctxRef.current || ctxRef.current.state === 'closed') {
            ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        // Resume if suspended (browser autoplay policy)
        if (ctxRef.current.state === 'suspended') {
            ctxRef.current.resume();
        }
        return ctxRef.current;
    }, []);

    const playClick = useCallback(() => {
        try {
            const ctx = getCtx();
            const now = ctx.currentTime;

            // ── Master output gain ──────────────────────────────────────────────
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.18, now);
            masterGain.connect(ctx.destination);

            // ── 1. Click transient — short noise burst ──────────────────────────
            const bufferSize = ctx.sampleRate * 0.025; // 25 ms
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1);
            }
            const noiseSource = ctx.createBufferSource();
            noiseSource.buffer = noiseBuffer;

            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.setValueAtTime(3200, now);
            noiseFilter.Q.setValueAtTime(0.8, now);

            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(1, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

            noiseSource.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(masterGain);

            noiseSource.start(now);
            noiseSource.stop(now + 0.025);

            // ── 2. Tonal body — low-mid thump ───────────────────────────────────
            const osc = ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(260, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.018);

            const oscGain = ctx.createGain();
            oscGain.gain.setValueAtTime(0.6, now);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

            osc.connect(oscGain);
            oscGain.connect(masterGain);

            osc.start(now);
            osc.stop(now + 0.02);

            // ── 3. High-frequency snap ───────────────────────────────────────────
            const snap = ctx.createOscillator();
            snap.type = 'sine';
            snap.frequency.setValueAtTime(5800, now);

            const snapGain = ctx.createGain();
            snapGain.gain.setValueAtTime(0.4, now);
            snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

            snap.connect(snapGain);
            snapGain.connect(masterGain);

            snap.start(now);
            snap.stop(now + 0.008);
        } catch {
            // Silently ignore if AudioContext is unavailable (SSR, old browsers)
        }
    }, [getCtx]);

    return { playClick };
}
