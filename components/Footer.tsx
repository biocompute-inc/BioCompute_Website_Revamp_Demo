'use client';

import Link from 'next/link';
import { Mail, MapPin, Linkedin, Github, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-purple transition-colors">
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
                <Link href="/faq" className="text-gray-400 hover:text-purple transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-400 hover:text-purple transition-colors">
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
            <button className="border border-white px-4 py-2 rounded text-sm hover:bg-white hover:text-dark transition-colors mb-4 block">
              Contact Form
            </button>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={18} />
                <a href="mailto:hello@biocomputeinc.com" className="hover:text-purple transition-colors">
                  hello@biocomputeinc.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © Copyright 2026 BioCompute Inc.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Share2 size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
