'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from '@/client/components/ui/splittext';
import { useIsMobile } from '@/client/hooks/use-mobile';

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
        mobileDescription: "Migrate archival data to passive DNA Vaults. Turn cost sinks into assets.",
        image: "https://placehold.co/1200x800/0a0a0a/7c3aed?text=Cold+Storage"
    },
    {
        title: "High-Density Long-Term Retention",
        description: "Shrink your physical footprint and reclaim valuable floor space in your data center. Replace aisles of magnetic tape libraries with a single BioCompute rack, freeing up power and space for high-performance compute tasks.",
        mobileDescription: "Replace tape libraries with a single rack. Reclaim space and power.",
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
        mobileDescription: "Transport Exabytes in your wallet. Durable, immune to interference.",
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
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const isMobile = useIsMobile();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="relative min-h-screen bg-black py-12 md:py-20">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 text-center pt-8 md:pt-16" style={{ opacity: expandedCard !== null ? 0 : 1, transition: 'opacity 0.3s ease' }}>
                {/* Main Title */}
                <SplitText
                    text="Digitize your destiny."
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white pb-6 mb-6 md:mb-8 leading-tight tracking-tight mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-48"
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

                {/* Description */}
                <div className="mb-8 md:mb-12 max-w-3xl mx-auto">
                    <DecryptedText
                        sequential
                        useOriginalCharsOnly
                        animateOn='view'
                        text="Where BioCompute fits in your stack"
                        speed={50}
                        maxIterations={10}
                        characters="ABCD1234!?"
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-fuchsia-200 leading-relaxed"
                        parentClassName="all-letters"
                        encryptedClassName="text-base sm:text-lg md:text-xl lg:text-2xl text-fuchsia-200 leading-relaxed"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 md:mb-16">
                    <button
                        onClick={() => scrollToSection('use-cases-section')}
                        className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-gray-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    >
                        Use Cases
                    </button>
                    <button
                        onClick={() => scrollToSection('how-it-works-section')}
                        className="group relative px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-purple-700 hover:scale-105 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 w-full sm:w-auto border-fuchsia-200/30 border-2"
                    >
                        How It Works
                    </button>
                </div>

                {/* Phone Mockup Image */}
                <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                    <div className="relative rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 sm:border-[6px] md:border-8 border-gray-800 shadow-2xl">
                        <img
                            src="https://placehold.co/400x800/f5f5f5/374151?text=App+Preview"
                            alt="App Preview"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Bento Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold px-2 sm:px-4 md:px-8 mb-6 sm:mb-8 md:mb-12 text-white">
                    Where We Fit
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {/* Row 1: High-Density Card (Large - 2 columns) */}
                    <div
                        onClick={() => setExpandedCard(1)}
                        className="group relative lg:col-span-2 bg-gradient-to-br from-fuchsia-950/40 via-purple-950/30 to-black backdrop-blur-md rounded-2xl md:rounded-3xl overflow-hidden border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all duration-500 cursor-pointer h-[400px] md:h-[500px] lg:h-[380px] xl:h-[420px] hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(217,70,239,0.3)]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                            {/* Icon & Stats Area */}
                            <div className="flex-1 flex items-center justify-center mb-3 sm:mb-4">
                                <div className="w-full max-w-md space-y-2 sm:space-y-3 lg:space-y-4">
                                    {/* Icon */}
                                    <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                                        <div className="relative">
                                            <Database className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-fuchsia-400 relative z-10" />
                                            <div className="absolute inset-0 bg-fuchsia-500/20 blur-2xl rounded-full scale-150" />
                                        </div>
                                    </div>

                                    {/* Stats Display */}
                                    <div className="space-y-2 sm:space-y-3 bg-black/30 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 border border-white/5">
                                        {fitsStackItems[1].stats?.map((stat, i) => (
                                            <div key={i} className="flex justify-between items-center group/stat">
                                                <span className="text-xs sm:text-sm md:text-base text-gray-400 group-hover/stat:text-gray-300 transition-colors">{stat.label}</span>
                                                <span className={`text-base sm:text-xl md:text-2xl font-bold ${stat.color} group-hover/stat:scale-110 transition-transform`}>
                                                    {stat.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div>
                                <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight flex-1">
                                        {fitsStackItems[1].title}
                                    </h3>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center group-hover:bg-fuchsia-600 group-hover:border-fuchsia-500 transition-all flex-shrink-0">
                                        <span className="text-white text-base sm:text-xl">+</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
                                    {fitsStackItems[1].mobileDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Row 1: Cold Storage Card (Small - 1 column) */}
                    <div
                        onClick={() => setExpandedCard(0)}
                        className="group relative bg-gradient-to-br from-purple-950/40 via-violet-950/30 to-black backdrop-blur-md rounded-2xl md:rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 cursor-pointer h-[400px] md:h-[500px] lg:h-[380px] xl:h-[420px] hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(168,85,247,0.3)]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Animated Grid Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="w-full h-full grid grid-cols-4 gap-2 p-4">
                                {[...Array(16)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-purple-500/40 rounded animate-pulse"
                                        style={{ animationDelay: `${i * 0.15}s`, animationDuration: '2s' }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                            {/* Icon Area */}
                            <div className="flex-1 flex items-center justify-center">
                                <div className="relative">
                                    <Server className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 text-purple-400 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-500" />
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div>
                                <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight flex-1">
                                        {fitsStackItems[0].title}
                                    </h3>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-500 transition-all flex-shrink-0">
                                        <span className="text-white text-base sm:text-xl">+</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                                    {fitsStackItems[0].mobileDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Secure Transport Card (Full Width - 3 columns) */}
                    <div
                        onClick={() => setExpandedCard(2)}
                        className="group relative lg:col-span-3 bg-gradient-to-br from-fuchsia-950/40 via-fuchsia-900/20 to-black backdrop-blur-md rounded-2xl md:rounded-3xl overflow-hidden border border-fuchsia-200/20 hover:border-fuchsia-200/50 transition-all duration-500 cursor-pointer h-[300px] md:h-[350px] lg:h-[280px] xl:h-[300px] hover:scale-[1.01] hover:shadow-[0_0_60px_rgba(245,208,254,0.3)]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Pulse Rings */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                            <div className="absolute w-32 h-32 md:w-48 md:h-48 border border-fuchsia-200/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                            <div className="absolute w-48 h-48 md:w-64 md:h-64 border border-fuchsia-200/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                        </div>

                        <div className="relative h-full p-4 sm:p-6 md:p-8 flex items-center pointer-events-none">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-12 w-full">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <Shield className="w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40 text-fuchsia-200 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-fuchsia-200/20 blur-3xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-500" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 sm:mb-4 gap-2 sm:gap-3">
                                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-white leading-tight flex-1">
                                            {fitsStackItems[2].title}
                                        </h3>
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-fuchsia-200/10 border border-fuchsia-200/30 flex items-center justify-center group-hover:bg-fuchsia-600 group-hover:border-fuchsia-200 transition-all mx-auto md:mx-0 flex-shrink-0">
                                            <span className="text-white text-lg sm:text-xl md:text-2xl">+</span>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto md:mx-0">
                                        {fitsStackItems[2].mobileDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
        </section>
    );
}

function UseCasesSection(): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState(0);
    const isMobile = useIsMobile();
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const currentItem = useCasesItems[currentSlide];

    const handleItemClick = (idx: number) => {
        setCurrentSlide(idx);

        // On mobile, scroll to show the content below the selected item
        if (isMobile && buttonRefs.current[idx]) {
            setTimeout(() => {
                buttonRefs.current[idx]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };

    return (
        <section id="use-cases-section" className="relative w-full min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-white border-b border-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                {/* Section Title */}
                <div className="mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
                        Use Cases
                    </h2>
                </div>

                {/* Main Container */}
                <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Side - Clickable List (40%) */}
                    <div className="lg:w-2/5 space-y-4">
                        {useCasesItems.map((item, idx) => (
                            <div key={idx}>
                                <button
                                    ref={(el) => { buttonRefs.current[idx] = el; }}
                                    onClick={() => handleItemClick(idx)}
                                    className={`w-full text-left p-4 sm:p-6 rounded-xl border transition-all duration-300 ${idx === currentSlide
                                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                        : 'bg-zinc-100/50 border-black/10 hover:border-purple-500/30 hover:bg-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-mono text-black">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                            </div>
                                            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors ${idx === currentSlide ? 'text-black' : 'text-gray-600 group-hover:text-gray-700'
                                                }`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-all ${idx === currentSlide ? 'text-purple-400 translate-x-0' : 'text-gray-400 -translate-x-1'
                                            }`} />
                                    </div>
                                </button>

                                {/* Mobile Content Card - appears below selected item */}
                                {idx === currentSlide && (
                                    <div className="lg:hidden mt-4">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentSlide}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="space-y-4"
                                            >
                                                {/* Image */}
                                                <div className="relative h-[250px] sm:h-[300px] rounded-2xl overflow-hidden border border-black/10">
                                                    <img
                                                        src={currentItem.image}
                                                        alt={currentItem.title}
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {/* Decorative elements */}
                                                    <div className="absolute inset-0 z-20 pointer-events-none">
                                                        <div className="absolute top-4 right-4 w-16 h-16 border border-purple-500/30 rounded-full" />
                                                        <div className="absolute bottom-4 left-4 w-24 h-24 border border-blue-500/20 rounded-full" />
                                                    </div>
                                                </div>

                                                {/* Description Card */}
                                                <div className="bg-zinc-100/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-black/10">
                                                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 leading-tight">
                                                        {currentItem.title}
                                                    </h3>
                                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                                        {currentItem.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Content Display (60%) - Desktop Only */}
                    <div className="hidden lg:block lg:w-3/5 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className="space-y-6"
                            >
                                {/* Image */}
                                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-black/10">
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
                                </div>

                                {/* Description Card */}
                                <div className="bg-zinc-100/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-black/10">
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
                                        {currentItem.title}
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                        {currentItem.description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
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
                anticipatePin: 1,
                scrub: 1.5,
                snap: {
                    snapTo: 1 / (totalPanels - 1),
                    duration: { min: 0.2, max: 0.5 },
                    ease: "power1.inOut"
                },
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
        <div id="how-it-works-section" ref={container} className="relative w-full h-screen overflow-hidden bg-black flex flex-col">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Header */}
            <div className="absolute top-20 sm:top-24 md:top-28 left-0 w-full z-20 text-center px-4 pointer-events-none">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-500/80 tracking-tight">How It Works</h2>
            </div>

            {/* SLIDER TRACK */}
            <div ref={slider} className="mt-12 sm:mt-14 md:mt-16 flex h-full w-[400%]">
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
