"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShinyText from "@/client/components/ui/shinytext";
import DNABackground from "@/components/DNABackground";
import ScrollStack, { ScrollStackItem } from "@/client/components/ui/ScrollStack";

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
            cardDetailedText: "Anagha, frustrated with Google cloud and her academic project, conceptualizes data storage in DNA without de novo synthesis",
        },
        {
            title: "Jan 2024",
            cardTitle: "Foundation 🚀",
            cardSubtitle: "BioCompute Established",
            cardDetailedText: "BioCompute is set up. We are backed by Emergent Ventures, gradCapital",
        },
        {
            title: "July 2024",
            cardTitle: "Incubation Begins 🔬",
            cardSubtitle: "CCAMP Incubation",
            cardDetailedText: "Incubated at CCAMP. Work on first proof of concept begins",
        },
        {
            title: "Jan 2025",
            cardTitle: "Home Lab Setup 🏠",
            cardSubtitle: "Garage Beginnings",
            cardDetailedText: "Set up home lab",
        },
        {
            title: "April 2025",
            cardTitle: "First Success ✅",
            cardSubtitle: "Proof of Concept",
            cardDetailedText: "First proof of concept achieved, we are able to write data into DNA and retrieve it successfully",
        },
        {
            title: "May 2025",
            cardTitle: "Pre-Seed Round 💰",
            cardSubtitle: "Funding Secured",
            cardDetailedText: "Pre-seed round from 1517, gradCapital and angel investors",
        },
        {
            title: "July 2025",
            cardTitle: "Team Growth 👥",
            cardSubtitle: "Expansion",
            cardDetailedText: "Set up our own lab in Koramangala, team grows to 6",
        },
        {
            title: "Oct 2025",
            cardTitle: "Automation 🤖",
            cardSubtitle: "Scaling Up",
            cardDetailedText: "Automated bio lab to accelerate scale up",
        }
    ];

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
                        <div className="flex flex-col z-40 items-center gap-1">
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
                <div className="max-w-screen-xl mx-auto backdrop-blur-xl bg-white/80 rounded-3xl p-6 sm:p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-gray-900">
                        {/* Our Vision */}
                        <div className="space-y-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                                Our Vision
                            </h2>
                            <p className="text-base leading-relaxed">
                                Our vision is to build data infrastructure that scales at the speed of data.
                            </p>
                            <p className="text-lg font-semibold leading-relaxed text-purple-700">
                                By programming biology to break through the physical limits of traditional computing.
                            </p>
                            <p className="text-base leading-relaxed">
                                We leverage the intrinsic space and energy efficiency of biomolecules like DNA to help data center providers lower their operational expenses, and thus scale their storage and compute infrastructure.
                            </p>
                        </div>

                        {/* Full Stack System */}
                        <div className="space-y-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                                Atoms, Bytes & Genes
                            </h2>
                            <p className="text-base leading-relaxed">
                                We are building a full-stack data storage system at the intersection of atoms, bytes and genes.
                            </p>

                            {/* Lab Image/Video Placeholder */}
                            <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center relative group">
                                <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                                    <span className="text-gray-500 font-medium flex flex-col items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        Lab Footage Goes Here
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="relative rounded-2xl pt-10 mx-32 mb-0 pb-0 overflow-hidden bg-black/30 backdrop-blur-lg">
                <div className="max-w-full mx-auto">
                    <div className="max-w-xl mx-auto text-center -mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold  text-white mb-3 sm:mb-4">
                            Our Journey So Far
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300">
                            From concept to reality
                        </p>
                    </div>

                    <div className="w-full flex justify-center">
                        <ScrollStack
                            itemDistance={100}
                            itemScale={0.03}
                            baseScale={0.8}
                            itemStackDistance={45}
                            stackPosition="20%"
                            scaleEndPosition="10%"
                            useWindowScroll={false}
                            className="h-screen max-w-4xl mx-auto"
                        >
                            {timelineData.map((item, index) => (
                                <ScrollStackItem key={index} itemClassName="bg-[#0f0518] shadow-[0_0_50px_rgba(139,92,246,0.1)] border-2 rounded-2xl border-purple-500/30 flex flex-col justify-center relative">
                                    <span className="absolute top-4 right-4 text-purple-400 text-xs font-bold tracking-widest uppercase bg-purple-900/40 px-3 py-1 rounded-full w-fit border border-purple-500/30">
                                        {item.title}
                                    </span>
                                    <div className="flex flex-col h-full justify-center">
                                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{item.cardTitle}</h3>
                                        <h4 className="text-purple-300 text-sm md:text-base font-semibold mb-3">{item.cardSubtitle}</h4>
                                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">{item.cardDetailedText}</p>
                                    </div>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
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
                            {team.map((item, idx) => (
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
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Join Us Section */}
            <section className="relative py-24 px-4 text-center z-10">
                <div className="max-w-4xl mx-auto backdrop-blur-md bg-purple-950/30 border border-purple-500/20 rounded-3xl p-10 md:p-16 shadow-[0_0_40px_rgba(88,28,135,0.2)]">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join Us</h2>
                    <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        We are building the storage of tomorrow, today. If you are excited about the intersection of biology and computing, we want to hear from you.
                    </p>
                    <Link
                        href="/careers"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-purple-600 rounded-full hover:bg-purple-500 hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-black"
                    >
                        View Open Positions
                    </Link>
                </div>
            </section>
        </div>
    );
}
