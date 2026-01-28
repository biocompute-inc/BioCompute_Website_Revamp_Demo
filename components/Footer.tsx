'use client';

import Link from 'next/link';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white hover:text-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white hover:text-purple transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-white hover:text-purple transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-white hover:text-purple transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty column for spacing */}
          <div />

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              CONTACT US
            </h3>
            <Link href="/contact" className="border border-white px-4 py-2 rounded text-sm hover:bg-white hover:text-dark transition-colors mb-4 block text-center">
              Contact Form
            </Link>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-white">
                <Mail size={18} />
                <a href="mailto:hello@biocomputeinc.com" className="hover:text-purple transition-colors">
                  hello@biocomputeinc.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MapPin size={18} />
                <span>Bengaluru, India</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/biocompute/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/biocompute-inc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple transition-colors">
                <Github size={20} />
              </a>
              <a href="https://blog.biocomputeinc.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple transition-colors" aria-label="Substack Blog">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-gray-500 text-sm">
              © Copyright 2026 BioCompute Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
