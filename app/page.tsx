'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Features from '@/components/sections/Features';
import BackedBy from '@/components/sections/BackedBy';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ensure component is fully mounted before attaching listeners
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    let lastScrollTop = 0;
    let scrollDelta = 0;

    // Monitor scroll position continuously when in free-scroll mode
    const handleScroll = () => {
      if (currentSection >= 3 && !isScrolling) {
        const scrollTop = container.scrollTop;
        const sectionHeight = container.clientHeight;

        // If scrolled back to near section 2, transition back to controlled mode
        if (scrollTop <= sectionHeight * 2 + 100) {
          setCurrentSection(2);
          container.scrollTo({
            top: sectionHeight * 2,
            behavior: 'smooth',
          });
        }
        return;
      }

      // Handle touchpad inertial scrolling in controlled sections
      if (currentSection < 3 && !isScrolling) {
        const scrollTop = container.scrollTop;
        const sectionHeight = container.clientHeight;
        const currentScrollSection = Math.round(scrollTop / sectionHeight);

        // Detect if user scrolled significantly with touchpad
        const delta = scrollTop - lastScrollTop;
        scrollDelta += delta;

        // Threshold for touchpad scroll detection (accumulated delta)
        if (Math.abs(scrollDelta) > sectionHeight * 0.3) {
          const direction = scrollDelta > 0 ? 1 : -1;

          // Reset delta
          scrollDelta = 0;

          // Don't go below 0 or above 2
          if (currentSection === 0 && direction < 0) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }

          if (currentSection === 2 && direction > 0) {
            // Transition to free scroll
            setCurrentSection(3);
            setIsScrolling(true);
            setTimeout(() => {
              container.scrollTo({ top: sectionHeight * 3, behavior: 'smooth' });
              setTimeout(() => setIsScrolling(false), 400);
            }, 50);
            return;
          }

          // Snap to next section
          const nextSection = Math.max(0, Math.min(2, currentSection + direction));
          if (nextSection !== currentSection) {
            setIsScrolling(true);
            setCurrentSection(nextSection);
            container.scrollTo({
              top: nextSection * sectionHeight,
              behavior: 'smooth',
            });
            setTimeout(() => setIsScrolling(false), 800);
          }
        }

        lastScrollTop = scrollTop;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const direction = e.deltaY > 0 ? 1 : -1;

      // Allow free scrolling in section 3+
      if (currentSection >= 3) {
        return; // Let the scroll handler above manage the transition back
      }

      // Prevent scroll during animation
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      // If we're at section 2 and scrolling down, allow transition to free scroll
      if (currentSection === 2 && direction > 0) {
        e.preventDefault();
        setCurrentSection(3);
        setIsScrolling(true);

        // Give a small push to start scrolling into the next section
        const sectionHeight = container.clientHeight;
        setTimeout(() => {
          container.scrollTo({
            top: sectionHeight * 3,
            behavior: 'smooth',
          });
          setTimeout(() => setIsScrolling(false), 400);
        }, 50);
        return;
      }

      // If trying to scroll back up from section 0, prevent it
      if (currentSection === 0 && direction < 0) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      setIsScrolling(true);

      const nextSection = Math.max(0, Math.min(2, currentSection + direction));

      setCurrentSection(nextSection);

      // Scroll to the section
      const sectionHeight = container.clientHeight;
      container.scrollTo({
        top: nextSection * sectionHeight,
        behavior: 'smooth',
      });

      // Reset scrolling flag after animation
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isScrolling, isMounted]);

  return (
    <>
      <main
        ref={scrollContainerRef}
        className={`h-screen w-full overflow-y-scroll scrollbar-hide ${currentSection < 3 ? 'snap-y snap-mandatory' : ''
          }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
        }}
      >
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
                scale: 0.7,
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
            mass: 0.4 // Reduce mass for smoother animation
          }}
          style={{
            willChange: 'transform, opacity', // Hint for GPU acceleration
          }}
        >
          <Image
            src="/device.png"
            alt="DNA Storage Device"
            width={350}
            height={350}
            className="object-contain"
            priority
            style={{ transform: 'translateZ(0)' }} // Force GPU layer
          />
        </motion.div>

        {/* Section 0 (State 0): Initial View - Text with Overlapping Image */}
        <section
          className="h-screen w-full snap-start flex items-start justify-center pt-20 md:pt-24 bg-black relative"
          onMouseEnter={() => setCurrentSection(0)}
        >
          <motion.div
            onViewportEnter={() => setCurrentSection(0)}
            viewport={{ amount: 0.5, once: false }}
            className="text-center px-4 relative z-10"
            style={{ willChange: 'opacity, transform' }}
          >
            <AnimatePresence>
              {currentSection === 0 && (
                <>
                  <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
                    style={{ willChange: 'opacity, transform' }}
                  >
                    The Future Of <br /> Data Storage Is
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                    className="text-7xl md:text-8xl lg:text-8xl font-bold relative z-10"
                    style={{
                      willChange: 'opacity',
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

        {/* Section 1 (State 1): The Details - Labels Around Device */}
        <section
          className="h-screen w-full snap-start flex items-center justify-center bg-black relative"
          onMouseEnter={() => setCurrentSection(1)}
        >
          <motion.div
            onViewportEnter={() => setCurrentSection(1)}
            viewport={{ amount: 0.5, once: false }}
            className="relative w-full h-full flex items-center justify-center"
            style={{ willChange: 'auto' }}
          >
            <AnimatePresence>
              {currentSection === 1 && (
                <>
                  {/* SECURE - Top Left */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute top-1/4 left-1/4 text-white text-xl md:text-2xl font-bold uppercase tracking-wider z-20"
                  >
                    SECURE
                  </motion.div>

                  {/* LONG-LASTING - Bottom Left */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute bottom-1/4 left-1/4 text-white text-xl md:text-2xl font-bold uppercase tracking-wider z-20"
                  >
                    LONG-LASTING
                  </motion.div>

                  {/* ULTRA-DENSE - Center Right */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute top-1/2 right-1/4 -translate-y-1/2 text-white text-xl md:text-2xl font-bold uppercase tracking-wider z-20"
                  >
                    ULTRA-DENSE
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Section 2 (State 2): The Stats */}
        <section
          className="h-screen w-full snap-start flex items-center justify-center bg-black relative"
          onMouseEnter={() => setCurrentSection(2)}
        >
          <motion.div
            onViewportEnter={() => setCurrentSection(2)}
            viewport={{ amount: 0.5, once: false }}
            className="w-full px-8"
            style={{ willChange: 'auto' }}
          >
            <AnimatePresence>
              {currentSection === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="max-w-6xl mx-auto"
                  style={{ willChange: 'opacity, transform' }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Col 1: 512 PB */}
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                        512 PB
                      </div>
                      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                        per cm³
                      </div>
                    </div>

                    {/* Col 2: 100+ */}
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                        100+
                      </div>
                      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                        years durability
                      </div>
                    </div>

                    {/* Col 3: 99.99% */}
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                        99.99%
                      </div>
                      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                        accuracy
                      </div>
                    </div>

                    {/* Col 4: 0kWh */}
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                        0kWh
                      </div>
                      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                        energy consumption
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      {/* Features and BackedBy sections */}
      <Features />
      <BackedBy />
    </>
  );
}
