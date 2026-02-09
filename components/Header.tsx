'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-dark/60 backdrop-blur-xl border-b border-dark-secondary mt-2 sm:mt-3 md:mt-4 lg:mt-5 px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 rounded-2xl sm:rounded-3xl md:rounded-full mx-3 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-16 lg:h-18 gap-4 md:gap-6 lg:gap-8">
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* Desktop Logo */}
            <Image
              src="/logoLG.png"
              alt="BioCompute"
              width={160}
              height={53}
              className="hidden lg:block w-auto h-10 lg:h-12 xl:h-14"
              priority
            />
            {/* Tablet Logo */}
            <Image
              src="/logoLG.png"
              alt="BioCompute"
              width={140}
              height={47}
              className="hidden md:block lg:hidden w-auto h-9"
              priority
            />
            {/* Mobile Logo */}
            <Image
              src="/logoSM.png"
              alt="BioCompute"
              width={90}
              height={30}
              className="block md:hidden w-auto h-7"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6 text-xs lg:text-sm xl:text-base flex-shrink-0">
            <Link
              href="/howitworks"
              className={`hover:text-purple transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname === '/howitworks' ? 'border-b-2 border-purple text-purple' : ''}`}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className={`hover:text-purple transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname === '/about' ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              About Us
            </Link>
            <Link
              href="/careers"
              className={`hover:text-purple transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname?.startsWith('/careers') ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              Careers
            </Link>
            <Link
              href="/faq"
              className={`hover:text-purple transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname === '/faq' ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              FAQs
            </Link>
            <Link
              href="/blogs"
              className={`hover:text-purple transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname?.startsWith('/blogs') ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              Blogs
            </Link>
            <Link href="/contact" className="border border-white px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 rounded text-xs lg:text-sm xl:text-base hover:bg-white hover:text-dark transition-colors whitespace-nowrap ml-2">
              Contact Us
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dark-secondary bg-dark/95 backdrop-blur-xl rounded-b-2xl">
            <nav className="flex flex-col py-2 space-y-1">
              <Link
                href="/howitworks"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:bg-dark-secondary transition-colors text-sm ${pathname === '/howitworks' ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''}`}
              >
                How It Works
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:bg-dark-secondary transition-colors text-sm ${pathname === '/about' ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:bg-dark-secondary transition-colors text-sm ${pathname?.startsWith('/careers') ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
                  }`}
              >
                Careers
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:bg-dark-secondary transition-colors text-sm ${pathname === '/faq' ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
                  }`}
              >
                FAQs
              </Link>
              <Link
                href="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:bg-dark-secondary transition-colors text-sm ${pathname?.startsWith('/blogs') ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
                  }`}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-3 my-2 border border-white px-4 py-3 rounded-xl hover:bg-white hover:text-dark transition-colors text-center text-sm font-medium"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
