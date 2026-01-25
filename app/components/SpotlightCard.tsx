"use client";

import { useRef, useState, useCallback } from "react";

const SPOTLIGHT_R = 180;

export default function SpotlightCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);

    const onMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const r = cardRef.current.getBoundingClientRect();
            setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
            setActive(true);
        },
        []
    );

    const onLeave = useCallback(() => {
        setActive(false);
    }, []);

    const mask = active
        ? `radial-gradient(circle ${SPOTLIGHT_R}px at ${pos.x}px ${pos.y}px, transparent 0%, transparent 60%, black 100%)`
        : "none";

    return (
        <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative h-64 w-full overflow-hidden rounded-[1.125rem]"
        >
            {/* Base: muted, warm charcoal */}
            <div
                className="absolute inset-0 rounded-[1.125rem]"
                style={{
                    background:
                        "linear-gradient(145deg, #1c1b1f 0%, #252328 40%, #2a282d 70%, #221f24 100%)",
                }}
            />

            {/* Very soft orbs — barely there */}
            <div
                className="absolute left-[18%] top-[22%] h-32 w-32 rounded-full opacity-[0.22] blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(220,215,235,0.6) 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-[28%] right-[22%] h-28 w-28 rounded-full opacity-[0.18] blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(200,212,230,0.5) 0%, transparent 70%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1.5 px-6 text-center">
                <span
                    className="text-[1.5rem] font-medium tracking-[-0.02em]"
                    style={{
                        color: "rgba(250,249,247,0.92)",
                        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                >
                    Hover to reveal
                </span>
                <span
                    className="text-[0.8125rem] font-normal tracking-[0.02em]"
                    style={{ color: "rgba(200,196,188,0.7)" }}
                >
                    the light follows
                </span>
            </div>

            {/* Dark overlay — softer, tinted to match base */}
            <div
                className="pointer-events-none absolute inset-0 rounded-[1.125rem]"
                style={{
                    background: "rgba(12,11,14,0.78)",
                    WebkitMaskImage: mask,
                    WebkitMaskSize: "100% 100%",
                    WebkitMaskPosition: "0 0",
                    maskImage: mask,
                    maskSize: "100% 100%",
                    maskPosition: "0 0",
                }}
            />
        </div>
    );
}
