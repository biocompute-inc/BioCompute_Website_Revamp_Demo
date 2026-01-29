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
    onMouseEnter={() => onEnter(index)}
    style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh' }}
  >
    <motion.div
      onViewportEnter={() => onEnter(index)}
      viewport={{ amount: 0.5, once: false }}
      className="w-full h-full pointer-events-none"
    />
  </section>
));
SectionPlaceholder.displayName = 'SectionPlaceholder';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [screenSize, setScreenSize] = useState('xl');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canScrollRef = useRef(true);

  // Detect screen size
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

  // Scroll Visibility Logic
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

  // Custom Wheel Logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;

      if (currentSection === 3) {
        if (!scrollingDown && container.scrollTop < container.clientHeight * 2.8) {
          e.preventDefault();
          setCurrentSection(2);
          canScrollRef.current = false;
          container.style.scrollSnapType = 'y mandatory';
          container.scrollTo({ top: container.clientHeight * 2, behavior: 'smooth' });
          setTimeout(() => { canScrollRef.current = true; }, 1000);
        }
        return;
      }

      if (!canScrollRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      canScrollRef.current = false;
      const sectionHeight = container.clientHeight;

      if (currentSection === 0 && !scrollingDown) {
        canScrollRef.current = true;
        return;
      }

      if (currentSection === 2 && scrollingDown) {
        setCurrentSection(3);
        container.style.scrollSnapType = 'none';
        setTimeout(() => {
          container.scrollTo({ top: sectionHeight * 2.8, behavior: 'auto' });
          setTimeout(() => {
            container.scrollTo({ top: sectionHeight * 3.1, behavior: 'smooth' });
            setTimeout(() => { canScrollRef.current = true; }, 600);
          }, 100);
        }, 100);
        return;
      }

      const newSection = scrollingDown ? currentSection + 1 : currentSection - 1;
      if (newSection >= 0 && newSection <= 2) {
        setCurrentSection(newSection);
        container.scrollTo({ top: newSection * sectionHeight, behavior: 'smooth' });
        setTimeout(() => { canScrollRef.current = true; }, 1000);
      } else {
        canScrollRef.current = true;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentSection]);

  // --- TEXT ANIMATION VARIANTS ---

  const titleVariants = {
    section0: {
      scale: 1.6,
      y: -30,           // Section 0 Vertical Position
      opacity: 1,
      marginBottom: "1rem"
    },
    section1: {
      scale: 1,
      y: 20,          // <--- CHANGED: Different Y value for Section 1 (Simulates Padding)
      opacity: 1,
      marginBottom: "1rem"
    },
    hidden: {
      scale: 0.8,
      y: -50,
      opacity: 0,
      marginBottom: "0rem"
    }
  };

  const dnaVariants = {
    section0: {
      scale: 1.5,
      y: 0,           // DNA stays neutral in Y
      opacity: 1,
      letterSpacing: "0.05em"
    },
    section1: {
      scale: 1,
      y: 0,           // DNA stays neutral in Y
      opacity: 1,
      letterSpacing: "0em"
    },
    hidden: {
      scale: 0.8,
      y: 0,
      opacity: 0,
      letterSpacing: "0em"
    }
  };

  return (
    <>
      <main
        ref={scrollContainerRef}
        className={`h-screen w-full overflow-y-scroll scrollbar-hide bg-black ${currentSection < 3 ? 'snap-y snap-mandatory' : ''
          }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
      >
        <DottedGlowBackground
          className="fixed inset-0 z-[5]"
          gap={60}
          radius={3}
          color="rgba(165, 128, 192, 0.4)"
          glowColor="rgba(155, 111, 181, 1)"
          opacity={0.7}
          backgroundOpacity={0}
          speedMin={0.2}
          speedMax={0.3}
          speedScale={1}
        />

        {/* --- FIXED TEXT CONTAINER --- */}
        <motion.div
          className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          animate={{
            // Layout position movement
            top: currentSection === 0 ? '0%' : currentSection === 1 ? '-25%' : '-50%',
            opacity: currentSection < 2 ? 1 : 0
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center px-4">
            {/* Tagline Animation */}
            <motion.h1
              variants={titleVariants}
              initial="section0"
              animate={currentSection === 0 ? "section0" : currentSection === 1 ? "section1" : "hidden"}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight pb-2 text-white px-2 sm:px-4 leading-tight"
            >
              The Future Of <br /> Data Storage Is
            </motion.h1>

            {/* DNA Animation */}
            <motion.h2
              variants={dnaVariants}
              initial="section0"
              animate={currentSection === 0 ? "section0" : currentSection === 1 ? "section1" : "hidden"}
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
            transition={{ type: 'spring', stiffness: 45, damping: 20 }}
            style={{ willChange: 'transform, opacity, top' }}
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
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="fixed top-[35%] left-[10%] xl:left-[32%] text-white text-xl md:text-3xl font-bold uppercase tracking-widest z-30"
              >
                SECURE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="fixed top-[45%] right-[10%] xl:right-[24%] text-white text-xl md:text-3xl font-bold uppercase tracking-widest z-30"
              >
                ULTRA-DENSE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="fixed top-[55%] left-[12%] xl:left-[23%] text-white text-xl md:text-3xl font-bold uppercase tracking-widest z-30"
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
              transition={{ duration: 0.5, ease: "circOut" }}
              className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 py-8 z-40"
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