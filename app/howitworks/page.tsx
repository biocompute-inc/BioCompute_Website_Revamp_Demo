'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import {
    Server,
    Dna,
    Vault,
    ScanLine,
    MonitorPlay,
    ChevronLeft,  // Added Icon
    ChevronRight  // Added Icon
} from 'lucide-react';

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
        icon: <Server className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
    {
        id: 1,
        title: "Synthesis",
        subtitle: "02. Writing",
        description: "Advanced enzymatic processes physically synthesize these sequences into synthetic DNA strands.",
        icon: <Dna className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
    {
        id: 2,
        title: "The Vault",
        subtitle: "03. Storage",
        description: "DNA is preserved in ultra-dense, cold storage vaults. A single gram can store terabytes for centuries.",
        icon: <Vault className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
    {
        id: 3,
        title: "Sequencing",
        subtitle: "04. Reading",
        description: "When files are retrieved, high-speed sequencers read the nucleotide order back into digital format.",
        icon: <ScanLine className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
    {
        id: 4,
        title: "Decoding",
        subtitle: "05. Restoration",
        description: "The sequence is decoded back into binary, perfectly restoring the original files.",
        icon: <MonitorPlay className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
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
                onUpdate: (self) => {
                    const progress = self.progress;
                    const newIndex = Math.round(progress * (totalPanels - 1));
                    setActiveStep(newIndex);
                }
            }
        });

        triggerRef.current = anim.scrollTrigger;

    }, { scope: container });

    // Handle Tab Click / Navigation
    const jumpToStep = (index: number) => {
        // Boundary checks
        if (index < 0 || index >= steps.length) return;

        const trigger = triggerRef.current;
        if (!trigger || !container.current) return;

        const totalScrollDistance = trigger.end - trigger.start;
        const progressPerStep = 1 / (steps.length - 1);
        const targetScroll = trigger.start + (totalScrollDistance * (progressPerStep * index));

        gsap.to(window, { scrollTo: targetScroll, duration: 1, ease: "power2.out" });
    };

    return (
        <div ref={container} className="relative w-full h-screen overflow-hidden bg-black flex flex-col">

            {/* Background */}
            <div className="absolute inset-0 z-0">
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
                        className="panel relative w-screen h-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-24 p-4 sm:p-6 box-border border-r border-white/5"
                    >
                        {/* Icon Box */}
                        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-[450px] lg:h-[450px] flex-shrink-0 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.15)] backdrop-blur-sm">
                            {step.icon}
                        </div>

                        {/* Text Content */}
                        <div className="max-w-xl text-center md:text-left px-4">
                            <div className="text-xs sm:text-sm md:text-base text-purple-400 font-bold uppercase tracking-widest mb-2">
                                {step.subtitle}
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
                                {step.title}
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-light">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* BOTTOM NAVIGATION CONTAINER */}
            <div className="absolute bottom-0 w-full z-30 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-6">
                <div className="max-w-7xl mx-auto px-4 flex items-end gap-2 md:gap-6">

                    {/* --- PREV ARROW --- */}
                    <button
                        onClick={() => jumpToStep(activeStep - 1)}
                        disabled={activeStep === 0}
                        className={`
                          group relative p-3 md:p-3 mb-3 rounded-full border border-white/10 bg-white/5 
                          transition-all duration-300 flex-shrink-0
                          ${activeStep === 0
                                ? 'opacity-30 cursor-not-allowed'
                                : 'opacity-100 hover:bg-purple-500/20 hover:border-purple-500/50 cursor-pointer'}
                        `}
                    >
                        <ChevronLeft className={`w-5 h-5 md:w-4 md:h-4 text-white transition-transform duration-300 ${activeStep !== 0 && 'group-hover:-translate-x-1'}`} />
                    </button>

                    {/* --- TABS (Flex Grow to fill space) --- */}
                    <div className="flex-1 flex justify-between md:justify-center items-end border-t border-white/10 pt-4 md:gap-4">
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
                                    {/* Step Title */}
                                    <span className={`
                                      hidden md:block text-[9px] md:text-xs font-bold uppercase tracking-widest text-white transition-transform duration-300
                                      ${isActive ? 'translate-y-0' : 'translate-y-2'}
                                    `}>
                                        {step.title}
                                    </span>
                                    {/* Mobile Only Index */}
                                    <span className={`
                                      md:hidden text-[9px] font-bold text-white transition-transform duration-300
                                      ${isActive ? 'translate-y-0' : 'translate-y-2'}
                                    `}>
                                        0{index + 1}
                                    </span>

                                    {/* Progress Bar */}
                                    <div className={`
                                      h-1 w-full rounded-full transition-all duration-500
                                      ${isActive ? 'bg-purple-500 shadow-[0_0_15px_#a855f7] scale-x-100' : 'bg-white/20 scale-x-90'}
                                    `} />
                                </button>
                            );
                        })}
                    </div>

                    {/* --- NEXT ARROW --- */}
                    <button
                        onClick={() => jumpToStep(activeStep + 1)}
                        disabled={activeStep === steps.length - 1}
                        className={`
                          group relative p-3 md:p-3 mb-3 rounded-full border border-white/10 bg-white/5 
                          transition-all duration-300 flex-shrink-0
                          ${activeStep === steps.length - 1
                                ? 'opacity-30 cursor-not-allowed'
                                : 'opacity-100 hover:bg-purple-500/20 hover:border-purple-500/50 cursor-pointer'}
                        `}
                    >
                        <ChevronRight className={`w-5 h-5 md:w-4 md:h-4 text-white transition-transform duration-300 ${activeStep !== steps.length - 1 && 'group-hover:translate-x-1'}`} />
                    </button>

                </div>
            </div>

        </div>
    );
}