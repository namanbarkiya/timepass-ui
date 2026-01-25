"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Flashlight } from "lucide-react";

const CONE_HW = 0.42; // half-width at cursor — larger lit area
const LERP = 0.11;
const SPOT_PX = 40; // distance from left/bottom to icon center (left-5 + half of h-10)

export default function LampBanner() {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [smooth, setSmooth] = useState({ x: 0, y: 0 });
    const [rect, setRect] = useState<DOMRect | null>(null);
    const raf = useRef<number | undefined>(undefined);
    const didInit = useRef(false);

    const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        setRect(r);
        setMouse({ x, y });
        if (!didInit.current) {
            setSmooth({ x, y });
            didInit.current = true;
        }
        setActive(true);
    }, []);

    const onLeave = useCallback(() => {
        setActive(false);
        didInit.current = false;
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        setRect(el.getBoundingClientRect());
        const ro = new ResizeObserver(() => {
            setRect(el.getBoundingClientRect());
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const step = () => {
            setSmooth((prev) => ({
                x: prev.x + (mouse.x - prev.x) * LERP,
                y: prev.y + (mouse.y - prev.y) * LERP,
            }));
            raf.current = requestAnimationFrame(step);
        };
        if (active) raf.current = requestAnimationFrame(step);
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [active, mouse.x, mouse.y]);

    const w = rect?.width ?? 1;
    const h = rect?.height ?? 1;
    const sx = w > 0 ? smooth.x / w : 0.5;
    const sy = h > 0 ? smooth.y / h : 0.5;

    // beam origin at icon center (left-5 + half of icon, bottom-5 + half of icon)
    const SPOT_X = w > 1 ? SPOT_PX / w : 0.1;
    const SPOT_Y = h > 40 ? (h - SPOT_PX) / h : 0.85;

    // cone narrows as cursor moves right (further from source)
    const hw = CONE_HW * Math.max(0.52, 1.5 - 0.72 * sx);
    const conePoints = `${SPOT_X},${SPOT_Y} ${Math.max(0, sx - hw)},${sy} ${Math.min(1, sx + hw)},${sy}`;

    // icon rotation: point from corner toward cursor (45° when inactive)
    // +90°: Lucide Flashlight’s “forward” is up; atan2 0° is right
    const iconX = SPOT_PX;
    const iconY = h - SPOT_PX;
    const angle =
        active
            ? Math.atan2(smooth.y - iconY, smooth.x - iconX) * (180 / Math.PI) + 90
            : 45;

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative w-full min-h-[280px] overflow-hidden"
        >
            {/* base */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(150deg, #1a191d 0%, #222126 35%, #252328 70%, #1e1d21 100%)",
                }}
            />
            {/* soft orbs */}
            <div
                className="absolute right-[12%] top-[30%] h-40 w-40 rounded-full opacity-[0.12] blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(220,215,240,0.5) 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-[20%] right-[28%] h-32 w-32 rounded-full opacity-[0.1] blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(200,210,230,0.4) 0%, transparent 70%)",
                }}
            />

            {/* torch at corner — rotates to point at cursor */}
            <div
                className="pointer-events-none absolute left-5 bottom-5 z-20"
                style={{ transform: `rotate(${angle}deg)` }}
            >
                <Flashlight className="h-10 w-10 text-zinc-500" strokeWidth={1.5} aria-hidden />
            </div>

            {/* glow — strong warm light only inside the beam */}
            {active && (
                <div
                    className="pointer-events-none absolute inset-0 z-[11]"
                    style={{
                        background: `radial-gradient(circle 58% at ${sx * 100}% ${sy * 100}%, rgba(255,253,245,0.98) 0%, rgba(255,251,235,0.75) 30%, rgba(255,250,228,0.45) 55%, rgba(255,248,222,0.18) 80%, transparent 100%)`,
                        WebkitMaskImage: "url(#lamp-cone-glow-mask)",
                        WebkitMaskSize: "100% 100%",
                        WebkitMaskPosition: "0 0",
                        maskImage: "url(#lamp-cone-glow-mask)",
                        maskSize: "100% 100%",
                        maskPosition: "0 0",
                    }}
                />
            )}

            {/* copy — centered */}
            <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-[54%] -translate-x-1/2 -translate-y-1/2 px-4 text-center">
                <p
                    className="text-xl font-semibold tracking-[-0.02em]"
                    style={{ color: "rgba(255,253,250,0.96)" }}
                >
                    The spotlight follows your cursor
                </p>
                <p
                    className="mt-2 text-[0.9375rem] font-normal leading-snug tracking-[0.01em]"
                    style={{ color: "rgba(215,210,202,0.88)" }}
                >
                    Move over the banner — the beam spots where you look and brightens the rest.
                </p>
                <p
                    className="mt-3 text-[0.8125rem] font-normal tracking-[0.03em]"
                    style={{ color: "rgba(180,175,168,0.72)" }}
                >
                    Hover to reveal. Leave to dim.
                </p>
            </div>

            {/* mask def */}
            <svg width="0" height="0" aria-hidden>
                <defs>
                    <filter id="cone-soft" x="-0.12" y="-0.12" width="1.25" height="1.25">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.012" />
                    </filter>
                    <mask id="lamp-cone-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
                        <rect width="1" height="1" fill="white" />
                        {active && <polygon points={conePoints} fill="black" filter="url(#cone-soft)" />}
                    </mask>
                    {/* inverse: show only in cone (for glow layer) */}
                    <mask id="lamp-cone-glow-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
                        <rect width="1" height="1" fill="black" />
                        {active && <polygon points={conePoints} fill="white" filter="url(#cone-soft)" />}
                    </mask>
                </defs>
            </svg>

            {/* overlay — very dark so the lit cone reads as strong light */}
            <div
                className="pointer-events-none absolute inset-0 z-[12]"
                style={{
                    background: "rgba(5,4,8,0.94)",
                    WebkitMaskImage: "url(#lamp-cone-mask)",
                    WebkitMaskSize: "100% 100%",
                    WebkitMaskPosition: "0 0",
                    maskImage: "url(#lamp-cone-mask)",
                    maskSize: "100% 100%",
                    maskPosition: "0 0",
                }}
            />
        </div>
    );
}
