'use client';

import { useState, useRef, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DottedGlowBackground } from '@/client/components/ui/dottedglowbackground';

// Lazy load heavy components
const Features = lazy(() => import('@/components/sections/Features'));
const BackedBy = lazy(() => import('@/components/sections/BackedBy'));

// --- SECTION PLACEHOLDERS ---
const SectionPlaceholder = memo(({ onEnter, index }: { onEnter: (n: number) => void; index: number }) => (
  <section
    className="h-screen w-full snap-start relative"
    style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh' }}
  >
    {/* Trigger state change when 55% of the slide is visible */}
    <motion.div
      onViewportEnter={() => onEnter(index)}
      viewport={{ amount: 0.55, once: false }}
      className="w-full h-full pointer-events-none"
    />
  </section>
));
SectionPlaceholder.displayName = 'SectionPlaceholder';

// --- ANIMATION CONFIG ---
// A "Luxury" Ease: Starts moderately fast, then brakes smoothly.
const LUXURY_EASE = [0.2, 1, 0.3, 1];
const TRANSITION_SETTINGS = { duration: 2.5, ease: LUXURY_EASE };

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [screenSize, setScreenSize] = useState('xl');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canScrollRef = useRef(true);

  // Screen Size Logic
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 475) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Video Visibility Logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollTop > container.clientHeight * 2.5) {
        setIsVideoVisible(false);
      } else {
        setIsVideoVisible(true);
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // --- REFINED WHEEL LOGIC ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // 1. Lock the scroll completely for the first few slides to handle it via JS
      if (currentSection < 3) {
        e.preventDefault();
      }

      // If animation is in progress, ignore input
      if (!canScrollRef.current) return;

      const scrollingDown = e.deltaY > 0;
      const sectionHeight = container.clientHeight;

      // --- LOGIC: Going Back Up from Section 3 ---
      if (currentSection === 3) {
        // If at top of section 3 and scrolling UP
        if (!scrollingDown && container.scrollTop <= container.clientHeight * 3.05) {
          e.preventDefault();

          if (!canScrollRef.current) return;
          canScrollRef.current = false;

          // 1. Disable snap to allow smooth JS scroll
          container.style.scrollSnapType = 'none';

          setCurrentSection(2);

          container.scrollTo({ top: sectionHeight * 2, behavior: 'smooth' });

          setTimeout(() => {
            canScrollRef.current = true;
            // Optional: Re-enable snap if you want it to feel rigid again
            container.style.scrollSnapType = 'y mandatory';
          }, 1000);
        }
        return;
      }

      // --- LOGIC: Standard Slides (0 -> 1 -> 2 -> 3) ---

      // Determine next target
      let nextSection = currentSection;
      if (scrollingDown && currentSection < 3) nextSection++;
      else if (!scrollingDown && currentSection > 0) nextSection--;

      // If nowhere to go, exit
      if (nextSection === currentSection) return;

      // EXECUTE SCROLL
      canScrollRef.current = false;
      setCurrentSection(nextSection);

      // CRITICAL: Disable CSS snap BEFORE scrolling via JS.
      // This stops the browser from fighting the animation.
      container.style.scrollSnapType = 'none';

      container.scrollTo({
        top: nextSection * sectionHeight,
        behavior: 'smooth'
      });

      // LOCK DURATION: Matches the transition duration (1.2s)
      setTimeout(() => {
        canScrollRef.current = true;
        // Re-enable snap only after the movement is totally done.
        // This ensures proper alignment without the "jitter".
        container.style.scrollSnapType = 'y mandatory';
      }, 1200);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentSection]);

  // --- TEXT VARIANTS (Added Blur for smoothness) ---

  const titleVariants = {
    section0: {
      scale: 1.6,
      y: -30,
      opacity: 1,
      marginBottom: "1rem",
      transition: TRANSITION_SETTINGS
    },
    section1: {
      scale: 1,
      y: 20,
      opacity: 1,
      marginBottom: "1rem",
      transition: TRANSITION_SETTINGS
    },
    hidden: {
      scale: 0.9,
      y: -30,
      opacity: 0,
      filter: "blur(8px)",
      marginBottom: "0rem",
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const dnaVariants = {
    section0: {
      scale: 1.5,
      y: 0,
      opacity: 1,
      letterSpacing: "0.05em",
      transition: TRANSITION_SETTINGS
    },
    section1: {
      scale: 1,
      y: 0,
      opacity: 1,
      letterSpacing: "0em",
      transition: TRANSITION_SETTINGS
    },
    hidden: {
      scale: 0.9,
      y: 0,
      opacity: 0,
      letterSpacing: "0em",
      filter: "blur(8px)",
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <>
      <main
        ref={scrollContainerRef}
        // We keep snap-y mandatory here for the browser's resize handling, 
        // but we disable it via JS during the actual scroll events.
        className={`h-screen w-full overflow-y-scroll scrollbar-hide bg-black ${currentSection < 3 ? 'snap-y snap-mandatory' : ''}`}
        // scrollBehavior must be 'auto' so JS can dictate the curve via scrollTo({behavior: 'smooth'})
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
      >
        {/* <DottedGlowBackground
          className="fixed inset-0 z-[5]"
          gap={40}
          radius={3}
          color="rgba(165, 128, 192, 0.4)"
          glowColor="rgba(155, 111, 181, 1)"
          opacity={0.7}
          backgroundOpacity={0}
          speedMin={0.2}
          speedMax={0.3}
          speedScale={1}
        /> */}

        {/* --- FIXED TEXT CONTAINER --- */}
        <motion.div
          className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          animate={{
            top: currentSection === 0 ? '0%' : currentSection === 1 ? '-25%' : '-50%',
            opacity: currentSection < 2 ? 1 : 0
          }}
          transition={TRANSITION_SETTINGS}
          style={{
            willChange: currentSection < 2 ? 'transform, opacity' : 'auto',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="text-center px-4">
            <motion.h1
              variants={titleVariants}
              initial="section0"
              animate={currentSection === 0 ? "section0" : currentSection === 1 ? "section1" : "hidden"}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight pb-2 text-white px-2 sm:px-4 leading-tight"
            >
              The Future Of <br /> Data Storage Is
            </motion.h1>

            <motion.h2
              variants={dnaVariants}
              initial="section0"
              animate={currentSection === 0 ? "section0" : currentSection === 1 ? "section1" : "hidden"}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold relative z-10 px-2 sm:px-4"
              style={{
                background: 'linear-gradient(to bottom right, #a580c0, #9b6fb5, #8a5fa5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}
            >
              DNA
            </motion.h2>
          </div>
        </motion.div>

        {/* --- FIXED DEVICE VIDEO --- */}
        {isVideoVisible && (
          <motion.div
            className="fixed z-10 pointer-events-none"
            initial={{ top: '100%', left: '50%', x: '-50%', y: '-50%', scale: 1 }}
            animate={{
              top: currentSection === 0
                ? '110%'
                : currentSection === 1
                  ? '75%'
                  : '45%',
              scale: currentSection === 0
                ? 1.2
                : currentSection === 1
                  ? 0.7
                  : 0.8,
              opacity: currentSection < 3 ? 1 : 0,
            }}
            transition={TRANSITION_SETTINGS}
            style={{
              willChange: currentSection < 3 ? 'transform, opacity' : 'auto',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <video
              src="/devicepulsing.mp4"
              autoPlay loop muted playsInline
              className="object-contain w-[250px] h-[250px] md:w-[350px] md:h-[350px] xl:w-[400px] xl:h-[400px]"
            />
          </motion.div>
        )}

        {/* --- SLIDE 2: FLOATING LABELS --- */}
        <AnimatePresence>
          {currentSection === 2 && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-[35%] left-[10%] xl:left-[32%] text-white text-xl md:text-3xl font-bold uppercase tracking-widest z-30"
                style={{ transform: 'translateZ(0)' }}
              >
                SECURE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-[45%] right-[10%] xl:right-[24%] text-white text-xl md:text-3xl font-bold uppercase tracking-widest z-30"
                style={{ transform: 'translateZ(0)' }}
              >
                ULTRA-DENSE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-[55%] left-[12%] xl:left-[23%] text-white text-xl md:text-3xl font-bold uppercase tracking-widest z-30"
                style={{ transform: 'translateZ(0)' }}
              >
                LONG-LASTING
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- SLIDE 2: BOTTOM STATS --- */}
        <AnimatePresence>
          {currentSection === 2 && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 py-8 z-40"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">512 PB</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">per cm³</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">100+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">years durability</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">99.99%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">0kWh</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">energy consumption</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- INVISIBLE SCROLL TARGETS --- */}
        <SectionPlaceholder index={0} onEnter={setCurrentSection} />
        <SectionPlaceholder index={1} onEnter={setCurrentSection} />
        <SectionPlaceholder index={2} onEnter={setCurrentSection} />

      </main>

      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative z-50">
          <Features />
          <BackedBy />
        </div>
      </Suspense>
    </>
  );
}