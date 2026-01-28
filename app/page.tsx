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
    className="h-screen w-full snap-start flex items-start justify-center pt-40 xs:pt-72 sm:pt-56 md:pt-52 lg:pt-48 xl:pt-40 relative"
    onMouseEnter={() => setCurrentSection(0)}
    style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh' }}
  >
    <motion.div
      onViewportEnter={() => setCurrentSection(0)}
      viewport={{ amount: 0.5, once: false }}
      className="text-center px-4 relative z-10 max-w-4xl"
    >
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-2 xs:mb-3 sm:mb-4 text-white px-2 sm:px-4"
            >
              The Future Of <br /> Data Storage Is
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold relative z-10 px-2 sm:px-4"
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
      {/* Text labels moved outside to main for proper z-index stacking */}
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
      className="w-full px-4 sm:px-6 md:px-8"
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-2 sm:px-4">
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">
                  512 PB
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
                  per cm³
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">
                  100+
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
                  years durability
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">
                  99.99%
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
                  accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">
                  0kWh
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide">
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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sectionHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      // Hide video if scrolled beyond section 2 (with tighter threshold)
      if (scrollTop > sectionHeight * 2.05) {
        setIsVideoVisible(false);
      } else {
        setIsVideoVisible(true);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
          gap={20}
          radius={2}
          color="rgba(165, 128, 192, 0.4)"
          glowColor="rgba(155, 111, 181, 1)"
          opacity={0.7}
          backgroundOpacity={0}
          speedMin={0.2}
          speedMax={1}
          speedScale={1}
        />

        {/* Fixed Device Image - Animates based on currentSection */}
        {isVideoVisible && (
          <motion.div
            className="fixed z-10 pointer-events-none"
            initial={{
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: 1,
              opacity: 1,
            }}
            animate={{
              top: currentSection === 0
                ? screenSize === 'xs' ? '60%'
                  : screenSize === 'sm' ? '60%'
                    : screenSize === 'md' ? '70%'
                      : screenSize === 'lg' ? '75%'
                        : '80%'  // xl
                : currentSection === 1
                  ? screenSize === 'xs' ? '55%'
                    : screenSize === 'sm' ? '55%'
                      : screenSize === 'md' ? '55%'
                        : screenSize === 'lg' ? '55%'
                          : '55%'  // xl
                  : '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: currentSection === 0
                ? screenSize === 'xs' ? 1.3
                  : screenSize === 'sm' ? 1.3
                    : screenSize === 'md' ? 0.7
                      : screenSize === 'lg' ? 0.7
                        : 0.7  // xl
                : currentSection === 1
                  ? screenSize === 'xs' ? 1.6
                    : screenSize === 'sm' ? 2
                      : screenSize === 'md' ? 1.4
                        : screenSize === 'lg' ? 1.5
                          : 1.3  // xl
                  : screenSize === 'xs' ? 0.8
                    : screenSize === 'sm' ? 0.8
                      : screenSize === 'md' ? 0.8
                        : screenSize === 'lg' ? 0.8
                          : 0.8,  // xl
              opacity: currentSection < 2 ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 25,
              mass: 0.4
            }}
            style={{
              willChange: 'transform, opacity',
              zIndex: 10,
            }}
          >
            <video
              src="/devicepulsing.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="object-contain w-[180px] h-[180px] xs:w-[200px] xs:h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[350px] xl:h-[350px]"
              style={{ transform: 'translateZ(0)', mixBlendMode: 'normal' }}
            />
          </motion.div>
        )}

        {/* Fixed Text Labels - Render outside sections for proper z-index */}
        <AnimatePresence mode="wait">
          {currentSection === 1 && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="fixed top-1/4 left-2 xs:left-4 sm:left-6 md:left-8 lg:left-12 xl:left-1/4 text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold uppercase tracking-wider z-50 pointer-events-none backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg"
                style={{ zIndex: 50 }}
              >
                SECURE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="fixed bottom-1/4 left-2 xs:left-4 sm:left-6 md:left-8 lg:left-12 xl:left-1/4 text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold uppercase tracking-wider z-50 pointer-events-none backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg"
                style={{ zIndex: 50 }}
              >
                LONG-LASTING
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="fixed top-1/2 right-2 xs:right-4 sm:right-6 md:right-8 lg:right-12 xl:right-1/4 -translate-y-1/2 text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold uppercase tracking-wider z-50 pointer-events-none backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg"
                style={{ zIndex: 50 }}
              >
                ULTRA-DENSE
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sections using memoized components */}
        <HeroSection currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <DetailsSection currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <StatsSection currentSection={currentSection} setCurrentSection={setCurrentSection} />
      </main>

      {/* Features and BackedBy sections */}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div className="relative z-50">
          <Features />
          <BackedBy />
        </div>
      </Suspense>
    </>
  );
}
