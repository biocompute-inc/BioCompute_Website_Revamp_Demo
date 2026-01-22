'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs } from '@/lib/blogs';

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
          <div>
            <p className="text-2xl font-medium uppercase tracking-widest text-gray-600 mb-2">
              BLOGS
            </p>
            <h1 className="text-base md:text-4xl font-bold text-dark">
              Insights & Updates
            </h1>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-64 relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full bg-gray-200 rounded px-4 py-3 text-dark placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple"
            />
            <Search
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                {/* Blog Image */}
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-3">{blog.date}</p>
                  <h3 className="text-lg font-bold text-dark mb-2 line-clamp-3 group-hover:text-purple transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {blog.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border border-gray-300 bg-white px-4 py-2 rounded text-dark disabled:text-gray-300 disabled:border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded text-sm font-bold transition-colors ${currentPage === page
                  ? 'bg-dark text-white'
                  : 'border border-gray-300 bg-white text-dark hover:bg-gray-100'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border border-gray-300 bg-white px-4 py-2 rounded text-dark disabled:text-gray-300 disabled:border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* No Results */}
        {currentBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No blogs found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
