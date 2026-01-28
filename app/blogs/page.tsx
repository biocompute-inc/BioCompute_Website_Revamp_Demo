'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);

  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Header - Full Width */}
      <div className="bg-white  p-8 md:p-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-2xl mt-3 font-medium uppercase tracking-widest text-gray-600 mb-2">
                BLOGS
              </p>
              <h1 className="text-base md:text-4xl font-bold text-dark">
                Insights & Updates
              </h1>
            </div>

            {/* Search Bar (right side on md+) */}
            <div className="w-full md:w-1/3">
              <div className="relative bg-gray-100 rounded-md px-3 mt-8 py-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid with Layout Guardrails */}
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Skeleton */}
            <div className="mb-12">
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Blog Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  {/* Image Skeleton */}
                  <div className="aspect-video w-full bg-gray-200 animate-pulse" />

                  <div className="p-6">
                    {/* Author Skeleton */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1" />
                        <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
                      </div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-3" />

                    {/* Excerpt Skeleton */}
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery ? `No blogs found matching "${searchQuery}"` : 'No blog posts available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group block border-black border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

                {/* Fixed Aspect Ratio Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={blog.image || 'https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=800&h=450&fit=crop'}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  {/* Author and Date */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center">
                      <span className="text-purple text-xs font-semibold">
                        {blog.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{blog.author}</p>
                      <p className="text-xs">
                        {new Date(blog.pubDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Title with 2-line clamp */}
                  <h2 className="text-xl font-bold text-dark mb-2 line-clamp-2 min-h-[3.5rem]">
                    {blog.title}
                  </h2>

                  {/* Excerpt with 3-line clamp */}
                  <p className="text-gray-600 text-sm line-clamp-3 min-h-[4.5rem]">
                    {blog.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-4 text-purple font-semibold text-sm group-hover:text-purple/80 transition-colors">
                    Read More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
