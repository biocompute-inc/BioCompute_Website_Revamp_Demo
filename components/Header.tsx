'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/60 backdrop-blur-xl border-b border-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">

            <Image
              src="/logoLG.png"
              alt="BioCompute"
              width={150}
              height={100}
              className="hidden md:block"
            />
            <Image
              src="/logoSM.png"
              alt="BioCompute"
              width={100}
              height={30}
              className="block md:hidden"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className={`hover:text-purple transition-colors ${pathname === '/about' ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              About Us
            </Link>
            <Link
              href="/careers"
              className={`hover:text-purple transition-colors ${pathname?.startsWith('/careers') ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              Careers
            </Link>
            <Link
              href="/faq"
              className={`hover:text-purple transition-colors ${pathname === '/faq' ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              FAQs
            </Link>
            <Link
              href="/blogs"
              className={`hover:text-purple transition-colors ${pathname?.startsWith('/blogs') ? 'border-b-2 border-purple text-purple' : ''
                }`}
            >
              Blogs
            </Link>
            <Link href="/contact" className="border border-white px-6 py-2 rounded hover:bg-white hover:text-dark transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="border border-white px-4 py-2 rounded text-sm hover:bg-white hover:text-dark transition-colors"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dark-secondary">
            <nav className="flex flex-col py-4 space-y-4">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 hover:bg-dark-secondary transition-colors ${pathname === '/about' ? 'text-purple border-l-4 border-purple' : ''
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 hover:bg-dark-secondary transition-colors ${pathname?.startsWith('/careers') ? 'text-purple border-l-4 border-purple' : ''
                  }`}
              >
                Careers
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 hover:bg-dark-secondary transition-colors ${pathname === '/faq' ? 'text-purple border-l-4 border-purple' : ''
                  }`}
              >
                FAQs
              </Link>
              <Link
                href="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 hover:bg-dark-secondary transition-colors ${pathname?.startsWith('/blogs') ? 'text-purple border-l-4 border-purple' : ''
                  }`}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 border border-white px-6 py-2 rounded hover:bg-white hover:text-dark transition-colors text-center"
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
