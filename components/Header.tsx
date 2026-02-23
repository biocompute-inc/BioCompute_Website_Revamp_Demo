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
    <header className="fixed top-0 left-0 right-0 z-[100] bg-dark/60 backdrop-blur-xl border-b border-dark-secondary mt-2 sm:mt-3 md:mt-4 lg:mt-5 px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 rounded-lg sm:rounded-lg md:rounded-lg mx-3 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-16 lg:h-18 gap-4 md:gap-6 lg:gap-8">
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* Desktop Logo */}
            <Image
              src="/logoLG.png"
              alt="BioCompute"
              width={180}
              height={30}
              className="hidden lg:block w-auto "
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
              src="/logoLG.png"
              alt="BioCompute"
              width={150}
              height={150}
              className="block md:hidden w-auto h-7"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6 text-sm lg:text-base xl:text-lg flex-shrink-0">
            <Link
              href="/product"
              className={`hover:text-fuchsia-300 hover:bg-fuchsia-300/20 rounded-md transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname === '/product' ? 'border-b-2 border-purple text-fuchsia-200' : ''}`}
            >
              Product
            </Link>
            <Link
              href="/about"
              className={`hover:text-fuchsia-300 hover:bg-fuchsia-300/20 rounded-md transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname === '/about' ? 'border-b-2 border-purple text-fuchsia-200' : ''
                }`}
            >
              About Us
            </Link>
            <Link
              href="/careers"
              className={`hover:text-fuchsia-300 hover:bg-fuchsia-300/20 rounded-md transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname?.startsWith('/careers') ? 'border-b-2 border-purple text-fuchsia-200' : ''
                }`}
            >
              Careers
            </Link>
            <Link
              href="/faq"
              className={`hover:text-fuchsia-300 hover:bg-fuchsia-300/20 rounded-md transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname === '/faq' ? 'border-b-2 border-purple text-fuchsia-200' : ''
                }`}
            >
              FAQs
            </Link>
            <Link
              href="/blogs"
              className={`hover:text-fuchsia-300 hover:bg-fuchsia-300/20 rounded-md transition-colors whitespace-nowrap px-1 lg:px-2 ${pathname?.startsWith('/blogs') ? 'border-b-2 border-purple text-fuchsia-200' : ''
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
                href="/product"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:text-fuchsia-300 hover:bg-fuchsia-300/20 transition-colors text-base ${pathname === '/product' ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''}`}
              >
                Product
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:text-fuchsia-300 hover:bg-fuchsia-300/20 transition-colors text-base ${pathname === '/about' ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:text-fuchsia-300 hover:bg-fuchsia-300/20 transition-colors text-base ${pathname?.startsWith('/careers') ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
                  }`}
              >
                Careers
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:text-fuchsia-300 hover:bg-fuchsia-300/20 transition-colors text-base ${pathname === '/faq' ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
                  }`}
              >
                FAQs
              </Link>
              <Link
                href="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 hover:text-fuchsia-300 hover:bg-fuchsia-300/20 transition-colors text-base ${pathname?.startsWith('/blogs') ? 'text-purple border-l-4 border-purple bg-dark-secondary' : ''
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
