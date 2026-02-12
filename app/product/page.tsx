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
    ChevronLeft,
    ChevronRight,
    Database,
    Shield
} from 'lucide-react';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Updated steps based on user request
const steps = [
    {
        id: 0,
        title: "Encrypt & Encode",
        subtitle: "01. Encode",
        description: "Your data is encrypted at the source. Our proprietary algorithms take these encrypted binary files - video, text, or raw databases - and map them onto DNA-compatible sequences. We apply forward error correction and redundancy codes, ensuring that your data remains bit-perfect even centuries later.",
        icon: <Server className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
    {
        id: 1,
        title: "Write",
        subtitle: "02. Write",
        description: "Our proprietary enzymatic process \"edits\" data onto naturally abundant DNA templates. It operates at room temperature, allowing for massive parallelization without the energy costs of heat-cycling.",
        icon: <Dna className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
    {
        id: 2,
        title: "Store",
        subtitle: "03. Store",
        description: "Once written, the DNA is secured in BioCompute Vaults. These hermetically-sealed, high-density vessels maintain data stability for 500+ years without requiring a single watt of electricity. The medium is physically air-gapped and locked, immune to electromagnetic interference or power failures.",
        icon: <Vault className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
    {
        id: 3,
        title: "Read",
        subtitle: "04. Read",
        description: "To retrieve your data, we utilize Solid-State Nanopores. As the DNA strand passes through a nanoscale hole in a silicon chip, it creates a unique electrical signature. We measure this current in real-time, converting signals back into your encrypted digital files instantly.",
        icon: <ScanLine className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-400" />,
    },
];

const fitsStackItems = [
    {
        title: "Cold Storage Offloading",
        description: "Stop paying for data you aren't using. Migrate your Tier-3 and Tier-4 archival data to our passive DNA Vaults and turn your active cost sinks into passive assets."
    },
    {
        title: "High-Density Long-Term Retention",
        description: "Shrink your physical footprint and reclaim valuable floor space in your data center. Replace aisles of magnetic tape libraries with a single BioCompute rack, freeing up power and space for high-performance compute tasks."
    },
    {
        title: "Secure Data Transport",
        description: "Move Exabytes in your wallet. Transferring massive datasets over the internet is slow. BioCompute allows you to physically transport Exabytes of encrypted data in a localized, durable medium that is immune to electromagnetic interference."
    }
];

const useCasesItems = [
    {
        title: "Hyperscale Cloud & AI",
        description: "Slash operational costs by offloading cold data to passive, room-temperature storage. Turn off water-cooling loops and drastically reduce your facility's carbon footprint."
    },
    {
        title: "Space Exploration",
        description: "Drastically reduce payload mass by replacing heavy server racks with sub-kilogram scale media. Preserve mission-critical data for centuries in deep space without draining onboard power."
    },
    {
        title: "BFSI",
        description: "Ensure absolute immutability for transaction logs and legal records. Protect critical assets from ransomware with a physically air-gapped, unhackable medium."
    },
    {
        title: "Media & Entertainment",
        description: "Future-proof your master archives against format obsolescence. Preserve high-fidelity cultural assets for centuries without the risk of degradation."
    },
    {
        title: "Research & Development",
        description: "Eliminate the \"store or delete\" dilemma. Retain every dataset forever for future analysis & discovery."
    },
    {
        title: "Government & Public Sector",
        description: "Secure national heritage on a medium with a 500-year half-life. End the expensive, risky cycle of migrating data to new magnetic tapes every decade."
    }
];

function FitsInStackSection() {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const toggleCard = (index: number) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <section className="relative w-full py-48 px-4 bg-black border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Product
                    </h2>
                    <p className="text-xl md:text-2xl text-purple-400 font-light">
                        Where BioCompute Fits in Your Stack
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 - Cold Storage */}
                    <div className="group relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                        <div className="p-8 h-full flex flex-col">
                            {/* Visual Area */}
                            <div className="flex-1 mb-6 flex items-center justify-center min-h-[280px] bg-gradient-to-br from-purple-900/20 to-black rounded-xl">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="w-full h-full grid grid-cols-4 gap-2 p-4">
                                            {[...Array(16)].map((_, i) => (
                                                <div key={i} className="bg-purple-500/30 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                            ))}
                                        </div>
                                    </div>
                                    <Server className="w-24 h-24 text-purple-400 relative z-10" />
                                </div>
                            </div>

                            {/* Title and Expand Button */}
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold text-white pr-4">
                                    Cold Storage Offloading
                                </h3>
                                <button
                                    onClick={() => toggleCard(0)}
                                    className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                >
                                    <span className={`text-white text-2xl leading-none transition-transform duration-300 ${expandedCard === 0 ? 'rotate-45' : ''}`}>+</span>
                                </button>
                            </div>

                            {/* Expandable Description */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {fitsStackItems[0].description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - High-Density */}
                    <div className="group relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                        <div className="p-8 h-full flex flex-col">
                            {/* Visual Area */}
                            <div className="flex-1 mb-6 flex items-center justify-center min-h-[280px] bg-gradient-to-br from-fuchsia-900/20 to-black rounded-xl">
                                <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 p-6">
                                    <div className="flex items-center gap-2 text-green-400 text-sm w-full">
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                                        <span>Space Optimized</span>
                                        <span className="text-gray-500 ml-auto">98%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-400 text-sm w-full">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                        <span>Density Increase</span>
                                        <span className="text-gray-500 ml-auto">10^6x</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-purple-400 text-sm w-full">
                                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                        <span>Power Reduction</span>
                                        <span className="text-gray-500 ml-auto">100%</span>
                                    </div>
                                    <Database className="w-20 h-20 text-fuchsia-400 mt-8 opacity-50" />
                                </div>
                            </div>

                            {/* Title and Expand Button */}
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold text-white pr-4">
                                    High-Density Long-Term Retention
                                </h3>
                                <button
                                    onClick={() => toggleCard(1)}
                                    className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                >
                                    <span className={`text-white text-2xl leading-none transition-transform duration-300 ${expandedCard === 1 ? 'rotate-45' : ''}`}>+</span>
                                </button>
                            </div>

                            {/* Expandable Description */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {fitsStackItems[1].description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Secure Transport */}
                    <div className="group relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                        <div className="p-8 h-full flex flex-col">
                            {/* Visual Area */}
                            <div className="flex-1 mb-6 flex items-center justify-center min-h-[280px] bg-gradient-to-br from-emerald-900/20 to-black rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 border-4 border-emerald-500/20 rounded-full" />
                                    <div className="absolute w-40 h-40 border-2 border-emerald-500/10 rounded-full animate-ping" />
                                </div>
                                <div className="relative z-10 bg-emerald-900/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                                    <Shield className="w-16 h-16 text-emerald-400" />
                                </div>
                            </div>

                            {/* Title and Expand Button */}
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold text-white pr-4">
                                    Secure Data Transport
                                </h3>
                                <button
                                    onClick={() => toggleCard(2)}
                                    className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                >
                                    <span className={`text-white text-2xl leading-none transition-transform duration-300 ${expandedCard === 2 ? 'rotate-45' : ''}`}>+</span>
                                </button>
                            </div>

                            {/* Expandable Description */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {fitsStackItems[2].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function UseCasesSection() {
    return (
        <section className="relative w-full py-48 px-4 bg-zinc-950 border-b border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Use Cases
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {useCasesItems.map((item, idx) => (
                        <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-4">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorksSection() {
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

        if (anim.scrollTrigger) {
            triggerRef.current = anim.scrollTrigger;
        }

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
            <div className="absolute top-20 left-0 mt-16 w-full z-20 text-center px-4 pointer-events-none">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase text-purple-500/80">How It Works</h2>
            </div>

            {/* SLIDER TRACK */}
            <div ref={slider} className="flex h-full w-[400%]">
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

export default function ProductPage() {
    return (
        <main className="bg-black min-h-screen">
            <FitsInStackSection />
            <UseCasesSection />
            <HowItWorksSection />
        </main>
    );
}
