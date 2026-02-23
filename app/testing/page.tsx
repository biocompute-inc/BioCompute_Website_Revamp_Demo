"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GTAScrollAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroMainContainerRef = useRef<HTMLDivElement>(null);
    const heroMainLogoRef = useRef<HTMLImageElement>(null);
    const heroMainImageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLHeadingElement>(null);
    const heroTextLogoRef = useRef<HTMLDivElement>(null);
    const hero1ContainerRef = useRef<HTMLDivElement>(null);
    const hero2ContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // First step - initial animations
        gsap.from(heroMainContainerRef.current, {
            scale: 1.45,
            duration: 2.8,
            ease: "power3.out",
        });

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 2.8,
            ease: "power3.out",
            onComplete: () => {
                document.body.style.overflow = "visible";
                document.body.style.overflowX = "hidden";
            },
        });

        // Scroll Indicator bounce animation
        const bounceTimeline = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });

        bounceTimeline.to(scrollIndicatorRef.current, {
            y: 20,
            opacity: 0.6,
            duration: 0.8,
            ease: "power1.inOut",
        });

        // Create main timeline for scroll animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 2,
                pin: true,
                start: "top top",
                end: "+=2000",
            },
        });

        // Set initial scale
        tl.set(heroMainContainerRef.current, {
            scale: 1.25,
        });

        // Scale animation
        tl.to(heroMainContainerRef.current, {
            scale: 1,
            duration: 1,
        });

        // Fade out logo
        tl.to(
            heroMainLogoRef.current,
            {
                opacity: 0,
                duration: 0.5,
            },
            "<"
        );

        // Fade out main image
        tl.to(
            heroMainImageRef.current,
            {
                opacity: 0,
                duration: 0.9,
            },
            "<+=0.5"
        );

        // Background size animation
        tl.to(
            heroMainContainerRef.current,
            {
                backgroundSize: "28vh",
                duration: 1.5,
            },
            "<+=0.2"
        );

        // Hero text gradient animation
        tl.fromTo(
            heroTextRef.current,
            {
                backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
            },
            {
                backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
         rgb(247, 77, 82) 50.011vh,
          rgb(145, 42, 105) 90.0183vh,
           rgba(32, 31, 66, 0) 140.599vh)`,
                duration: 3,
            },
            "<1.2"
        );

        // Logo purple fade in with mask
        tl.fromTo(
            heroTextLogoRef.current,
            {
                opacity: 0,
                maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)`,
            },
            {
                opacity: 1,
                maskImage: `radial-gradient(
          circle at 50% 105.594%,
          rgb(0, 0, 0) 62.9372%,
          rgba(0, 0, 0, 0) 81.4686%
        )`,
                duration: 3,
            },
            "<0.2"
        );

        // Hide main container
        tl.set(heroMainContainerRef.current, { opacity: 0 });

        // Scale hero 1 container
        tl.to(hero1ContainerRef.current, { scale: 0.85, duration: 3 }, "<-=3");

        // Set mask image
        tl.set(
            hero1ContainerRef.current,
            {
                maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
            },
            "<+=2.1"
        );

        // Animate mask to fade out
        tl.to(
            hero1ContainerRef.current,
            {
                maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
                duration: 2,
            },
            "<+=0.2"
        );

        // Fade out text logo
        tl.to(
            heroTextLogoRef.current,
            {
                opacity: 0,
                duration: 2,
            },
            "<1.5"
        );

        // Hide hero 1 and show hero 2
        tl.set(hero1ContainerRef.current, { opacity: 0 });
        tl.set(hero2ContainerRef.current, { visibility: "visible" });

        // Fade in hero 2
        tl.to(hero2ContainerRef.current, { opacity: 1, duration: 3 }, "<+=0.2");

        // Hero 2 gradient animation
        tl.fromTo(
            hero2ContainerRef.current,
            {
                backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
            },
            {
                backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
         rgb(247, 77, 82) 50.011vh,
          rgb(145, 42, 105) 90.0183vh,
           rgba(32, 31, 66, 0) 140.599vh)`,
                duration: 3,
            },
            "<1.2"
        );

        // Cleanup
        return () => {
            bounceTimeline.kill();
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <style jsx>{`
        body {
          overflow: hidden;
          overflow-x: hidden;
        }
      `}</style>
            <div ref={containerRef} className="min-h-screen relative bg-gradient-to-br from-[#1c1829] via-[#1b1828] to-[#111117]">
                <div ref={overlayRef} className="fixed inset-0 bg-black z-[1] pointer-events-none"></div>

                <div ref={hero1ContainerRef} className="relative">
                    <div
                        ref={heroMainContainerRef}
                        className="w-full h-screen relative scale-125"
                        style={{
                            backgroundImage: 'url("/logo_white.svg")',
                            backgroundSize: '1000vh',
                            backgroundPosition: '50% 41.7%',
                            backgroundRepeat: 'no-repeat',
                            backgroundOrigin: 'content-box',
                            paddingBottom: '200px',
                        }}
                    >
                        <img
                            ref={heroMainImageRef}
                            className="w-full h-screen absolute inset-0 object-cover"
                            draggable="false"
                            src="/gta_hero.webp"
                            alt="gta hero"
                        />
                        <img
                            ref={heroMainLogoRef}
                            className="w-full h-screen absolute inset-0 z-[1] object-cover"
                            draggable="false"
                            src="/gta_logo_cut.webp"
                            alt="gta logo"
                        />
                    </div>

                    <div className="w-full h-screen absolute inset-0 -z-[1] flex flex-col gap-16 justify-center items-center">
                        <div
                            ref={heroTextLogoRef}
                            className="flex items-center justify-center w-full h-screen absolute inset-0"
                            style={{
                                backgroundImage: 'url("/gta_logo_purple.webp")',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '50% 41.7%',
                                backgroundSize: '28vh',
                                backgroundOrigin: 'content-box',
                                paddingBottom: '200px',
                            }}
                        ></div>
                        <div>
                            <h3
                                ref={heroTextRef}
                                className="text-[#ffb0c4] text-center uppercase text-4xl lg:text-6xl leading-[0.9] w-full mt-[55%]"
                                style={{
                                    backgroundImage: `radial-gradient(
                    circle at 50% 200vh,
                    rgba(255, 214, 135, 0) 0,
                    rgba(157, 47, 106, 0.5) 90vh,
                    rgba(157, 47, 106, 0.8) 120vh,
                    rgba(32, 31, 66, 0) 150vh
                  )`,
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Coming<br />
                                May 26<br />
                                2026
                            </h3>
                        </div>
                    </div>
                </div>

                <div
                    ref={hero2ContainerRef}
                    className="w-full h-screen absolute inset-0 opacity-0 flex flex-col gap-8 justify-center items-start text-left px-8 lg:px-0 lg:max-w-[60%] lg:mx-auto invisible"
                    style={{
                        backgroundImage: `radial-gradient(
              circle at 50% 200vh,
              rgba(255, 214, 135, 0) 0,
              rgba(157, 47, 106, 0.5) 90vh,
              rgba(157, 47, 106, 0.8) 120vh,
              rgba(32, 31, 66, 0) 150vh
            )`,
                        WebkitTextFillColor: 'transparent',
                        fontSize: '6rem',
                        backgroundClip: 'text',
                    }}
                >
                    <h3 className="text-4xl lg:text-[3.5rem]">Vice City, USA.</h3>
                    <p className="max-w-[90%] text-base lg:text-2xl">
                        Jason and Lucia have always known the deck is stacked against them.
                        But when an easy score goes wrong, they find themselves on the darkest
                        side of the sunniest place in America, in the middle of a criminal
                        conspiracy stretching across the state of Leonida — forced to rely on
                        each other more than ever if they want to make it out alive.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-[10%] lg:bottom-[30px] left-1/2 -translate-x-1/2 w-[34px] h-[14px] z-10"
                >
                    <svg
                        width="34"
                        height="14"
                        viewBox="0 0 34 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                        className="text-[#ffb0c4] w-full h-full"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M33.5609 1.54346C34.0381 2.5875 33.6881 3.87821 32.7791 4.42633L17.0387 13.9181L1.48663 4.42115C0.580153 3.86761 0.235986 2.57483 0.717909 1.53365C1.19983 0.492464 2.32535 0.097152 3.23182 0.650692L17.0497 9.08858L31.051 0.64551C31.96 0.0973872 33.0837 0.499411 33.5609 1.54346Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    );
}