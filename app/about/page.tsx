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
    image?: string;
    imageContain?: boolean;
    logos?: string[];
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
                                    className={`w-full h-[500px]  bg-gradient-to-br ${gradients[gradientIndex]} transition-all duration-500 cursor-pointer rounded-2xl p-8 pt-12 flex flex-col justify-start relative border-2 border-fuchsia-200/40 shadow-[0_0_50px_rgba(217,70,239,0.2)] overflow-hidden`}>
                                    <span className="absolute top-4 right-4 text-fuchsia-200 text-xs font-bold tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-fuchsia-200/50 whitespace-nowrap">
                                        {item.title}
                                    </span>
                                    <div className="flex flex-col flex-1 min-h-0 pr-2">
                                        <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                                            {item.icon && (
                                                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-fuchsia-200/20 rounded-lg border border-fuchsia-200/40">
                                                    {item.icon}
                                                </div>
                                            )}
                                            <h3 className="text-white text-2xl md:text-3xl font-bold whitespace-normal break-words overflow-wrap-anywhere">{item.cardTitle}</h3>
                                        </div>
                                        <h4 className="text-fuchsia-200 text-base md:text-lg font-semibold mb-4 whitespace-normal break-words overflow-wrap-anywhere flex-shrink-0">{item.cardSubtitle}</h4>
                                        <p className="text-white text-base md:text-lg leading-relaxed whitespace-normal break-words overflow-wrap-anywhere flex-shrink-0">{item.cardDetailedText}</p>
                                        {item.image && (
                                            <div className="mt-5 w-full relative rounded-xl overflow-hidden flex-1 min-h-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.cardTitle}
                                                    fill
                                                    sizes="(max-width: 768px) 85vw, 500px"
                                                    className={item.imageContain ? 'object-contain p-4' : 'object-cover'}
                                                />
                                            </div>
                                        )}
                                        {item.logos && (
                                            <div className="mt-5 grid grid-cols-2 gap-4 flex-1 min-h-0">
                                                {item.logos.map((logo, i) => (
                                                    <div key={i} className="relative flex items-center justify-center p-4 bg-white rounded-xl">
                                                        <Image
                                                            src={logo}
                                                            alt={`investor-${i}`}
                                                            width={180}
                                                            height={90}
                                                            className="object-contain max-h-20 w-auto"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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

    useEffect(() => {
        fetch('https://biocompute-cms.onrender.com/api/health')
            .then(() => console.log("Server is healthy"))
            .catch(() => console.log("Server is down"));
    }, [])
    // Timeline Data
    const timelineData = [
        {
            title: "Aug 2023",
            cardTitle: "The Spark",
            cardSubtitle: "Conceptualization",
            cardDetailedText: "Anagha, frustrated with Google cloud and her academic project, conceptualizes data storage in DNA without de novo synthesis",
            icon: <Lightbulb className="w-6 h-6 text-fuchsia-200" />,
            image: "/thespark.jpg"
        },
        {
            title: "Jan 2024",
            cardTitle: "Foundation",
            cardSubtitle: "BioCompute Established",
            cardDetailedText: "BioCompute is set up. We are backed by Emergent Ventures, gradCapital",
            icon: <Rocket className="w-6 h-6 text-fuchsia-200" />,
            image: "/logoLG.png",
            imageContain: true
        },
        {
            title: "July 2024",
            cardTitle: "Incubation Begins",
            cardSubtitle: "CCAMP Incubation at Bengaluru",
            cardDetailedText: "Incubated at Center for Cellular and Molecular Platforms (CCAMP). Work on first proof of concept begins",
            icon: <Microscope className="w-6 h-6 text-fuchsia-200" />,
            image: "/ccampwork.jpg"
        },
        {
            title: "Jan 2025",
            cardTitle: "Home Lab Setup",
            cardSubtitle: "Garage Beginnings",
            cardDetailedText: "Set up home lab",
            icon: <Home className="w-6 h-6 text-fuchsia-200" />,
            image: "/homelab.png"
        },
        {
            title: "April 2025",
            cardTitle: "First Success",
            cardSubtitle: "Proof of Concept",
            cardDetailedText: "First proof of concept achieved, we are able to write data into DNA and retrieve it successfully",
            icon: <CheckCircle className="w-6 h-6 text-fuchsia-200" />,
            image: "/firstsuccess.jpg"
        },
        {
            title: "May 2025",
            cardTitle: "Pre-Seed Round",
            cardSubtitle: "Funding Secured",
            cardDetailedText: "Pre-seed round from 1517, gradCapital and angel investors",
            icon: <DollarSign className="w-6 h-6 text-fuchsia-200" />,
            logos: ["/1517.jpeg", "/Gradcap.png"]
        },
        {
            title: "July 2025",
            cardTitle: "Team Growth",
            cardSubtitle: "Expansion",
            cardDetailedText: "Set up our own lab in Koramangala, team grows to 6",
            icon: <Users className="w-6 h-6 text-fuchsia-200" />,
            image: "/teamgrowpic.jpg"
        },
        {
            title: "Oct 2025",
            cardTitle: "Automation",
            cardSubtitle: "Scaling Up",
            cardDetailedText: "Automated bio lab to accelerate scale up",
            icon: <Bot className="w-6 h-6 text-fuchsia-200" />,
            image: "/automation.jpeg"
        }
    ];
    // redeploy

    const team = [
        {
            avatar: "/anaghabio.jpg",
            name: "Anagha Rajesh",
            title: "Founder"
        },
        {
            avatar: "/akankshabio.jpg",
            name: "Akanksha Dasmohapatra",
            title: "Chief Product Officer"
        },
        {
            avatar: "/naveenbio.jpeg",
            name: "Naveen",
            title: "Read Stack (Electronics)"
        },
        {
            avatar: "/SaiPooja.jpg",
            name: "Sai Pooja",
            title: "Write/Store Stack (Biotechnology)"
        },
        {
            avatar: "/franci.jpeg",
            name: "Franci",
            title: "Write/Store Stack (Biotechnology)"
        },
        {
            avatar: "/abhisheklinkedin.jpg",
            name: "Abhishek K M",
            title: "Read Stack (Software)"
        }

    ]

    return (
        <div className="relative min-h-screen">
            {/* <DNABackground /> */}

            {/* Hero Section */}
            <section className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex items-center justify-center pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-36 md:pb-16 lg:pt-44 lg:pb-16 overflow-hidden">
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
            <section className="relative py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        {/* Our Vision */}
                        <div className="relative group rounded-md border border-purple-500/20 bg-purple-500/5 p-5 sm:p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 shrink-0">
                                    <Rocket className="w-5 h-5 text-purple-400" />
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                    Our Vision
                                </h2>
                            </div>
                            <div className="space-y-3 text-gray-300 text-sm sm:text-base leading-relaxed">
                                <p>
                                    Our vision is to build data infrastructure that scales at the speed of data.
                                </p>
                                <p className="font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text ">
                                    By programming biology to break through the physical limits of traditional computing.
                                </p>
                                <p>
                                    We leverage the intrinsic space and energy efficiency of biomolecules like DNA to help data center providers lower their operational expenses, and thus scale their storage and compute infrastructure.
                                </p>
                            </div>
                        </div>

                        {/* Full Stack System */}
                        <div className="relative rounded-md border border-fuchsia-500/20 bg-fuchsia-500/5 p-5 sm:p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20 shrink-0">
                                    <Zap className="w-5 h-5 text-fuchsia-400" />
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                    Atoms, Bytes & Genes
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                                We are building a full-stack data storage system at the intersection of atoms, bytes and genes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="relative rounded-2xl pt-6 px-4 mb-0 pb-16 bg-black/30 backdrop-blur-lg">
                <div className="max-w-full mx-auto">
                    <div className="max-w-xl mx-auto text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
                            Our Journey So Far
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300">
                            From concept to reality
                        </p>
                    </div>

                    <div className="w-full flex justify-center min-h-[520px] items-center pb-10">
                        <TimelineCarouselContainer timelineData={timelineData} />
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="relative py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-6 sm:mb-8 md:mb-10">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm mb-3 sm:mb-4">
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
                    <div className="grid gap-6 sm:gap-8 grid-cols-6 sm:grid-cols-6">
                        {team.map((item, idx) => (
                            <div key={idx} className="group h-full flex flex-col items-center">
                                <div className="aspect-[3/4] w-full max-w-[200px] sm:max-w-none mb-3 sm:mb-4 overflow-hidden rounded-xl flex-shrink-0">
                                    <Image
                                        src={item.avatar}
                                        width={300}
                                        height={400}
                                        unoptimized
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
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent shadow-[0_5px_25px_rgba(217,70,239,0.3),0_-5px_25px_rgba(217,70,239,0.3)]"></div>
            </div>

            {/* Media Section */}
            <section className="relative py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-6 sm:mb-8 md:mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
                            In the News
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 px-4">
                            Featured videos and articles about our work
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        {/* Media Card 1 — CNBC TV18 */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative backdrop-blur-xl bg-gradient-to-br from-purple-950/60 via-fuchsia-950/40 to-black/60 border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col transform group-hover:scale-[1.02] transition-all duration-300">
                                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 sm:mb-4 flex-shrink-0">
                                    <Image src="/cnbcarticle.jpg" alt="CNBC TV18 article" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm sm:text-base truncate">CNBC TV18</p>
                                        <p className="text-xs text-purple-300">Jun 2024</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-white text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                                    BioCompute Wins India&apos;s Largest Early-Stage Climate Startup Grant
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                                    BioCompute awarded India&apos;s largest non-equity climate startup grant of ₹31.4 lakh at the inaugural SusCrunch 2024, hosted by SusMafia in collaboration with PIEDS.
                                </p>
                                <a
                                    href="https://www.cnbctv18.com/business/startup/biocompute-wins-indias-largest-early-stage-climate-startup-grant-at-suscrunch-2024-19429970.htm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors mt-auto"
                                >
                                    Read Article
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Media Card 3 — YouTube */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative backdrop-blur-xl bg-gradient-to-br from-fuchsia-950/60 via-purple-950/40 to-black/60 border border-fuchsia-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col transform group-hover:scale-[1.02] transition-all duration-300">
                                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 sm:mb-4 flex-shrink-0">
                                    <Image src="/tedxvid.jpg" alt="TEDx talk" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 border border-red-500/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm sm:text-base truncate">YouTube</p>
                                        <p className="text-xs text-fuchsia-300">2024</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-white text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-fuchsia-300 transition-colors line-clamp-2">
                                    BioCompute — DNA Data Storage
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                                    Watch BioCompute&apos;s featured video explaining how DNA-based data storage is set to revolutionise the future of digital infrastructure.
                                </p>
                                <a
                                    href="https://www.youtube.com/watch?v=B3Of4A7s9y0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition-colors mt-auto"
                                >
                                    Watch Video
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Media Card 4 — Instagram */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative backdrop-blur-xl bg-gradient-to-br from-fuchsia-950/60 via-pink-950/40 to-black/60 border border-fuchsia-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col transform group-hover:scale-[1.02] transition-all duration-300">
                                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 sm:mb-4 flex-shrink-0">
                                    <Image src="/elevatorpitch.jpg" alt="Elevator pitch" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 border border-pink-500/30 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-white text-sm sm:text-base truncate">Instagram</p>
                                        <p className="text-xs text-pink-300">2025</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-white text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-pink-300 transition-colors line-clamp-2">
                                    BioCompute Reel
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                                    A behind-the-scenes look at BioCompute&apos;s work on DNA-based data storage — catch us on Instagram for the latest updates from the lab.
                                </p>
                                <a
                                    href="https://www.instagram.com/reel/DMx1ZuDTiIl/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors mt-auto"
                                >
                                    Watch Reel
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
            <section className="relative py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/80 to-fuchsia-50/80">
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
                        className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold text-white bg-black from-purple-600 to-fuchsia-600 rounded-md hover:from-purple-700 hover:to-fuchsia-700 transform hover:scale-105 transition-all duration-300"
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
