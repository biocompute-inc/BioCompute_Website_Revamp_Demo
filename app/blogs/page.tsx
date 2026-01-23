import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSubstackBlogs } from '@/lib/blogs';

// ISR revalidation every 600 seconds (10 minutes)
export const revalidate = 600;

export default async function BlogsPage() {
  const blogs = await getSubstackBlogs();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12">
          <p className="text-2xl font-medium uppercase tracking-widest text-gray-600 mb-2">
            BLOGS
          </p>
          <h1 className="text-base md:text-4xl font-bold text-dark">
            Insights & Updates
          </h1>
          <p className="mt-4 text-gray-600">
            Stay updated with our latest thoughts and research from Substack
          </p>
        </div>

        {/* Blog Grid with Layout Guardrails */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
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
