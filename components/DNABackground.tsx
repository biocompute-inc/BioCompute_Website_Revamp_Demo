'use client'

import DNAHelix from "@/client/components/ui/dnahelix"

export default function DNABackground() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <DNAHelix
                linesGradient={["#7d4f95", "#8a5fa5", "#9b6fb5", "#ac7fc5", "#bd8fd5", "#9b6fb5", "#8a5fa5", "#7d4f95", "#6f3f85"]}
                enabledWaves={['top', 'middle', 'bottom']}
                lineCount={[1, 1, 1]}
                lineDistance={[0.2, 0.15, 0.18]}
                topWavePosition={{ x: 8.5, y: 0, rotate: -0.9 }}
                middleWavePosition={{ x: 7.0, y: 0.1, rotate: 0.1 }}
                bottomWavePosition={{ x: 8.0, y: -1, rotate: 0.8 }}
                animationSpeed={0.2}
                bendStrength={0.8}
                opacity={0.6}
                interactive={true}
                parallax={true}
            />
        </div>
    )
}    
