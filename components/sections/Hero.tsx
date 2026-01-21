'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-dark via-dark-secondary to-dark flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full text-center">
        <div className="mb-12 z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            The Future Of
            <br />
            Data Storage
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-purple mb-12">
            IS DNA
          </h2>

          {/* DNA Device Visualization */}
          <div className="flex justify-center mb-12">
            <div className="w-48 h-64 md:w-64 md:h-80 bg-gradient-to-b from-purple/20 to-transparent rounded-lg border border-purple/30 flex items-center justify-center p-4">
              <div className="text-center flex flex-col items-center gap-4">
                <Image
                  src="/device.png"
                  alt="DNA Storage Device"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <p className="text-sm text-gray-400">DNA Storage Device</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-8">
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Exclusive pilots for DNA-based data storage solutions
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-dark px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          >
            Get Early Access
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
