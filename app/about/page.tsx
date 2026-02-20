"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShinyText from "@/client/components/ui/shinytext";
// import DNABackground from "@/components/DNABackground";

interface TimelineItem {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    cardDetailedText: string;
    time?: number;
}

interface TimelineCarouselProps {
    isInfinity: boolean;
    dataArray: TimelineItem[];
    autoplay: boolean;
    delay: number;
    carouselPostWidth: number;
    carouselPostMargin: number;
    visibleAmount: number;
}

const TimelineCarousel: React.FC<TimelineCarouselProps> = ({
    isInfinity,
    dataArray: initialDataArray,
    autoplay,
    delay,
    carouselPostWidth,
    carouselPostMargin,
    visibleAmount
}) => {
    const [nowIndex, setNowIndex] = useState(isInfinity ? visibleAmount : 0);
    const [isAnimate, setIsAnimate] = useState(true);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [diffX, setDiffX] = useState(0);
    const [movingStatus, setMovingStatus] = useState(1);
    const [dataArray, setDataArray] = useState<TimelineItem[]>(initialDataArray);
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (isInfinity) {
            let behindData = initialDataArray.slice(0, visibleAmount);
            let beforeData = initialDataArray.slice(-visibleAmount);
            let newDataArray = [...beforeData, ...initialDataArray, ...behindData];
            newDataArray = newDataArray.map((item, index) => ({
                ...item,
                time: new Date().getTime() + index
            }));
            setDataArray(newDataArray);
        }
    }, []);

    useEffect(() => {
        if (autoplay) {
            timerRef.current = setInterval(() => {
                changeImagePosition(1);
            }, delay * 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [autoplay, delay, nowIndex]);

    const computedLeft = () => {
        let leftSpan = parseInt(`${-nowIndex * parseInt(carouselPostWidth.toString())}`);
        let marginSpan = carouselPostMargin * nowIndex;
        if (isInfinity) marginSpan = carouselPostMargin * (nowIndex - 1) + carouselPostMargin;

        return {
            carouselTranslateX: `${leftSpan - marginSpan}`,
            carouselTranslateZ: -400,
            carouselOpacity: 0
        };
    };

    const changeImagePosition = (index: number) => {
        let thisIndex = (nowIndex + index) % dataArray.length;
        if (!isInfinity && thisIndex < 0) thisIndex = dataArray.length - 1;
        if (isInfinity) thisIndex = nowIndex + index;

        setNowIndex(thisIndex);
        setIsAnimate(true);
    };

    const handleTransitionEnd = () => {
        if (nowIndex >= dataArray.length - visibleAmount) {
            setNowIndex(visibleAmount);
            setIsAnimate(false);
        } else if (nowIndex <= 0) {
            setNowIndex(dataArray.length - (visibleAmount * 2));
            setIsAnimate(false);
        }
    };

    const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
        const touch = 'touches' in event ? event.touches[0] : null;
        const mobileMoveStartX = touch ? touch.clientX : 0;
        const clientX = 'clientX' in event ? event.clientX : mobileMoveStartX;

        setIsMouseDown(true);
        setStartX(clientX);
    };

    const handleMouseUp = (event: React.MouseEvent | React.TouchEvent) => {
        const maxDiffX = carouselPostWidth / 2;
        const changedTouch = 'changedTouches' in event ? event.changedTouches[0] : null;
        const mobileMoveX = changedTouch ? changedTouch.pageX : startX;
        const moveX = ('clientX' in event ? event.clientX : mobileMoveX) || 0;
        const diffXValue = startX - moveX;

        let thisIndex;
        if (diffXValue > maxDiffX) {
            thisIndex = nowIndex + 1;
        } else if (diffXValue < -maxDiffX) {
            thisIndex = nowIndex - 1;
        }

        if (!isInfinity && thisIndex !== undefined) {
            thisIndex = thisIndex < 0 ? 0 : thisIndex > dataArray.length - 1 ? dataArray.length - 1 : thisIndex;
        }

        setIsMouseDown(false);
        setIsAnimate(true);
        setNowIndex(thisIndex !== undefined ? thisIndex : nowIndex);
        setStartX(0);
        setDiffX(0);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
        setIsAnimate(true);
        setStartX(0);
        setDiffX(0);
    };

    const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isMouseDown) return;

        const touch = 'touches' in event ? event.touches[0] : null;
        const mobileMoveX = touch ? touch.clientX : startX;
        const moveX = ('clientX' in event ? event.clientX : mobileMoveX) || 0;
        const diffXValue = startX - moveX;
        const spanDistance = carouselPostWidth + carouselPostMargin;

        if (diffXValue > spanDistance || diffXValue < -spanDistance) {
            return;
        } else {
            setDiffX(diffXValue);
            setMovingStatus(-diffXValue < 0 ? -1 : 1);
        }
    };

    const computedMovingStyle = (index: number) => {
        let styles = {
            translateX: 0,
            translateZ: 0,
            opacityStyle: 1
        };

        if (!isMouseDown && nowIndex <= index) return styles;
        if (!isMouseDown && nowIndex > index) {
            return {
                translateX: 0,
                translateZ: -carouselPostWidth,
                opacityStyle: 0
            };
        }

        if (movingStatus === 1) {
            if (nowIndex - 1 === index) {
                let z = -carouselPostWidth + parseInt((-diffX).toString());
                styles.translateZ = z > 0 ? 0 : z;
                styles.opacityStyle = -diffX / carouselPostWidth;
            } else if (nowIndex > index) {
                styles.translateZ = -carouselPostWidth;
                styles.opacityStyle = 0;
            }
        } else if (movingStatus === -1) {
            if (nowIndex === index) {
                styles.translateZ = -diffX;
                styles.opacityStyle = 1 - Math.abs(diffX / carouselPostWidth);
            } else if (nowIndex > index) {
                styles.translateZ = -carouselPostWidth;
                styles.opacityStyle = 0;
            }
        }

        styles.translateX = -diffX;
        return styles;
    };

    const { carouselTranslateX } = computedLeft();

    // Gradient colors for each card - only fuchsia, purple, black, white
    const gradients = [
        'from-purple-900 via-fuchsia-900 to-black',
        'from-fuchsia-900 via-purple-900 to-black',
        'from-black via-purple-900 to-fuchsia-900',
        'from-purple-900 via-black to-fuchsia-900',
        'from-fuchsia-900 via-black to-purple-900',
        'from-black via-fuchsia-900 to-purple-900',
        'from-purple-900 via-fuchsia-800 to-black',
        'from-fuchsia-900 via-purple-800 to-black'
    ];

    return (
        <div className="w-full flex justify-center relative">
            <div className="w-full whitespace-nowrap relative box-border rounded-[10px] ml-60 max-md:ml-0">
                <div
                    className={`relative ${isAnimate ? 'transition-all duration-300' : ''}`}
                    style={{ perspective: '600px' }}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchEnd={handleMouseUp}
                    onTransitionEnd={isInfinity ? handleTransitionEnd : undefined}
                    onMouseLeave={handleMouseLeave}
                >
                    {dataArray.map((item, index) => {
                        const { translateX, translateZ, opacityStyle } = computedMovingStyle(index);
                        const gradientIndex = index % gradients.length;
                        return (
                            <div
                                key={index}
                                style={{
                                    width: carouselPostWidth,
                                    marginRight: carouselPostMargin,
                                    transform: `translateX(${parseInt(carouselTranslateX) + parseInt(translateX.toString())}px) translateZ(${parseInt(translateZ.toString())}px)`,
                                    opacity: opacityStyle
                                }}
                                className={`inline-block relative select-none ${isAnimate ? 'transition-all duration-500' : ''}`}
                            >
                                <div
                                    className={`w-full h-[400px] bg-gradient-to-br ${gradients[gradientIndex]} transition-all duration-500 cursor-pointer rounded-2xl p-8 flex flex-col justify-center relative border-2 border-fuchsia-200/40 shadow-[0_0_50px_rgba(217,70,239,0.2)] overflow-hidden`}
                                >
                                    <span className="absolute top-4 right-4 text-fuchsia-200 text-xs font-bold tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-fuchsia-200/50 whitespace-nowrap">
                                        {item.title}
                                    </span>
                                    <div className="flex flex-col justify-center overflow-hidden pr-2">
                                        <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 whitespace-normal break-words overflow-wrap-anywhere">{item.cardTitle}</h3>
                                        <h4 className="text-fuchsia-200 text-base md:text-lg font-semibold mb-4 whitespace-normal break-words overflow-wrap-anywhere">{item.cardSubtitle}</h4>
                                        <p className="text-white text-base md:text-lg leading-relaxed whitespace-normal break-words overflow-wrap-anywhere">{item.cardDetailedText}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="inline-flex" style={{ perspective: '600px' }}>
                    {dataArray.map((item, index) => {
                        const { translateX, translateZ, opacityStyle } = computedMovingStyle(index);
                        return (
                            <div
                                key={index}
                                style={{
                                    width: carouselPostWidth,
                                    paddingRight: carouselPostMargin,
                                    transform: `translateX(${parseInt(carouselTranslateX) + parseInt(translateX.toString())}px) translateZ(${(parseInt(translateZ.toString()) * 2) / 3}px)`,
                                    opacity: opacityStyle
                                }}
                                className={`border-b-2 border-fuchsia-200 pb-10 mb-2.5 relative ${isAnimate ? 'transition-all duration-500 delay-100' : ''}`}
                            >
                                <div className="absolute h-3 w-3 -bottom-[7px] left-[calc(50%-40px)] bg-fuchsia-200 rotate-45 shadow-[0_0_10px_rgba(217,70,239,0.6)]" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {nowIndex > 0 && (
                <div
                    onClick={() => changeImagePosition(-1)}
                    className="w-12 h-12 flex justify-center items-center border-2 border-fuchsia-200 rounded-full text-fuchsia-200 text-3xl cursor-pointer absolute top-1/2 -translate-y-1/2 left-4 transition-all duration-500 hover:text-white hover:bg-fuchsia-200/20 hover:border-white z-10 bg-black/60"
                >
                    <span>‹</span>
                </div>
            )}
            {nowIndex < dataArray.length - 1 && (
                <div
                    onClick={() => changeImagePosition(1)}
                    className="w-12 h-12 flex justify-center items-center border-2 border-fuchsia-200 rounded-full text-fuchsia-200 text-3xl cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 transition-all duration-500 hover:text-white hover:bg-fuchsia-200/20 hover:border-white z-10 bg-black/60"
                >
                    <span>›</span>
                </div>
            )}
        </div>
    );
};

const TimelineCarouselContainer: React.FC<{ timelineData: TimelineItem[] }> = ({ timelineData }) => {
    const [screenX, setScreenX] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    useEffect(() => {
        const handleResize = () => {
            setScreenX(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <TimelineCarousel
            isInfinity={false}
            dataArray={timelineData}
            autoplay={false}
            delay={10}
            carouselPostWidth={screenX > 900 ? 500 : screenX * 0.85}
            carouselPostMargin={40}
            visibleAmount={4}
        />
    );
};

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
            {/* <DNABackground /> */}

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
            <section className="relative rounded-2xl pt-10 px-4 mb-0 pb-32 bg-black/30 backdrop-blur-lg">
                <div className="max-w-full mx-auto">
                    <div className="max-w-xl mx-auto text-center mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                            Our Journey So Far
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300">
                            From concept to reality
                        </p>
                    </div>

                    <div className="w-full flex justify-center min-h-[600px] items-center pb-20">
                        <TimelineCarouselContainer timelineData={timelineData} />
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

            {/* Media Section */}
            <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto backdrop-blur-xl bg-white/80 rounded-3xl p-6 sm:p-8 md:p-12">
                    <div className="max-w-xl mx-auto text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            MEDIA
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">
                            Featured videos and articles about our work
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Media Card 1 */}
                        <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Media Outlet</p>
                                    <p className="text-xs text-gray-500">Jan 2025</p>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                Featured Article Title
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Brief description of the media coverage or article content goes here.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                            >
                                Read Article
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                        {/* Media Card 2 */}
                        <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Tech News</p>
                                    <p className="text-xs text-gray-500">Dec 2024</p>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                Another Press Feature
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Brief description of the media coverage or article content goes here.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                            >
                                Read Article
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                        {/* Media Card 3 */}
                        <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Industry Blog</p>
                                    <p className="text-xs text-gray-500">Nov 2024</p>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                Industry Recognition
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Brief description of the media coverage or article content goes here.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                            >
                                Read Article
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
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
