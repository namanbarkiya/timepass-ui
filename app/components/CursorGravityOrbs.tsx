"use client";

import { useState, useRef, useEffect } from "react";

const ORB_COUNT = 14;
const ATTRACT_RADIUS = 100;
const HUES = [260, 280, 300, 320]; // violet → fuchsia

export default function CursorGravityOrbs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    const [orbState, setOrbState] = useState<
        { x: number; y: number; size: number; hue: number; speed: number }[]
    >([]);
    const cursorRef = useRef<{ x: number; y: number } | null>(null);
    const homesRef = useRef<{ x: number; y: number; speed: number }[]>([]);
    const rafRef = useRef<number>();
    const positionsRef = useRef<{ x: number; y: number }[]>([]);

    // Measure container and init home positions once
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const init = () => {
            const { width, height } = el.getBoundingClientRect();
            if (width < 10 || height < 10) return;

            const homes = Array.from({ length: ORB_COUNT }, () => ({
                x: 24 + Math.random() * (width - 48),
                y: 24 + Math.random() * (height - 48),
                speed: 0.04 + Math.random() * 0.1,
            }));
            homesRef.current = homes;

            const initial = homes.map((h, i) => ({
                x: h.x,
                y: h.y,
                size: 8 + (i % 4) * 5,
                hue: HUES[i % HUES.length],
                speed: homes[i].speed,
            }));
            setOrbState(initial);
            positionsRef.current = homes.map((h) => ({ x: h.x, y: h.y }));
            setReady(true);
        };

        const ro = new ResizeObserver(init);
        ro.observe(el);
        init();
        return () => ro.disconnect();
    }, []);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
        cursorRef.current = null;
    };

    // Animation: orbs are attracted to cursor when within radius, else return home
    useEffect(() => {
        if (!ready) return;

        const tick = () => {
            const cursor = cursorRef.current;
            const homes = homesRef.current;
            const prev = positionsRef.current;
            if (homes.length === 0 || prev.length === 0) {
                rafRef.current = requestAnimationFrame(tick);
                return;
            }

            const next = prev.map((p, i) => {
                const home = homes[i];
                const toCursor = cursor
                    ? { dx: cursor.x - p.x, dy: cursor.y - p.y }
                    : { dx: 0, dy: 0 };
                const dist = cursor ? Math.hypot(toCursor.dx, toCursor.dy) : Infinity;

                let tx = home.x;
                let ty = home.y;
                if (cursor && dist < ATTRACT_RADIUS && dist > 1) {
                    // Ease toward cursor; closer = stronger pull
                    const strength = (1 - dist / ATTRACT_RADIUS) * 0.65 + 0.2;
                    tx = p.x + (cursor.x - p.x) * strength;
                    ty = p.y + (cursor.y - p.y) * strength;
                }

                const smooth = 0.06 + home.speed;
                return {
                    x: p.x + (tx - p.x) * smooth,
                    y: p.y + (ty - p.y) * smooth,
                };
            });

            positionsRef.current = next;
            setOrbState((s) =>
                s.map((o, i) => ({ ...o, x: next[i].x, y: next[i].y }))
            );
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ready]);

    return (
        <div
            ref={containerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950 via-fuchsia-950/95 to-violet-950 shadow-2xl"
        >
            {/* Soft noise-like grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />
            {/* Glow orbs */}
            {ready &&
                orbState.map((o, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full will-change-transform"
                        style={{
                            left: o.x,
                            top: o.y,
                            width: o.size,
                            height: o.size,
                            transform: "translate(-50%, -50%)",
                            background: `radial-gradient(circle at 30% 30%, hsl(${o.hue} 80% 75% / 0.7), hsl(${o.hue} 70% 55% / 0.25))`,
                            boxShadow: `0 0 ${o.size * 2}px hsl(${o.hue} 90% 70% / 0.5)`,
                        }}
                    />
                ))}
            {/* Center hint */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-white/60 backdrop-blur-sm">
                    your cursor is the sun; the orbs can&apos;t help themselves
                </span>
            </div>
        </div>
    );
}
