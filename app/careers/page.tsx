'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { jobOpenings } from '@/lib/jobs';

export default function Careers() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(jobOpenings.length / itemsPerPage);

  const currentJobs = jobOpenings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-dark py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                CAREERS
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Join the company with a
                <br />
                bold new vision
              </h1>
              <button className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-dark-secondary transition-colors flex items-center gap-2">
                Open Roles
                <span>↓</span>
              </button>
            </div>

            {/* DNA Image Placeholder */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="/dnacareers.png"
                alt="DNA Careers"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="bg-white text-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            WHY JOIN US?
          </h2>

          {/* Benefit Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-200 rounded-lg h-48" />
            ))}
          </div>

          {/* Job Listings */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Open Roles</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-bold text-gray-600 uppercase text-sm">
                      ROLE
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-600 uppercase text-sm">
                      LOCATION
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-600 uppercase text-sm">
                      TYPE
                    </th>
                    <th className="text-right py-4 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {currentJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-dark font-medium">
                        <Link
                          href={`/careers/${job.id}`}
                          className="hover:text-purple transition-colors cursor-pointer"
                        >
                          {job.title}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{job.location}</td>
                      <td className="py-4 px-4 text-gray-600">{job.type}</td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/careers/${job.id}`}
                          className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-900 transition-colors inline-block"
                        >
                          Apply
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-start gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border border-gray-300 px-4 py-2 rounded text-dark disabled:text-gray-300 disabled:border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded text-sm font-bold transition-colors ${currentPage === page
                      ? 'bg-black text-white'
                      : 'border border-gray-300 text-dark hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="border border-gray-300 px-4 py-2 rounded text-dark disabled:text-gray-300 disabled:border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
