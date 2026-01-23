'use client';

import Link from 'next/link';
import { HardDrive, Zap, Shield, Database } from 'lucide-react';

export default function Features() {
  const steps = [
    { icon: '📊', label: 'Digital Data' },
    { icon: '🧬', label: 'DNA Sequence' },
    { icon: '✏️', label: 'DNA Modification' },
    { icon: '🔐', label: 'DNA Storage Vault' },
    { icon: '🔬', label: 'DNA Sequencing' },
    { icon: '📑', label: 'DNA Sequence' },
    { icon: '💾', label: 'Digital Data' },
  ];

  return (
    <section className="bg-white text-dark">
      {/* Exclusive Pilots Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-gray-600 mb-3 sm:mb-4">
              EXCLUSIVE PILOTS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Get Early Access to
              <br />
              DNA-based Data
              <br />
              Storage
            </h2>
          </div>
          <div className="flex justify-center md:justify-end">
            <Link
              href="/contact"
              className="border-2 border-dark px-6 sm:px-8 py-3 sm:py-4 rounded text-dark hover:bg-dark hover:text-white transition-colors font-bold text-sm sm:text-base"
            >
              CONTACT US →
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-purple/10 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            HOW IT WORKS
          </h2>

          {/* Steps Flow */}
          <div className="overflow-x-auto pb-6">
            <div className="flex items-center justify-center gap-3 md:gap-4 min-w-max md:min-w-full">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl md:text-4xl mb-2">{step.icon}</div>
                    <p className="text-center text-xs md:text-sm font-medium whitespace-nowrap">
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="text-2xl text-gray-400 mx-2 hidden sm:block">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
