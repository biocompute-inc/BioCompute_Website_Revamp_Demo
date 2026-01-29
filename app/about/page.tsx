"use client";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ShinyText from "@/client/components/ui/shinytext";
import DNABackground from "@/components/DNABackground";
import dynamic from "next/dynamic"; // Import dynamic for SSR handling

// Dynamically import Chrono to avoid Hydration Error
const Timeline = dynamic(() => import('primereact/timeline').then((mod) => mod.Timeline), {
    ssr: false,
    loading: () => <div className="text-purple-400 text-center py-20">Loading Timeline...</div>
});

export default function About() {
    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 8, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 0.6, 0.2, 0]);

    // Timeline Data
    const timelineData = [
        {
            title: "Aug 2023",
            cardTitle: "The Spark 💡",
            cardSubtitle: "Conceptualization",
            cardDetailedText: "Anagha, frustrated with Google cloud and her academic project, conceptualizes data storage in DNA without de novo synthesis.",
        },
        {
            title: "Jan 2024",
            cardTitle: "Foundation 🚀",
            cardSubtitle: "BioCompute Established",
            cardDetailedText: "BioCompute is set up. We are backed by Emergent Ventures and gradCapital, setting the stage for deep-tech innovation.",
        },
        {
            title: "July 2024",
            cardTitle: "Incubation Begins 🔬",
            cardSubtitle: "CCAMP Incubation",
            cardDetailedText: "Officially incubated at CCAMP. Work on the first proof of concept begins in earnest.",
        },
        {
            title: "Jan 2025",
            cardTitle: "Home Lab Setup 🏠",
            cardSubtitle: "Garage Beginnings",
            cardDetailedText: "Set up a dedicated home lab to accelerate rapid prototyping and hardware testing.",
        },
        {
            title: "April 2025",
            cardTitle: "First Success ✅",
            cardSubtitle: "Proof of Concept",
            cardDetailedText: "First major milestone achieved: We successfully wrote data into DNA and retrieved it with high accuracy.",
        },
        {
            title: "May 2025",
            cardTitle: "Pre-Seed Round 💰",
            cardSubtitle: "Funding Secured",
            cardDetailedText: "Closed pre-seed round from 1517, gradCapital, and key angel investors to fuel growth.",
        },
        {
            title: "July 2025",
            cardTitle: "Team Growth 👥",
            cardSubtitle: "Expansion",
            cardDetailedText: "Established our own dedicated lab in Koramangala. The core team grows to 6 diverse engineers.",
        },
        {
            title: "Oct 2025",
            cardTitle: "Automation 🤖",
            cardSubtitle: "Scaling Up",
            cardDetailedText: "Implemented automated bio-lab workflows to drastically accelerate experiment throughput and scale.",
        }
    ];

    // Template for the Marker (The dot on the line)
    const customizedMarker = (item: any) => {
        return (
            <div className="flex w-4 h-4 bg-purple-500 rounded-full ring-4 ring-purple-900/50 shadow-[0_0_15px_#a855f7] z-10"></div>
        );
    };

    // Template for the Content (The card)
    const customizedContent = (item: any) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col mb-8 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-colors duration-300"
            >
                <span className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-2 bg-purple-900/20 px-3 py-1 rounded-full w-fit border border-purple-500/30">
                    {item.title}
                </span>
                <h3 className="text-white text-xl font-bold mb-1">{item.cardTitle}</h3>
                <h4 className="text-purple-300 text-sm font-semibold mb-3">{item.cardSubtitle}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{item.cardDetailedText}</p>
            </motion.div>
        );
    };

    const team = [
        {
            avatar: "/Anaghaupdated.jpeg",
            name: "Anagha Rajesh",
            title: "Founder"
        },
        {
            avatar: "/Akansha.jpg",
            name: "Akanksha Dasmohapatra",
            title: "Chief Product Officer"
        },
        {
            avatar: "/Naveen.png",
            name: "Naveen",
            title: "Electronics Engineer"
        },
        {
            avatar: "/SaiPooja.jpg",
            name: "Sai Pooja",
            title: "Bio-Engineer"
        },
        {
            avatar: "/franci.jpeg",
            name: "Franci",
            title: "Bio-Engineer"
        }
    ]

    return (
        <div className="relative min-h-screen">
            <DNABackground />

            {/* Hero Section with GTA VI Style Scroll Animation */}
            <section
                ref={heroRef}
                className="relative h-[150vh]"
            >
                <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-opacity-10 overflow-hidden">
                    <motion.div
                        style={{
                            scale,
                            opacity
                        }}
                        className=" px-4 origin-center text-center"
                    >
                        <div className="flex flex-col items-center gap-1">
                            <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
                                <ShinyText
                                    text="WELCOME"
                                    speed={3}
                                    color="#ffffff"
                                    shineColor="#9b6fb5"
                                    spread={80}
                                    direction="right"
                                    yoyo={true}
                                    className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-[0.3em] pb-4"
                                />
                            </div>
                            <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
                                <ShinyText
                                    text="TO THE"
                                    speed={3}
                                    color="#ffffff"
                                    shineColor="#9b6fb5"
                                    spread={80}
                                    direction="right"
                                    yoyo={true}
                                    className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extralight tracking-[0.4em] opacity-80"
                                />
                            </div>
                            <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
                                <ShinyText
                                    text="STRAND AGE"
                                    speed={3}
                                    color="#ffffff"
                                    shineColor="#9b6fb5"
                                    spread={80}
                                    direction="right"
                                    yoyo={true}
                                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight pb-8"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Vision and Offer Section */}
            <section className="relative -mt-32 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/80 rounded-3xl p-6 sm:p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {/* Our Vision */}
                        <div className="space-y-3 sm:space-y-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                Our Vision
                            </h2>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                                We envision a future where biotechnology seamlessly integrates with computational innovation,
                                enabling groundbreaking solutions to the world&apos;s most pressing challenges. Our mission is to
                                pioneer technologies that bridge the gap between biological systems and computational power,
                                creating tools that empower researchers, healthcare professionals, and innovators worldwide.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                At the core of our vision lies a commitment to democratizing access to cutting-edge biocomputing
                                technologies, making them accessible, affordable, and impactful for communities across the globe.
                            </p>
                        </div>

                        {/* What We Offer */}
                        <div className="space-y-3 sm:space-y-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                What We Offer
                            </h2>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                                Our portfolio spans innovative biocomputing solutions designed to accelerate research and development.
                                We provide state-of-the-art platforms that combine biological data processing with advanced
                                computational algorithms, enabling real-time analysis and insights.
                            </p>
                            <ul className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed space-y-2 sm:space-y-3">
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Advanced DNA computing platforms for complex problem-solving</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Integrated biotech and computational research tools</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Collaborative platforms for interdisciplinary innovation</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Educational resources and training programs</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section (Replaces Orbit Carousel) */}
            <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto backdrop-blur-xl bg-black/90 border border-purple-900/30 rounded-3xl p-6 sm:p-8 md:p-12">
                    <div className="max-w-xl mx-auto text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                            Our Journey So Far
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300">
                            From concept to reality
                        </p>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-6xl">
                            {/* Tailwind styling to override PrimeReact defaults for transparency */}
                            <div className="
                                [&_.p-timeline-event-connector]:bg-purple-500/30 
                                [&_.p-timeline-event-connector]:w-[2px]
                                [&_.p-timeline-event]:min-h-[120px]
                            ">
                                <Timeline
                                    value={timelineData}
                                    align="alternate"
                                    marker={customizedMarker}
                                    content={customizedContent}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto backdrop-blur-xl bg-gray-50/80 rounded-3xl p-6 sm:p-8 md:p-12">
                    <div className="max-w-xl mx-auto text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            OUR TEAM
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">
                            Working together to make a difference
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl">
                            {
                                team.map((item, idx) => (
                                    <li key={idx} className="flex flex-col items-center">
                                        <div className="w-full h-60 sm:h-56">
                                            <Image
                                                src={item.avatar}
                                                width={215}
                                                height={240}
                                                className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h4 className="text-lg text-gray-800 font-semibold">{item.name}</h4>
                                            <p className="text-gray-600">{item.title}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}