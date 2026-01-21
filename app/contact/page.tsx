'use client';

import { FormEvent, useState } from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    category: 'Individual',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add form submission logic
  };

  return (
    <div className="pt-16">
      <section className="min-h-screen bg-dark flex items-center py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Text */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                GET IN TOUCH
              </h1>
              <p className="text-xl text-gray-300 mb-8">
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

              <div>
                <select
                  className="w-full bg-dark-secondary border border-gray-400 rounded px-4 py-3 text-white focus:outline-none focus:border-purple transition-colors appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option className="bg-dark text-white">Individual</option>
                  <option className="bg-dark text-white">Enterprise</option>
                </select>
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
      <section className="bg-dark-secondary py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            OR EMAIL US DIRECTLY
          </h2>
          <div className="flex items-center justify-center gap-2 text-xl text-gray-300 mb-8">
            <Mail size={24} />
            <a
              href="mailto:hello@biocomputeinc.com"
              className="hover:text-purple transition-colors"
            >
              hello@biocomputeinc.com
            </a>
          </div>
          <button className="border border-white text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-dark transition-colors">
            Email Us →
          </button>
        </div>
      </section>
    </div>
  );
}
