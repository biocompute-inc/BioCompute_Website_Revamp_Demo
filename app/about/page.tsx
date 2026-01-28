"use client";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ShinyText from "@/client/components/ui/shinytext";
import DNABackground from "@/components/DNABackground";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export default function About() {
    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 8, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 0.6, 0.2, 0]);

    // Timeline data
    const timeline = [
        {
            id: 1,
            date: "Aug 2023",
            title: "The Spark",
            description: "Anagha, frustrated with Google cloud and her academic project, conceptualizes data storage in DNA without de novo synthesis",
            icon: "💡"
        },
        {
            id: 2,
            date: "January 2024",
            title: "Foundation",
            description: "BioCompute is set up. We are backed by Emergent Ventures, gradCapital",
            icon: "🚀"
        },
        {
            id: 3,
            date: "July 2024",
            title: "Incubation Begins",
            description: "Incubated at CCAMP. Work on first proof of concept begins",
            icon: "🔬"
        },
        {
            id: 4,
            date: "Jan 2025",
            title: "Home Lab Setup",
            description: "Set up home lab",
            icon: "🏠"
        },
        {
            id: 5,
            date: "April 2025",
            title: "First Success",
            description: "First proof of concept achieved, we are able to write data into DNA and retrieve it successfully",
            icon: "✅"
        },
        {
            id: 6,
            date: "May 2025",
            title: "Pre-Seed Round",
            description: "Pre-seed round from 1517, gradCapital and angel investors",
            icon: "💰"
        },
        {
            id: 7,
            date: "July 2025",
            title: "Team Growth",
            description: "Set up our own lab in Koramangala, team grows to 6",
            icon: "👥"
        },
        {
            id: 8,
            date: "October 2025",
            title: "Automation",
            description: "Automated bio lab to accelerate scale up",
            icon: "🤖"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const containerRadius = isMobile ? 200 : 300;
    const iconSize = isMobile ? 70 : 90;
    const containerSize = containerRadius * 2 + 200;

    const getRotation = useCallback(
        (index: number) => (index - activeIndex) * (360 / timeline.length),
        [activeIndex, timeline.length]
    );

    const next = () => setActiveIndex((i) => (i + 1) % timeline.length);
    const prev = () => setActiveIndex((i) => (i - 1 + timeline.length) % timeline.length);

    const handleIconClick = useCallback((index: number) => {
        if (index !== activeIndex) setActiveIndex(index);
    }, [activeIndex]);

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

            {/* Timeline Orbit Carousel Section */}
            <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto backdrop-blur-xl bg-black/90 border border-purple-900/30 rounded-3xl p-6 sm:p-8 md:p-12">
                    <div className="max-w-xl mx-auto text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                            Our Journey So Far
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300">
                            From concept to reality
                        </p>
                    </div>

                    <div className="flex flex-col items-center relative min-h-[700px] md:min-h-[800px]">
                        <div
                            className="relative flex items-center justify-center"
                            style={{ width: containerSize, height: containerSize }}
                        >
                            {/* Orbit circle */}
                            <div
                                className="absolute rounded-full border-2 border-purple-500/40"
                                style={{
                                    width: containerRadius * 2,
                                    height: containerRadius * 2,
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />

                            {/* Active Timeline Card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={timeline[activeIndex].id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="z-10 bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm shadow-2xl shadow-purple-900/50 rounded-xl p-5 md:p-7 w-72 md:w-96 text-center border-2 border-purple-600/50"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="text-5xl mb-4"
                                    >
                                        {timeline[activeIndex].icon}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.15 }}
                                    >
                                        <div className="flex items-center justify-center text-base md:text-lg text-purple-400 font-bold mb-3 bg-purple-900/30 rounded-full px-4 py-2">
                                            <Calendar size={18} className="mr-2" />
                                            <span>{timeline[activeIndex].date}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                            {timeline[activeIndex].title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                                            {timeline[activeIndex].description}
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="flex justify-center items-center mt-4 space-x-3"
                                    >
                                        <button
                                            onClick={prev}
                                            className="p-2 rounded-full bg-purple-900/50 hover:bg-purple-800/70 transition-colors border border-purple-600/50"
                                        >
                                            <ChevronLeft size={20} className="text-purple-300" />
                                        </button>
                                        <span className="text-sm text-purple-300 font-semibold">
                                            {activeIndex + 1} / {timeline.length}
                                        </span>
                                        <button
                                            onClick={next}
                                            className="p-2 rounded-full bg-purple-900/50 hover:bg-purple-800/70 transition-colors border border-purple-600/50"
                                        >
                                            <ChevronRight size={20} className="text-purple-300" />
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Orbiting Icons */}
                            {timeline.map((item, i) => {
                                const rotation = getRotation(i);
                                return (
                                    <motion.div
                                        key={item.id}
                                        animate={{
                                            transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.34, 1.56, 0.64, 1],
                                        }}
                                        style={{
                                            width: iconSize,
                                            height: iconSize,
                                            position: "absolute",
                                            top: `calc(50% - ${iconSize / 2}px)`,
                                            left: `calc(50% - ${iconSize / 2}px)`,
                                        }}
                                    >
                                        <motion.div
                                            animate={{ rotate: -rotation }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.34, 1.56, 0.64, 1],
                                            }}
                                            className="w-full h-full"
                                        >
                                            <motion.div
                                                onClick={() => handleIconClick(i)}
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`w-full h-full rounded-full cursor-pointer flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 ${i === activeIndex
                                                    ? "bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/50 border-4 border-purple-400"
                                                    : "bg-gray-900 border-2 border-purple-700/40 hover:border-purple-500 hover:bg-purple-900/50"
                                                    }`}
                                            >
                                                {item.icon}
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
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