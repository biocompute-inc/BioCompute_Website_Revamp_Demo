"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import DNABackground from "@/components/DNABackground";
import { Sparkles, Zap, Users, Rocket, Lightbulb, Microscope, Home, CheckCircle, DollarSign, Bot } from "lucide-react";

interface TimelineItem {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    cardDetailedText: string;
    icon?: React.ReactNode;
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
                                    className={`w-full h-[400px] bg-gradient-to-br ${gradients[gradientIndex]} transition-all duration-500 cursor-pointer rounded-2xl p-8 flex flex-col justify-center relative border-2 border-fuchsia-200/40 shadow-[0_0_50px_rgba(217,70,239,0.2)] overflow-hidden`}>
                                    <span className="absolute top-4 right-4 text-fuchsia-200 text-xs font-bold tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-fuchsia-200/50 whitespace-nowrap">
                                        {item.title}
                                    </span>
                                    <div className="flex flex-col justify-center overflow-hidden pr-2">
                                        <div className="flex items-center gap-3 mb-4">
                                            {item.icon && (
                                                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-fuchsia-200/20 rounded-lg border border-fuchsia-200/40">
                                                    {item.icon}
                                                </div>
                                            )}
                                            <h3 className="text-white text-2xl md:text-3xl font-bold whitespace-normal break-words overflow-wrap-anywhere">{item.cardTitle}</h3>
                                        </div>
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
                    className="w-12 h-12 flex justify-center items-center border-2 border-fuchsia-200 rounded-full text-fuchsia-200 text-3xl cursor-pointer absolute bottom-8 left-4 transition-all duration-500 hover:text-white hover:bg-fuchsia-200/20 hover:border-white z-10 bg-black/60"
                >
                    <span>‹</span>
                </div>
            )}
            {nowIndex < dataArray.length - 1 && (
                <div
                    onClick={() => changeImagePosition(1)}
                    className="w-12 h-12 flex justify-center items-center border-2 border-fuchsia-200 rounded-full text-fuchsia-200 text-3xl cursor-pointer absolute bottom-8 right-4 transition-all duration-500 hover:text-white hover:bg-fuchsia-200/20 hover:border-white z-10 bg-black/60"
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
    // Timeline Data
    const timelineData = [
        {
            title: "Aug 2023",
            cardTitle: "The Spark",
            cardSubtitle: "Conceptualization",
            cardDetailedText: "Anagha, frustrated with Google cloud and her academic project, conceptualizes data storage in DNA without de novo synthesis",
            icon: <Lightbulb className="w-6 h-6 text-fuchsia-200" />
        },
        {
            title: "Jan 2024",
            cardTitle: "Foundation",
            cardSubtitle: "BioCompute Established",
            cardDetailedText: "BioCompute is set up. We are backed by Emergent Ventures, gradCapital",
            icon: <Rocket className="w-6 h-6 text-fuchsia-200" />
        },
        {
            title: "July 2024",
            cardTitle: "Incubation Begins",
            cardSubtitle: "CCAMP Incubation",
            cardDetailedText: "Incubated at CCAMP. Work on first proof of concept begins",
            icon: <Microscope className="w-6 h-6 text-fuchsia-200" />
        },
        {
            title: "Jan 2025",
            cardTitle: "Home Lab Setup",
            cardSubtitle: "Garage Beginnings",
            cardDetailedText: "Set up home lab",
            icon: <Home className="w-6 h-6 text-fuchsia-200" />
        },
        {
            title: "April 2025",
            cardTitle: "First Success",
            cardSubtitle: "Proof of Concept",
            cardDetailedText: "First proof of concept achieved, we are able to write data into DNA and retrieve it successfully",
            icon: <CheckCircle className="w-6 h-6 text-fuchsia-200" />
        },
        {
            title: "May 2025",
            cardTitle: "Pre-Seed Round",
            cardSubtitle: "Funding Secured",
            cardDetailedText: "Pre-seed round from 1517, gradCapital and angel investors",
            icon: <DollarSign className="w-6 h-6 text-fuchsia-200" />
        },
        {
            title: "July 2025",
            cardTitle: "Team Growth",
            cardSubtitle: "Expansion",
            cardDetailedText: "Set up our own lab in Koramangala, team grows to 6",
            icon: <Users className="w-6 h-6 text-fuchsia-200" />
        },
        {
            title: "Oct 2025",
            cardTitle: "Automation",
            cardSubtitle: "Scaling Up",
            cardDetailedText: "Automated bio lab to accelerate scale up",
            icon: <Bot className="w-6 h-6 text-fuchsia-200" />
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

            {/* Hero Section */}
            <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center py-16 sm:py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent" />
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
                        {/* <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            <span className="text-xs sm:text-sm font-medium text-purple-300">About BioCompute</span>
                        </div> */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight px-4">
                            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">Welcome to the</span>
                            <br />
                            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text ">Strand Age</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed px-4">
                            Pioneering the future of data storage through the power of DNA
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision and Mission Section */}
            <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                        {/* Our Vision */}
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                                    Our Vision
                                </h2>
                            </div>
                            <div className="space-y-3 sm:space-y-4 text-gray-200">
                                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                                    Our vision is to build data infrastructure that scales at the speed of data.
                                </p>
                                <p className="text-base sm:text-lg md:text-xl font-semibold leading-relaxed bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text">
                                    By programming biology to break through the physical limits of traditional computing.
                                </p>
                                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                                    We leverage the intrinsic space and energy efficiency of biomolecules like DNA to help data center providers lower their operational expenses, and thus scale their storage and compute infrastructure.
                                </p>
                            </div>
                        </div>

                        {/* Full Stack System */}
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 sm:p-3 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20">
                                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400" />
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                                    Atoms, Bytes & Genes
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
                                We are building a full-stack data storage system at the intersection of atoms, bytes and genes.
                            </p>
                            <div className="w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border-2 border-dashed border-fuchsia-500/30 flex items-center justify-center">
                                <span className="text-fuchsia-200/60 font-medium flex flex-col items-center gap-2 sm:gap-3 px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                    <span className="text-xs sm:text-sm text-center">Lab Footage</span>
                                </span>
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
            <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm mb-4 sm:mb-6">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            <span className="text-xs sm:text-sm font-medium text-purple-300">Meet the Team</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
                            The Minds Behind the Mission
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                            Working together to make a difference
                        </p>
                    </div>
                    <div className="grid gap-6 sm:gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {team.map((item, idx) => (
                            <div key={idx} className="group h-full flex flex-col items-center">
                                <div className="aspect-[3/4] w-full max-w-[200px] sm:max-w-none mb-3 sm:mb-4 overflow-hidden rounded-xl flex-shrink-0">
                                    <Image
                                        src={item.avatar}
                                        width={300}
                                        height={400}
                                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                                        alt={item.name}
                                    />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-1">{item.name}</h4>
                                    <p className="text-xs sm:text-sm text-purple-300">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent shadow-[0_5px_25px_rgba(217,70,239,0.3),0_-5px_25px_rgba(217,70,239,0.3)]"></div>
            </div>

            {/* Media Section */}
            <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
                            In the News
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 px-4">
                            Featured videos and articles about our work
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Media Card 1 */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative backdrop-blur-xl bg-gradient-to-br from-purple-950/60 via-fuchsia-950/40 to-black/60 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col transform group-hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm sm:text-base truncate">Media Outlet</p>
                                        <p className="text-xs text-purple-300">Jan 2025</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-white text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                                    Featured Article Title
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                                    Brief description of the media coverage or article content goes here.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors mt-auto"
                                >
                                    Read Article
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Media Card 2 */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative backdrop-blur-xl bg-gradient-to-br from-purple-950/60 via-fuchsia-950/40 to-black/60 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col transform group-hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm sm:text-base truncate">Tech News</p>
                                        <p className="text-xs text-purple-300">Dec 2024</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-white text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                                    Another Press Feature
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                                    Brief description of the media coverage or article content goes here.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors mt-auto"
                                >
                                    Read Article
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Media Card 3 */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative backdrop-blur-xl bg-gradient-to-br from-fuchsia-950/60 via-purple-950/40 to-black/60 border border-fuchsia-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col transform group-hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm sm:text-base truncate">Industry Blog</p>
                                        <p className="text-xs text-fuchsia-300">Nov 2024</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-white text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-fuchsia-300 transition-colors line-clamp-2">
                                    Industry Recognition
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                                    Brief description of the media coverage or article content goes here.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition-colors mt-auto"
                                >
                                    Read Article
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Us Section */}
            <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/80 to-fuchsia-50/80">
                <div className="max-w-screen-xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/80 border-2 border-purple-300/40 rounded-full backdrop-blur-sm mb-4 sm:mb-6">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                        <span className="text-xs sm:text-sm font-medium text-purple-700">We're Hiring</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-4 sm:mb-6 px-4">
                        <span className="bg-gradient-to-r from-black via-purple-900 to-black bg-clip-text text-transparent">Join Us</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                        We are building the storage of tomorrow, today. If you are excited about the intersection of biology and computing, we want to hear from you.
                    </p>
                    <Link
                        href="/careers"
                        className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold text-black bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full hover:from-purple-700 hover:to-fuchsia-700 transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]"
                    >
                        View Open Positions
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
}
