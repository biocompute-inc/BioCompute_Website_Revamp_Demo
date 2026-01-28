"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShinyText from "@/client/components/ui/shinytext";
import DNABackground from "@/components/DNABackground";

export default function About() {
    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 8, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 0.6, 0.2, 0]);
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