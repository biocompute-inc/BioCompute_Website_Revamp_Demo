'use client';

import { useState, useRef, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { DottedGlowBackground } from '@/client/components/ui/dottedglowbackground';

// Lazy load heavy components
const Features = lazy(() => import('@/components/sections/Features'));
const BackedBy = lazy(() => import('@/components/sections/BackedBy'));

// Memoized Section Components for better performance
const HeroSection = memo(({ currentSection, setCurrentSection }: { currentSection: number; setCurrentSection: (n: number) => void }) => (
  <section
    className="h-screen w-full snap-start flex items-start justify-center pt-20 md:pt-24 sm:pt-40 relative"
    onMouseEnter={() => setCurrentSection(0)}
    style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh' }}
  >
    <motion.div
      onViewportEnter={() => setCurrentSection(0)}
      viewport={{ amount: 0.5, once: false }}
      className="text-center px-4 relative z-10"
    >
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 text-white px-4"
            >
              The Future Of <br /> Data Storage Is
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold relative z-10 px-4"
              style={{
                background: 'linear-gradient(to bottom right, #a580c0, #9b6fb5, #8a5fa5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              DNA
            </motion.h2>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  </section>
));
HeroSection.displayName = 'HeroSection';

const DetailsSection = memo(({ currentSection, setCurrentSection }: { currentSection: number; setCurrentSection: (n: number) => void }) => (
  <section
    className="h-screen w-full snap-start flex items-center justify-center relative"
    onMouseEnter={() => setCurrentSection(1)}
    style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh' }}
  >
    <motion.div
      onViewportEnter={() => setCurrentSection(1)}
      viewport={{ amount: 0.5, once: false }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {currentSection === 1 && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-1/4 left-4 sm:left-8 md:left-1/4 text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider z-20"
            >
              SECURE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-1/4 left-4 sm:left-8 md:left-1/4 text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider z-20"
            >
              LONG-LASTING
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-1/2 right-4 sm:right-8 md:right-1/4 -translate-y-1/2 text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider z-20"
            >
              ULTRA-DENSE
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  </section>
));
DetailsSection.displayName = 'DetailsSection';

const StatsSection = memo(({ currentSection, setCurrentSection }: { currentSection: number; setCurrentSection: (n: number) => void }) => (
  <section
    className="h-screen w-full snap-start flex items-center justify-center relative"
    onMouseEnter={() => setCurrentSection(2)}
    style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh' }}
  >
    <motion.div
      onViewportEnter={() => setCurrentSection(2)}
      viewport={{ amount: 0.5, once: false }}
      className="w-full px-8"
    >
      <AnimatePresence mode="wait">
        {currentSection === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 px-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  512 PB
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
                  per cm³
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  100+
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
                  years durability
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  99.99%
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
                  accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  0kWh
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
                  energy consumption
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </section>
));
StatsSection.displayName = 'StatsSection';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canScrollRef = useRef(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;

      // Section 3+ - free scrolling, check for return to section 2
      if (currentSection === 3) {
        if (!scrollingDown && container.scrollTop < container.clientHeight * 2.5) {
          e.preventDefault();
          setCurrentSection(2);
          canScrollRef.current = false;
          container.style.scrollSnapType = 'y mandatory';
          container.scrollTo({ top: container.clientHeight * 2, behavior: 'smooth' });
          setTimeout(() => { canScrollRef.current = true; }, 1000);
        }
        return;
      }

      // Sections 0-2 - controlled scrolling
      if (!canScrollRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      canScrollRef.current = false;

      const sectionHeight = container.clientHeight;

      // At section 0, can't go up
      if (currentSection === 0 && !scrollingDown) {
        canScrollRef.current = true;
        return;
      }

      // At section 2, scrolling down goes to free scroll
      if (currentSection === 2 && scrollingDown) {
        setCurrentSection(3);
        container.style.scrollSnapType = 'none';

        setTimeout(() => {
          container.scrollTo({ top: sectionHeight * 2.5, behavior: 'auto' });
          setTimeout(() => {
            container.scrollTo({ top: sectionHeight * 3.5, behavior: 'smooth' });
            setTimeout(() => { canScrollRef.current = true; }, 600);
          }, 100);
        }, 100);
        return;
      }

      // Normal navigation between sections 0, 1, 2
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

  return (
    <>
      <main
        ref={scrollContainerRef}
        className={`h-screen w-full overflow-y-scroll scrollbar-hide bg-black ${currentSection < 3 ? 'snap-y snap-mandatory' : ''
          }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Dotted Glow Background - Fixed across all sections */}
        <DottedGlowBackground
          className="fixed inset-0 z-[5]"
          gap={30}
          radius={3}
          color="rgba(165, 128, 192, 0.4)"
          glowColor="rgba(155, 111, 181, 0.85)"
          opacity={0.4}
          backgroundOpacity={0}
          speedMin={0.2}
          speedMax={1}
          speedScale={1}
        />

        {/* Fixed Device Image - Animates based on currentSection */}
        <motion.div
          className="fixed z-20 pointer-events-none"
          initial={{
            top: '70%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 1,
            opacity: 1,
          }}
          animate={
            currentSection === 0
              ? {
                top: '68%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                scale: 0.9,
                opacity: 1,
              }
              : currentSection === 1
                ? {
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 1.2,
                  opacity: 1,
                }
                : {
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 0.8,
                  opacity: 0,
                }
          }
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 25,
            mass: 0.4
          }}
          style={{
            willChange: 'transform, opacity',
          }}
        >
          <video
            src="/devicepulsing.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="object-contain w-[300px] h-[300px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[350px] lg:h-[350px]"
            style={{ transform: 'translateZ(0)' }}
          />
        </motion.div>

        {/* Sections using memoized components */}
        <HeroSection currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <DetailsSection currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <StatsSection currentSection={currentSection} setCurrentSection={setCurrentSection} />
      </main>

      {/* Features and BackedBy sections */}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Features />
        <BackedBy />
      </Suspense>
    </>
  );
}
