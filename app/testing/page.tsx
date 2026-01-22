'use client'
import DNABackground from '@/components/DNABackground';
import DNAHelix from '../../client/components/ui/dnahelix';
// import ShinyText from '@/client/components/ui/shinytext';

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

            Background Layer
            <div className="absolute inset-0 z-0">
                <DNABackground />
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