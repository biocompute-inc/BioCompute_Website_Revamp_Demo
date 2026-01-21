'use client'
import DNAHelix from '../../client/components/ui/dnahelix';
// import ShinyText from '@/client/components/ui/shinytext';

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <DNAHelix
                    linesGradient={["#9333ea", "#a855f7", "#c084fc", "#7c3aed", "#6366f1", "#4f46e5", "#3b82f6", "#2563eb", "#1d4ed8"]} // Purple to Blue gradient
                    enabledWaves={['top', 'middle', 'bottom']} // Enable all three paths
                    lineCount={[1, 1, 1]} // Different counts for each path (19 total DNA strands)
                    lineDistance={[0.2, 0.15, 0.18]} // Tighter spacing for more strands
                    topWavePosition={{ x: 8.5, y: 0, rotate: -0.9 }} // Upper right to lower left diagonal
                    middleWavePosition={{ x: 7.0, y: 0.1, rotate: 0.1 }} // Left middle to right-above middle (horizontal-ish)
                    bottomWavePosition={{ x: 8.0, y: -1, rotate: 0.8 }} // Lower right to upper left diagonal
                    animationSpeed={0.2}
                    bendStrength={0.8}
                    opacity={0.6}
                />
            </div>

            {/* Foreground Content */}
            {/* <div className="relative z-10 text-center font-bold text-8xl px-60 py-10 bg-black/45 backdrop-blur-xl rounded-2xl">
                <h1><ShinyText
                    text={`Welcome to the`}
                    speed={2}
                    delay={0}
                    color="#ffffff"
                    shineColor="#3700ff"
                    spread={20}
                    direction="right"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                /></h1>
                <ShinyText
                    text={`STRAND AGE`}
                    speed={2}
                    delay={0}
                    color="#ffffff"
                    shineColor="#ce67fe"
                    spread={20}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                />
            </div> */}
        </div>
    );
}