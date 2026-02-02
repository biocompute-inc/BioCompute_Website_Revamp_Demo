'use client';

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

    return (
        <div className="mainWrapper">
            <style dangerouslySetInnerHTML={{
                __html: `
        .mainWrapper {
          width: 100%; height: 100vh; display: flex; justify-content: center; 
          align-items: center; background: #000; overflow: hidden; font-family: sans-serif;
        }
        .carouselContainer { width: 100%; display: flex; justify-content: center; position: relative; }
        .carouselArea { 
          width: 100%; white-space: nowrap; position: relative; margin-left: 240px; 
          border-radius: 10px; perspective: 1000px;
        }
        @media (max-width: 900px) { .carouselArea { margin-left: 0; } }
        .carouselPosts { position: relative; transition: 0.5s cubic-bezier(0.2, 1, 0.6, 1); perspective: 600px; cursor: grab; }
        .carouselPosts:active { cursor: grabbing; }
        .animateStop { transition: 0s !important; }
        .carouselPostBox { 
          display: inline-block; transition: 0.5s; user-select: none; position: relative;
          transform-style: preserve-3d;
        }
        .carouselPostBox-image { 
          width: 100%; min-height: 400px; background-position: center; 
          background-size: cover; border-radius: 8px; 
        }
        .carouselPostBox-title { margin-top: 24px; font-size: 20px; font-weight: bold; color: #fff; text-align: center; white-space: normal; }
        .carouselPostBox-desc { margin-top: 16px; opacity: 0.5; font-size: 14px; color: #fff; text-align: center; white-space: normal; }
        .controlLeft, .controlRight {
          width: 45px; height: 45px; display: flex; justify-content: center; align-items: center;
          border: 1px solid #fff; border-radius: 50%; color: #fff; position: absolute;
          top: 50%; transform: translateY(-50%); cursor: pointer; z-index: 100; transition: 0.3s;
        }
        .controlLeft:hover, .controlRight:hover { background: #fff; color: #000; }
        .controlLeft { left: 20px; } .controlRight { right: 20px; }
        .carouselPostBox-bar { border-bottom: 1px solid #fff; padding-bottom: 40px; margin-bottom: 10px; transition: 0.5s; }
        .carouselPostBox-bar::after {
          content: ''; display: block; height: 8px; width: 8px; position: absolute;
          bottom: -4px; left: calc(50% - 4px); background: #fff; transform: rotate(45deg);
        }
      `}} />

            <div className="carouselContainer">
                <div className="carouselArea">
                    <div
                        className={`carouselPosts ${isAnimate ? '' : 'animateStop'}`}
                        onMouseDown={handleInteractionStart}
                        onTouchStart={handleInteractionStart}
                        onMouseMove={handleInteractionMove}
                        onTouchMove={handleInteractionMove}
                        onMouseUp={handleInteractionEnd}
                        onTouchEnd={handleInteractionEnd}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {dataArray.map((item, index) => {
                            const { x, z, opacity } = getMovingStyle(index);
                            return (
                                <div
                                    key={item.time || index}
                                    className={`carouselPostBox ${isAnimate ? '' : 'animateStop'}`}
                                    style={{
                                        width: carouselPostWidth,
                                        marginRight: carouselPostMargin,
                                        transform: `translateX(${computedTranslateX + x}px) translateZ(${z}px)`,
                                        opacity: opacity,
                                    }}
                                >
                                    <div className="carouselPostBox-image" style={{ backgroundImage: `url(${item.image})` }} />
                                    <div className="carouselPostBox-title">{item.title}</div>
                                    <div className="carouselPostBox-desc">{item.desc}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex" style={{ perspective: '600px' }}>
                        {dataArray.map((_, index) => {
                            const { x, z, opacity } = getMovingStyle(index);
                            return (
                                <div
                                    key={`bar-${index}`}
                                    className={`carouselPostBox-bar ${isAnimate ? '' : 'animateStop'}`}
                                    style={{
                                        width: carouselPostWidth,
                                        paddingRight: carouselPostMargin,
                                        transform: `translateX(${computedTranslateX + x}px) translateZ(${(z * 2) / 3}px)`,
                                        opacity: opacity,
                                        position: 'relative'
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                <button className="controlLeft" onClick={() => changeImagePosition(-1)}>‹</button>
                <button className="controlRight" onClick={() => changeImagePosition(1)}>›</button>
            </div>
        </div>
    );
}