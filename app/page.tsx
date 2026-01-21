'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Features from '@/components/sections/Features';
import BackedBy from '@/components/sections/BackedBy';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <>
      <main className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth ">
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
                top: '70%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                scale: 1,
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
                  top: '30%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 0.8,
                  opacity: 0,
                }
          }
          transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 0.8 }}
        >
          <Image
            src="/device.png"
            alt="DNA Storage Device"
            width={350}
            height={350}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Section 0 (State 0): Initial View - Text with Overlapping Image */}
        <section
          className="h-screen w-full snap-start flex items-start justify-center pt-20 md:pt-24 bg-black relative"
          onMouseEnter={() => setCurrentSection(0)}
        >
          <motion.div
            onViewportEnter={() => setCurrentSection(0)}
            viewport={{ amount: 0.5 }}
            className="text-center px-4 relative z-10"
          >
            <AnimatePresence>
              {currentSection === 0 && (
                <>
                  <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
                  >
                    The Future Of <br /> Data Storage
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-7xl md:text-8xl lg:text-8xl font-bold text-purple relative z-10"
                  >
                    IS DNA
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
            viewport={{ amount: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
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
            viewport={{ amount: 0.5 }}
            className="w-full px-8"
          >
            <AnimatePresence>
              {currentSection === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-6xl mx-auto"
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
