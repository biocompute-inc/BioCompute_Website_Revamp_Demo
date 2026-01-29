'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Optional: for smoother click-to-scroll
import { useGSAP } from '@gsap/react';
import {
    Server,
    Dna,
    Vault,
    ScanLine,
    MonitorPlay
} from 'lucide-react';
// import DNABackground from '@/components/DNABackground';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const steps = [
    {
        id: 0,
        title: "Digital Encoding",
        subtitle: "01. Encoding",
        description: "Binary data (0s and 1s) is translated into the four nucleotide bases of DNA: A, C, G, T.",
        icon: <Server className="w-16 h-16 md:w-32 md:h-32 text-purple-400" />,
    },
    {
        id: 1,
        title: "Synthesis",
        subtitle: "02. Writing",
        description: "Advanced enzymatic processes physically synthesize these sequences into synthetic DNA strands.",
        icon: <Dna className="w-16 h-16 md:w-32 md:h-32 text-purple-400" />,
    },
    {
        id: 2,
        title: "The Vault",
        subtitle: "03. Storage",
        description: "DNA is preserved in ultra-dense, cold storage vaults. A single gram can store terabytes for centuries.",
        icon: <Vault className="w-16 h-16 md:w-32 md:h-32 text-purple-400" />,
    },
    {
        id: 3,
        title: "Sequencing",
        subtitle: "04. Reading",
        description: "When files are retrieved, high-speed sequencers read the nucleotide order back into digital format.",
        icon: <ScanLine className="w-16 h-16 md:w-32 md:h-32 text-purple-400" />,
    },
    {
        id: 4,
        title: "Decoding",
        subtitle: "05. Restoration",
        description: "The sequence is decoded back into binary, perfectly restoring the original files.",
        icon: <MonitorPlay className="w-16 h-16 md:w-32 md:h-32 text-purple-400" />,
    },
];

export default function HowItWorks() {
    const container = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<ScrollTrigger | null>(null);
    const [activeStep, setActiveStep] = useState(0);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".panel");
        const totalPanels = panels.length;

        const anim = gsap.to(panels, {
            xPercent: -100 * (totalPanels - 1),
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                scrub: 1,
                snap: 1 / (totalPanels - 1),
                end: () => "+=" + (slider.current?.scrollWidth || window.innerWidth),
                // UPDATE LOGIC: Map scroll progress (0-1) to active step index
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Calculate index (0 to 4) based on progress
                    const newIndex = Math.round(progress * (totalPanels - 1));
                    setActiveStep(newIndex);
                }
            }
        });

        // Store reference to trigger for click-navigation
        triggerRef.current = anim.scrollTrigger;

    }, { scope: container });

    // Handle Tab Click
    const jumpToStep = (index: number) => {
        const trigger = triggerRef.current;
        if (!trigger || !container.current) return;

        // Calculate the exact scroll position for this step
        const totalScrollDistance = trigger.end - trigger.start;
        const progressPerStep = 1 / (steps.length - 1);
        const targetScroll = trigger.start + (totalScrollDistance * (progressPerStep * index));

        // Scroll there smoothly
        gsap.to(window, { scrollTo: targetScroll, duration: 1, ease: "power2.out" });
    };

    return (
        <div ref={container} className="relative w-full h-screen overflow-hidden bg-black flex flex-col">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                {/* <DNABackground /> */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Header */}
            <div className="absolute top-20 left-0 w-full z-20 text-center px-4 pointer-events-none">
                {/* <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">How It Works</h1> */}
            </div>

            {/* SLIDER TRACK */}
            <div ref={slider} className="flex h-full w-[500%]">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="panel relative w-screen h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 p-6 box-border border-r border-white/5"
                    >
                        {/* Icon Box */}
                        <div className="w-48 h-48 md:w-[450px] md:h-[450px] flex-shrink-0 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.15)] backdrop-blur-sm">
                            {step.icon}
                        </div>

                        {/* Text Content */}
                        <div className="max-w-xl text-center md:text-left">
                            <div className="text-sm md:text-base text-purple-400 font-bold uppercase tracking-widest mb-2">
                                {step.subtitle}
                            </div>
                            <h3 className="text-3xl md:text-6xl font-bold text-white mb-6">
                                {step.title}
                            </h3>
                            <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* BOTTOM NAVIGATION TABS */}
            <div className="absolute bottom-0 w-full z-30 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-6">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between md:justify-center items-end border-t border-white/10 pt-4 md:gap-4">
                        {steps.map((step, index) => {
                            const isActive = index === activeStep;

                            return (
                                <button
                                    key={step.id}
                                    onClick={() => jumpToStep(index)}
                                    className={`
                       group relative flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer flex-1 pb-4
                       ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                     `}
                                >
                                    {/* Step Title (Moves up when active) */}
                                    <span className={`
                        text-[9px] md:text-xs font-bold uppercase tracking-widest text-white transition-transform duration-300
                        ${isActive ? 'translate-y-0' : 'translate-y-2'}
                      `}>
                                        {step.title}
                                    </span>

                                    {/* Progress Bar (Glows when active) */}
                                    <div className={`
                        h-1 w-full rounded-full transition-all duration-500
                        ${isActive ? 'bg-purple-500 shadow-[0_0_15px_#a855f7] scale-x-100' : 'bg-white/20 scale-x-90'}
                      `} />
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}