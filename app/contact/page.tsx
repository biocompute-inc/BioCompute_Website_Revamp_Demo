'use client';

import { FormEvent, useState, useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    message: '',
    category: '',
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setFormData({ ...formData, message: textarea.value });

    // Reset height to recalculate
    textarea.style.height = '0px';
    const scrollHeight = textarea.scrollHeight;

    // Set new height with min/max constraints
    const newHeight = Math.max(40, Math.min(scrollHeight, 400));
    textarea.style.height = `${newHeight}px`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add form submission logic
  };

  return (
    <div className="pt-0">
      <section className="min-h-screen bg-dark flex items-center py-4">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                GET IN TOUCH
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6">
                Have questions? Need to figure out how DNA can help you with
                your data storage requirements? We are here to help!
              </p>
            </div>

            {/* Right Side - Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-gray-400 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple transition-colors"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-gray-400 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple transition-colors"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  type="url"
                  placeholder="LinkedIn Profile"
                  className="w-full bg-transparent border-b border-gray-400 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple transition-colors"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <select
                  className="w-full bg-dark-secondary border border-gray-400 rounded px-4 py-3 pr-10 text-white focus:outline-none focus:border-purple transition-colors appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="" disabled className="bg-dark text-gray-400">Select Category</option>
                  <option className="bg-dark text-white">Individual</option>
                  <option className="bg-dark text-white">Enterprise</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div>
                <textarea
                  ref={textareaRef}
                  placeholder="Your Message"
                  className="w-full bg-transparent border-b border-gray-400 pb-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple transition-colors resize-none overflow-hidden"
                  style={{ height: '40px' }}
                  value={formData.message}
                  onChange={handleTextareaChange}
                />
              </div>



              <button
                type="submit"
                className="w-full bg-white text-dark font-bold py-3 rounded hover:bg-gray-200 transition-colors mt-8"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Or Email Directly Section */}
      <section className="bg-white text-black py-12 sm:py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            OR EMAIL US DIRECTLY
          </h2>
          <div className="flex items-center  justify-center gap-2 text-base sm:text-lg md:text-xl text-black mb-6 sm:mb-8">
            <Mail size={24} />
            <a
              href="mailto:hello@biocomputeinc.com"
              className="hover:text-purple transition-colors"
            >
              hello@biocomputeinc.com
            </a>
          </div>
          <button className="border border-black text-black px-8 py-3 rounded font-bold hover:bg-black hover:text-white transition-colors">
            <a href="mailto:hello@biocomputeinc.com">Email Us →</a>
          </button>
        </div>
      </section>
    </div>
  );
}
