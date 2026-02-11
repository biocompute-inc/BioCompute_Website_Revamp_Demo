'use client';

import ScrollStack, { ScrollStackItem } from '@/client/components/ui/ScrollStack';
import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
interface CarouselItem {
    image: string;
    title: string;
    desc: string;
    time?: number;
}

const imageArray: CarouselItem[] = [
    {
        image: "https://picsum.photos/id/117/1000/1000",
        title: "Netflix原創影集《誰是被害者》宣傳曲",
        desc: "許瑋甯《每個人都是鬼》by湯包(湯明憲)"
    },
    {
        image: "https://picsum.photos/id/137/1000/1000",
        title: "微電影《喜歡可以嗎》主題曲",
        desc: "曹祐寧《兩小勿猜》by姚書寰(姚頭)/曜花"
    },
    {
        image: "https://picsum.photos/id/153/1000/1000",
        title: "首支個人單曲",
        desc: "亮哲《囡仔》by亮哲"
    },
    {
        image: "https://picsum.photos/id/265/1000/1000",
        title: "新加坡新銳創作歌手",
        desc: "卓振聲《以後》by方炯鎵，卓振聲"
    }
];

export default function CarouselPage() {
    const [screenX, setScreenX] = useState(0);
    const [dataArray, setDataArray] = useState<CarouselItem[]>(imageArray);
    const [nowIndex, setNowIndex] = useState(4); // Default visibleAmount
    const [isAnimate, setIsAnimate] = useState(true);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [diffX, setDiffX] = useState(0);
    const [movingStatus, setMovingStatus] = useState(1);

    const visibleAmount = 4;
    const carouselPostWidth = screenX > 900 ? 400 : screenX;
    const carouselPostMargin = 40;

    // Initialization & Resize
    useEffect(() => {
        setScreenX(window.innerWidth);
        const handleResize = () => setScreenX(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Infinite Array Setup
        const behindData = imageArray.slice(0, visibleAmount);
        const beforeData = imageArray.slice(-visibleAmount);
        const newData = [...beforeData, ...imageArray, ...behindData].map((item, index) => ({
            ...item,
            time: new Date().getTime() + index
        }));
        setDataArray(newData);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const changeImagePosition = (offset: number) => {
        setIsAnimate(true);
        setNowIndex((prev) => prev + offset);
    };

    const handleTransitionEnd = () => {
        if (nowIndex >= dataArray.length - visibleAmount) {
            setIsAnimate(false);
            setNowIndex(visibleAmount);
        } else if (nowIndex <= 0) {
            setIsAnimate(false);
            setNowIndex(dataArray.length - (visibleAmount * 2));
        }
    };

    const handleInteractionStart = (e: any) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        setIsMouseDown(true);
        setStartX(x);
    };

    const handleInteractionMove = (e: any) => {
        if (!isMouseDown) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const currentDiff = startX - x;
        setDiffX(currentDiff);
        setMovingStatus(-currentDiff < 0 ? -1 : 1);
    };

    const handleInteractionEnd = (e: any) => {
        if (!isMouseDown) return;
        const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const finalDiff = startX - x;
        const maxDiffX = carouselPostWidth / 2;

        let targetIndex = nowIndex;
        if (finalDiff > maxDiffX) targetIndex++;
        else if (finalDiff < -maxDiffX) targetIndex--;

        setIsMouseDown(false);
        setIsAnimate(true);
        setNowIndex(targetIndex);
        setStartX(0);
        setDiffX(0);
    };

    const computedTranslateX = -nowIndex * carouselPostWidth - (carouselPostMargin * nowIndex);

    const getMovingStyle = (index: number) => {
        const styles = { x: -diffX, z: 0, opacity: 1 };
        if (!isMouseDown) {
            if (nowIndex > index) { styles.z = -carouselPostWidth; styles.opacity = 0; }
            styles.x = 0;
            return styles;
        }
        if (movingStatus === 1) {
            if (nowIndex - 1 === index) {
                const z = -carouselPostWidth - diffX;
                styles.z = z > 0 ? 0 : z;
                styles.opacity = -diffX / carouselPostWidth;
            } else if (nowIndex > index) { styles.z = -carouselPostWidth; styles.opacity = 0; }
        } else {
            if (nowIndex === index) {
                styles.z = -diffX;
                styles.opacity = 1 - Math.abs(diffX / carouselPostWidth);
            } else if (nowIndex > index) { styles.z = -carouselPostWidth; styles.opacity = 0; }
        }
        return styles;
    };

    if (screenX === 0) return null;

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

    return (
        <ScrollStack
            itemDistance={80}
            itemScale={0.04}
            baseScale={0.9}
            itemStackDistance={35}
            stackPosition="15%"
            scaleEndPosition="5%"
            useWindowScroll={false}
            className="h-full"
        >
            {timelineData.map((item, index) => (
                <ScrollStackItem key={index} itemClassName="bg-[#0f0518] shadow-[0_0_50px_rgba(139,92,246,0.1)] border border-purple-500/30 flex flex-col justify-center">
                    <div className="flex flex-col h-full justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-purple-400 text-xs font-bold tracking-widest uppercase bg-purple-900/40 px-3 py-1 rounded-full w-fit border border-purple-500/30">
                                {item.title}
                            </span>
                            <div className="h-px bg-purple-500/30 flex-grow"></div>
                        </div>

                        <h3 className="text-white text-2xl font-bold mb-2">{item.cardTitle}</h3>
                        <h4 className="text-purple-300 text-base font-semibold mb-4">{item.cardSubtitle}</h4>
                        <p className="text-gray-300 text-lg leading-relaxed">{item.cardDetailedText}</p>
                    </div>
                </ScrollStackItem>
            ))}
        </ScrollStack>
    );
}