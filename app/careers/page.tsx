'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDollarSign } from 'react-icons/fa';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetch('https://biocompute-cms.onrender.com/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const currentJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-dark py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl mt-3 font-medium uppercase tracking-widest text-white mb-2">
                CAREERS
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                Come build a world where <br />an exabyte of data costs $1
              </h1>
              <a
                href="#open-roles"
                className="bg-white text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded font-bold hover:bg-gray-600 hover:text-white transition-colors inline-flex items-center gap-2 w-fit text-sm sm:text-base"
              >
                Open Roles
                <span>↓</span>
              </a>
            </div>

            {/* DNA Image Placeholder */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="/dnacareers.png"
                alt="DNA Careers"
                width={400}
                height={400}
                className="object-contain w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="bg-white text-dark py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
            WHY JOIN US?
          </h2>

          {/* Benefit Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Card 1 - Compensation */}
            <div className="bg-fuchsia-50 rounded-2xl p-8 text-center flex flex-col items-center border border-fuchsia-200">
              <div className="mb-6">
                <FaDollarSign className="w-16 h-16" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Generous Compensation & ESOPs
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                We offer generous pay packages because we believe exceptional work should be rewarded accordingly.
              </p>
            </div>

            {/* Card 2 - Autonomy */}
            <div className="bg-fuchsia-50 rounded-2xl p-8 text-center flex flex-col items-center border border-fuchsia-200">
              <div className="mb-6">
                <div className="w-16 h-16">
                  <Image src="/autonomy.svg" alt="Autonomy" width={64} height={64} className="w-full h-full" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Real Autonomy
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                You will have the intellectual and creative freedom to do your best work owning problems end to end, not just executing tasks.
              </p>
            </div>

            {/* Card 3 - Build across disciplines */}
            <div className="bg-fuchsia-50 rounded-2xl p-8 text-center flex flex-col items-center border border-fuchsia-200">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide  w-16 h-16 lucide-handshake-icon lucide-handshake"><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Build Across Disciplines
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                You'll work closely with scientists, engineers, and operators from different backgrounds, and pick up skills outside your core domain.
              </p>
            </div>
          </div >

          {/* Job Listings */}
          < div id="open-roles" className="scroll-mt-20 mb-10" >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Open Roles</h3>

            {
              loading ? (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-fuchsia-600 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-gray-600 font-medium">Loading job openings...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No open positions at the moment.</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
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
                            <td className="py-4 px-4 text-gray-600">{job.type.replace(/\b\w/g, l => l.toUpperCase())}</td>
                            <td className="py-4 px-4 text-right">
                              <Link
                                href={`/careers/${job.id}`}
                                className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-white transition-all duration-100 border-black border hover:text-black inline-block"
                              >
                                Apply
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {currentJobs.map((job) => (
                      <div
                        key={job.id}
                        className="border border-gray-300 rounded-lg p-4 hover:border-purple transition-colors"
                      >
                        <h3 className="text-lg font-bold text-dark mb-2">
                          <Link
                            href={`/careers/${job.id}`}
                            className="hover:text-purple transition-colors"
                          >
                            {job.title}
                          </Link>
                        </h3>
                        <div className="space-y-1 mb-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Location:</span> {job.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Type:</span> {job.type.replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                        </div>
                        <Link
                          href={`/careers/${job.id}`}
                          className="bg-black text-white px-4 py-2 rounded font-bold hover:bg-white transition-all duration-100 border-black border hover:text-black inline-block w-full text-center"
                        >
                          Apply
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-start gap-2 mt-6 sm:mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border border-gray-300 px-2 sm:px-4 py-2 rounded text-dark disabled:text-gray-300 disabled:border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded text-xs sm:text-sm font-bold transition-colors ${currentPage === page
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
                      className="border border-gray-300 px-2 sm:px-4 py-2 rounded text-dark disabled:text-gray-300 disabled:border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              )
            }
          </div >


          {/* Our Values Section */}
          < div className="bg-gradient-to-br from-fuchsia-50 via-white to-fuchsia-50 rounded-3xl p-8 sm:p-12 md:p-16 mb-20 shadow-lg border border-fuchsia-200" >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-black">
                Our Values
              </h2>
              <div className="w-20 h-1 bg-fuchsia-200 mx-auto mb-12 rounded-full"></div>

              <div className="space-y-8">
                {/* Value 1 */}
                <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                        Dream Crazy Big — Then Make It Real
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        We believe the biggest problems deserve the boldest thinking. Dream audaciously, commit deeply, and turn ambitious ideas into reality.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Value 2 */}
                <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                        Take Ownership. Figure Things Out.
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        This is everyone's company. We take responsibility from idea to outcome, proactively attack problems, and don't wait for perfect instructions. When the path isn't obvious, we figure it out.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Value 3 */}
                <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                        Stay Curious
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        Curiosity fuels breakthroughs. Ask questions, challenge assumptions, and encourage others to do the same. The best ideas often start with "Why?"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Value 4 */}
                <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                        Practice Candor
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        We value honesty, clarity, and respect. Communicate openly about ideas, challenges, and solutions—and always speak directly to the people involved.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Value 5 */}
                <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                        Be Kind
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        Brilliance doesn't require ego. We treat each other with empathy, respect, and generosity especially when things get hard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Value 6 */}
                <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                        Embrace the Intersection
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        We bring together disciplines, perspectives, and expertise that don't usually overlap. We collaborate by default and don't build silos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Value 7 */}
                <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      7
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                        Have Fun
                      </h3>
                      <p className="text-gray-800 leading-relaxed">
                        We're building something extraordinary, and we enjoy the ride. Celebrate wins, embrace the chaos, and don't forget to laugh along the way.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </section >
    </div >
  );
}
