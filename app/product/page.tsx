'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from '@/client/components/ui/splittext';

import {
    Server,
    Dna,
    Vault,
    ScanLine,
    MonitorPlay,
    ChevronLeft,
    ChevronRight,
    Database,
    Shield,
    X
} from 'lucide-react';
import DecryptedText from '@/client/components/ui/decryptedText';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};
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
        description: "Stop paying for data you aren't using. Migrate your Tier-3 and Tier-4 archival data to our passive DNA Vaults and turn your active cost sinks into passive assets.",
        image: "https://placehold.co/1200x800/0a0a0a/7c3aed?text=Cold+Storage"
    },
    {
        title: "High-Density Long-Term Retention",
        description: "Shrink your physical footprint and reclaim valuable floor space in your data center. Replace aisles of magnetic tape libraries with a single BioCompute rack, freeing up power and space for high-performance compute tasks.",
        image: "https://placehold.co/1200x800/0a0a0a/a855f7?text=High+Density",
        stats: [
            { label: "Space Optimized", value: "98%", color: "text-green-400" },
            { label: "Density Increase", value: "10^6x", color: "text-blue-400" },
            { label: "Power Reduction", value: "100%", color: "text-purple-400" }
        ]
    },
    {
        title: "Secure Data Transport",
        description: "Move Exabytes in your wallet. Transferring massive datasets over the internet is slow. BioCompute allows you to physically transport Exabytes of encrypted data in a localized, durable medium that is immune to electromagnetic interference.",
        image: "https://placehold.co/1200x800/0a0a0a/10b981?text=Secure+Transport"
    }
];

const useCasesItems = [
    {
        title: "Hyperscale Cloud & AI",
        description: "Slash operational costs by offloading cold data to passive, room-temperature storage. Turn off water-cooling loops and drastically reduce your facility's carbon footprint.",
        image: "https://placehold.co/800x600/1a1a1a/7c3aed?text=Cloud+%26+AI"
    },
    {
        title: "Space Exploration",
        description: "Drastically reduce payload mass by replacing heavy server racks with sub-kilogram scale media. Preserve mission-critical data for centuries in deep space without draining onboard power.",
        image: "https://placehold.co/800x600/1a1a1a/7c3aed?text=Space+Exploration"
    },
    {
        title: "BFSI",
        description: "Ensure absolute immutability for transaction logs and legal records. Protect critical assets from ransomware with a physically air-gapped, unhackable medium.",
        image: "https://placehold.co/800x600/1a1a1a/7c3aed?text=BFSI"
    },
    {
        title: "Media & Entertainment",
        description: "Future-proof your master archives against format obsolescence. Preserve high-fidelity cultural assets for centuries without the risk of degradation.",
        image: "https://placehold.co/800x600/1a1a1a/7c3aed?text=Media+%26+Entertainment"
    },
    {
        title: "Research & Development",
        description: "Eliminate the \"store or delete\" dilemma. Retain every dataset forever for future analysis & discovery.",
        image: "https://placehold.co/800x600/1a1a1a/7c3aed?text=Research+%26+Development"
    },
    {
        title: "Government & Public Sector",
        description: "Secure national heritage on a medium with a 500-year half-life. End the expensive, risky cycle of migrating data to new magnetic tapes every decade.",
        image: "https://placehold.co/800x600/1a1a1a/7c3aed?text=Government+%26+Public"
    }
];

function FitsInStackSection(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Card configurations (kept from your original code)
    const cardConfigs = [
        {
            icon: <Server className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-purple-400" />,
            gradient: "from-purple-900/20 to-black",
            bgPattern: (
                <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full grid grid-cols-4 gap-1 sm:gap-2 p-2 sm:p-3 md:p-4">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="bg-purple-500/30 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </div>
            )
        },
        {
            icon: <Database className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-fuchsia-400 opacity-50" />,
            gradient: "from-fuchsia-900/20 to-black",
            stats: fitsStackItems[1].stats
        },
        {
            icon: <Shield className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-emerald-400" />,
            gradient: "from-emerald-900/20 to-black",
            pulseRings: true
        }
    ];

    useGSAP(() => {
        if (!containerRef.current || !textRef.current || !cardsRef.current) return;

        // Responsive values based on screen size
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        const textYPosition = isMobile ? "-22vh" : isTablet ? "-25vh" : "-28vh";
        const textXPosition = isMobile ? "-35vw" : isTablet ? "-38vw" : "-32vw";
        const textScale = isMobile ? 0.5 : isTablet ? 0.45 : 0.4;
        const cardsYPosition = isMobile ? "18vh" : isTablet ? "16vh" : "10vh";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%", // Determines how long the scroll animation lasts
                pin: true,     // Locks the container in place while animating
                scrub: 1,      // Smooths the animation to the scrollbar
                onUpdate: (self) => {
                    // Update state when scroll progress > 80%
                    setIsScrollComplete(self.progress > 0.8);
                }
            }
        });

        // 1. Shrink and move the text to the top-left
        tl.to(textRef.current, {
            scale: textScale,     // Responsive shrink
            y: textYPosition,     // Responsive vertical position
            x: textXPosition,     // Move to left side
            duration: 1,
            ease: "power2.inOut"
        }, "start");

        // 2. Keep subtitle visible (removed fade-out animation)

        // 3. Bring in the cards from the bottom
        tl.fromTo(cardsRef.current,
            {
                y: "100vh",
                opacity: 0
            },
            {
                y: cardsYPosition, // Responsive landing position
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                stagger: 0.1
            },
            "start+=0.3" // Starts slightly after text begins moving
        );

    }, { scope: containerRef });

    // Expansion logic (kept largely the same but simplified)
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [isScrollComplete, setIsScrollComplete] = useState(false);

    return (
        // The container is TALL (h-[250vh]) to allow scroll room, but content is sticky
        <div ref={containerRef} className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center">

            {/* The Text Container - centers by default */}
            <div ref={textRef} className={`fixed z-[110] flex flex-col pointer-events-none px-2 transition-all duration-300 ${isScrollComplete
                ? 'items-start justify-center '
                : 'items-center justify-center origin-center'
                }`}>
                <SplitText
                    text="Product"
                    className="text-8xl font-semibold text-center"
                    delay={50}
                    duration={2}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                <DecryptedText
                    sequential
                    useOriginalCharsOnly
                    animateOn='view'
                    text="Where BioCompute Fits in Your Stack"
                    speed={50}
                    maxIterations={10}
                    characters="ABCD1234!?"
                    className="revealed "
                    parentClassName="all-letters"
                    encryptedClassName="encrypted"
                />
            </div>

            {/* Cards Container */}
            <div ref={cardsRef} className="absolute sm:-mt-12 z-10 w-full max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
                    {fitsStackItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setExpandedCard(index)}
                            className={`
                                group relative bg-zinc-900/80 backdrop-blur-md rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden 
                                border border-white/10 hover:border-purple-500/50 
                                transition-all duration-300 cursor-pointer h-[120px] sm:h-[160px] md:h-[200px] lg:h-[400px] flex flex-col
                            `}
                        >
                            {/* Card Content Construction */}
                            <div className="p-1.5 sm:p-2 md:p-3 lg:p-6 h-full flex flex-col relative z-10">
                                {/* Visual Top */}
                                <div className={`flex-1 mb-1 sm:mb-1.5 md:mb-2 lg:mb-6 flex items-center justify-center bg-gradient-to-br ${cardConfigs[index].gradient} rounded-md sm:rounded-lg lg:rounded-xl relative overflow-hidden`}>
                                    {cardConfigs[index].bgPattern}

                                    {/* Stats Render */}
                                    {cardConfigs[index].stats && (
                                        <div className="w-full h-full flex flex-col justify-center p-1 sm:p-1.5 md:p-2 lg:p-4 gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-3">
                                            {cardConfigs[index].stats?.map((stat, i) => (
                                                <div key={i} className="flex justify-between items-center w-full">
                                                    <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-sm text-gray-400">{stat.label}</span>
                                                    <span className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-base font-bold ${stat.color}`}>{stat.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Pulse Rings */}
                                    {cardConfigs[index].pulseRings && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="absolute w-full h-full border border-emerald-500/20 rounded-full animate-ping opacity-20" />
                                        </div>
                                    )}

                                    {/* Icon */}
                                    {!cardConfigs[index].stats && (
                                        <div className="relative z-10">
                                            {cardConfigs[index].icon}
                                        </div>
                                    )}
                                </div>

                                {/* Title & Action */}
                                <div className="flex justify-between items-center gap-1">
                                    <h3 className="text-[9px] sm:text-[10px] md:text-xs lg:text-xl font-bold text-white line-clamp-2 leading-tight">{item.title}</h3>
                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-8 lg:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-purple-600 transition-colors flex-shrink-0 text-[9px] sm:text-[10px]">
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expanded Modal (Copied logic) */}
            <AnimatePresence>
                {expandedCard !== null && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8 pt-20 sm:pt-24 md:pt-28"
                        onClick={() => setExpandedCard(null)}
                    >
                        <motion.div
                            className="bg-zinc-900 w-full max-w-2xl max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                            layoutId={`card-${expandedCard}`}
                        >
                            <button onClick={() => setExpandedCard(null)} className="sticky top-2 float-right p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10">
                                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </button>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 pr-10 clear-both">{fitsStackItems[expandedCard].title}</h2>
                            <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">{fitsStackItems[expandedCard].description}</p>
                            <img src={fitsStackItems[expandedCard].image} alt="Detail" className="w-full rounded-xl" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

function UseCasesSection(): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = useCasesItems.length;

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                handlePrevious();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    const handlePrevious = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const currentItem = useCasesItems[currentSlide];

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                {/* Section Title */}
                <div className="mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        Use Cases
                    </h2>
                </div>

                {/* Carousel Container */}
                <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px]">
                    {/* Left Side - Text Content (40%) */}
                    <div className="lg:w-2/5 flex flex-col justify-center space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className="space-y-6"
                            >
                                {/* Slide Counter */}
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-12 bg-gradient-to-r from-purple-500 to-blue-500" />
                                    <span className="text-purple-400 font-mono text-sm">
                                        {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    {currentItem.title}
                                </h3>

                                {/* Description */}
                                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                    {currentItem.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-4 pt-4">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrevious}
                                className="group relative w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                className="group relative w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                            </button>

                            {/* Slide Indicators */}
                            <div className="flex items-center gap-2 ml-4">
                                {useCasesItems.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide
                                            ? 'w-8 bg-gradient-to-r from-purple-500 to-blue-500'
                                            : 'w-1.5 bg-white/20 hover:bg-white/40'
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image (60%) */}
                    <div className="lg:w-3/5 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                                className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-white/10"
                            >
                                {/* Image with gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                <img
                                    src={currentItem.image}
                                    alt={currentItem.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Decorative elements */}
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <div className="absolute top-4 right-4 w-20 h-20 border border-purple-500/30 rounded-full" />
                                    <div className="absolute bottom-4 left-4 w-32 h-32 border border-blue-500/20 rounded-full" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Keyboard hint */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 font-mono">
                        Use <span className="text-purple-400">←</span> <span className="text-purple-400">→</span> keys to navigate
                    </p>
                </div>
            </div>
        </section>
    );
}

function HowItWorksSection(): JSX.Element {
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
            <div className="absolute top-28 left-0 w-full z-20 text-center px-4 pointer-events-none">
                <h2 className="text-3xl text-center md:text-3xl font-bold text-white tracking-tight text-purple-500/80">How It Works</h2>
            </div>

            {/* SLIDER TRACK */}
            <div ref={slider} className="mt-16 flex h-full w-[400%]">
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
        <>
            <FitsInStackSection />
            <main className="bg-black">
                <UseCasesSection />
                <HowItWorksSection />
            </main>
        </>
    );
}
