"use client";

import dynamic from "next/dynamic";

const IndianFlag = dynamic(() => import("@/components/IndianFlag").then((m) => m.default), {
    ssr: false,
});

export default function IndianFlagBanner() {
    return (
        <div className="relative h-[280px] w-full overflow-hidden">
            <div className="absolute inset-0">
                <IndianFlag
                    speed={6.5}
                    scale={0.7}
                    color="#7B7481"
                    noiseIntensity={0}
                    rotation={0}
                    gradient={["#ff8c00", "#ffffff", "#2daf50"]}
                    gradientAngle={45}
                    gradientReversed
                />
            </div>
        </div>
    );
}
