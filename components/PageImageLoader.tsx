'use client';

import { useEffect, useState } from 'react';

interface PageImageLoaderProps {
    /** When provided, the loader dismisses as soon as this specific image URL loads.
     *  When omitted, it waits for ALL images on the page (original behaviour). */
    src?: string;
}

export default function PageImageLoader({ src }: PageImageLoaderProps) {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const dismiss = () => {
            if (cancelled) return;
            setFadeOut(true);
            setTimeout(() => {
                if (!cancelled) setVisible(false);
            }, 600);
        };

        // Safety net: never block more than 6 s
        const safety = setTimeout(dismiss, 6000);

        if (src) {
            // Watch only the specific image
            const img = new Image();
            img.onload = dismiss;
            img.onerror = dismiss;
            img.src = src;
            // If already cached the browser marks it complete synchronously
            if (img.complete) {
                dismiss();
            }
        } else {
            // Original behaviour: wait for every <img> on the page
            const checkImages = () => {
                const imgs = Array.from(document.images);
                if (imgs.length === 0) { dismiss(); return; }

                let pending = imgs.filter(i => !i.complete).length;
                if (pending === 0) { dismiss(); return; }

                const onSettle = () => { pending--; if (pending <= 0) dismiss(); };
                imgs.forEach(i => {
                    if (!i.complete) {
                        i.addEventListener('load', onSettle, { once: true });
                        i.addEventListener('error', onSettle, { once: true });
                    }
                });
            };

            const timer = setTimeout(checkImages, 50);
            window.addEventListener('load', dismiss, { once: true });

            return () => {
                cancelled = true;
                clearTimeout(timer);
                clearTimeout(safety);
                window.removeEventListener('load', dismiss);
            };
        }

        return () => {
            cancelled = true;
            clearTimeout(safety);
        };
    }, [src]);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
            style={{
                transition: 'opacity 0.6s ease',
                opacity: fadeOut ? 0 : 1,
                pointerEvents: fadeOut ? 'none' : 'all',
            }}
        >
            {/* Logo image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/logoLG.png"
                alt="BioCompute"
                className="mb-10 h-10 w-auto select-none"
                style={{ objectFit: 'contain' }}
            />

            {/*
             * DNA double-helix spinner
             *
             * The SVG draws 3 full periods (180 px tall) of a double helix viewed
             * side-on.  The <g> is animated to scroll upward by exactly one period
             * (60 px) so the loop is seamless.
             *
             * Depth illusion: each bezier half-cycle is split at its midpoint
             * (the strand–strand crossover).  Back segments are drawn first at
             * reduced opacity; rungs sit above them; front segments are drawn last
             * at full opacity.
             *
             * Strand geometry (viewport 50 × 100, content 50 × 180):
             *   centre-x = 25, left-peak x = 8, right-peak x = 42
             *   period = 60 px  →  crossovers at y = 15, 45, 75 …
             */}
            <style>{`
                @keyframes dnaScroll {
                    from { transform: translateY(0px); }
                    to   { transform: translateY(-60px); }
                }
            `}</style>

            <div style={{ width: 50, height: 100, overflow: 'hidden' }}>
                <svg width="50" height="180" viewBox="0 0 50 180" fill="none">
                    <g style={{ animation: 'dnaScroll 1.5s linear infinite' }}>

                        {/* ── BACK segments (low opacity, drawn first) ── */}

                        {/* Strand 1 left/back sub-paths */}
                        <path
                            d={[
                                'M25,15 C16.5,18.75 8,22.5 8,30',
                                'M8,30 C8,37.5 16.5,41.25 25,45',
                                'M25,75 C16.5,78.75 8,82.5 8,90',
                                'M8,90 C8,97.5 16.5,101.25 25,105',
                                'M25,135 C16.5,138.75 8,142.5 8,150',
                                'M8,150 C8,157.5 16.5,161.25 25,165',
                            ].join(' ')}
                            stroke="rgba(165,128,192,0.3)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />

                        {/* Strand 2 left/back sub-paths */}
                        <path
                            d={[
                                'M8,0 C8,7.5 16.5,11.25 25,15',
                                'M25,45 C16.5,48.75 8,52.5 8,60',
                                'M8,60 C8,67.5 16.5,71.25 25,75',
                                'M25,105 C16.5,108.75 8,112.5 8,120',
                                'M8,120 C8,127.5 16.5,131.25 25,135',
                                'M25,165 C16.5,168.75 8,172.5 8,180',
                            ].join(' ')}
                            stroke="rgba(201,160,232,0.3)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />

                        {/* ── RUNGS (base pairs) ── */}
                        {[0, 30, 60, 90, 120, 150, 180].map(y => (
                            <line
                                key={y}
                                x1="8" y1={y} x2="42" y2={y}
                                stroke="rgba(165,128,192,0.55)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        ))}

                        {/* ── FRONT segments (full opacity, drawn last) ── */}

                        {/* Strand 1 right/front sub-paths */}
                        <path
                            d={[
                                'M42,0 C42,7.5 33.5,11.25 25,15',
                                'M25,45 C33.5,48.75 42,52.5 42,60',
                                'M42,60 C42,67.5 33.5,71.25 25,75',
                                'M25,105 C33.5,108.75 42,112.5 42,120',
                                'M42,120 C42,127.5 33.5,131.25 25,135',
                                'M25,165 C33.5,168.75 42,172.5 42,180',
                            ].join(' ')}
                            stroke="#a580c0"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />

                        {/* Strand 2 right/front sub-paths */}
                        <path
                            d={[
                                'M25,15 C33.5,18.75 42,22.5 42,30',
                                'M42,30 C42,37.5 33.5,41.25 25,45',
                                'M25,75 C33.5,78.75 42,82.5 42,90',
                                'M42,90 C42,97.5 33.5,101.25 25,105',
                                'M25,135 C33.5,138.75 42,142.5 42,150',
                                'M42,150 C42,157.5 33.5,161.25 25,165',
                            ].join(' ')}
                            stroke="#c9a0e8"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />

                    </g>
                </svg>
            </div>

            {/* Label */}
            <p className="mt-6 text-xs tracking-[0.25em] uppercase text-white/40 select-none">
                Loading&hellip;
            </p>
        </div>
    );
}
