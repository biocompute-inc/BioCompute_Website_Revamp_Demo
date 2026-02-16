'use client';

import React, { useState, useEffect, useRef } from 'react';

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
        title: "微電影《喜歡你可以嗎》主題曲",
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

interface CarouselProps {
    isInfinity: boolean;
    dataArray: CarouselItem[];
    autoplay: boolean;
    delay: number;
    carouselPostWidth: number;
    carouselPostMargin: number;
    visibleAmount: number;
}

const Carousel: React.FC<CarouselProps> = ({
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
    const [dataArray, setDataArray] = useState<CarouselItem[]>(initialDataArray);
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
            console.log('newDataArray', newDataArray);
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

    return (
        <div className="w-full flex justify-center">
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
                                    className="w-full min-h-[400px] bg-center bg-cover transition-all duration-500 cursor-pointer"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="mt-6 font-bold text-xl leading-[1.25] tracking-[0.8px] text-center text-white">
                                    {item.title}
                                </div>
                                <div className="mt-4 opacity-50 text-sm leading-[1.14] tracking-[0.56px] text-center text-white">
                                    {item.desc}
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
                                className={`border-b border-white pb-10 mb-2.5 relative ${isAnimate ? 'transition-all duration-500 delay-100' : ''}`}
                            >
                                <div className="absolute h-2 w-2 -bottom-1 left-[calc(50%-40px)] bg-white rotate-45" />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                onClick={() => changeImagePosition(-1)}
                className="w-10 h-10 flex justify-center items-center border border-white rounded-full text-white text-3xl cursor-pointer absolute top-1/2 -translate-y-1/2 left-4 transition-all duration-500 hover:text-[#1c1c1c] hover:bg-white/80"
            >
                <i className="fa fa-angle-left">‹</i>
            </div>
            <div
                onClick={() => changeImagePosition(1)}
                className="w-10 h-10 flex justify-center items-center border border-white rounded-full text-white text-3xl cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 transition-all duration-500 hover:text-[#1c1c1c] hover:bg-white/80"
            >
                <i className="fa fa-angle-right">›</i>
            </div>
        </div>
    );
};

const Container: React.FC = () => {
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
        <Carousel
            isInfinity={true}
            dataArray={imageArray}
            autoplay={false}
            delay={10}
            carouselPostWidth={screenX > 900 ? 400 : screenX}
            carouselPostMargin={40}
            visibleAmount={4}
        />
    );
};

export default function CarouselPage() {
    return (
        <div className="min-h-screen bg-black overflow-hidden flex items-center justify-center">
            <Container />
        </div>
    );
}