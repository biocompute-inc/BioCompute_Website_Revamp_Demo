'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        <div className="flex flex-row items-center justify-around">
          <div>
            <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-gray-600 mb-2">
              EXCLUSIVE PILOTS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0">
              Get Early Access to
              <br />
              DNA-based Data
              <br />
              Storage
            </h2>
          </div>
          <div className="flex flex-col gap-4 justify-center md:justify-end">
            <Link
              href="/contact"
              className="border-2 mx-6 border-dark px-6 sm:px-8 py-3 sm:py-4 rounded text-dark hover:bg-dark hover:text-white transition-colors font-bold text-sm sm:text-base text-center"
            >
              CONTACT US
            </Link>
            <Link
              href="/product"
              className="border-2 mx-6 border-dark px-6 sm:px-8 py-3 sm:py-4 rounded text-dark hover:bg-dark hover:text-white transition-colors font-bold text-sm sm:text-base text-center"
            >
              KNOW MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
