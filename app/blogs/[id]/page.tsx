import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { getSubstackBlogBySlug, getSubstackBlogs, getAllBlogSlugs } from '@/lib/blogs';
import { notFound } from 'next/navigation';

// ISR revalidation every 600 seconds (10 minutes)
export const revalidate = 600;

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    id: slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = await getSubstackBlogBySlug(id);

  if (!blog) {
    notFound();
  }

  // Get other recent blogs for suggestions
  const allBlogs = await getSubstackBlogs();
  const suggestedBlogs = allBlogs
    .filter(b => b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with Featured Image */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900">
        <Image
          src={blog.image || 'https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=1600&h=900&fit=crop'}
          alt={blog.title}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <Link
          href="/blogs"
          className="absolute top-8 left-4 md:left-8 flex items-center gap-2 text-white hover:text-gray-200 transition-colors bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Blogs</span>
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple/30 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {blog.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{blog.author}</span>
              </div>
              <span>•</span>
              <span>
                {new Date(blog.pubDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content with Prose Styling */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12">
          <div
            className="prose prose-lg prose-gray max-w-none
              prose-headings:text-dark prose-headings:font-bold
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-purple prose-a:no-underline hover:prose-a:underline
              prose-strong:text-dark prose-strong:font-semibold
              prose-code:text-purple prose-code:bg-purple/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-blockquote:border-l-4 prose-blockquote:border-purple prose-blockquote:pl-4 prose-blockquote:italic
              prose-img:rounded-lg prose-img:shadow-lg
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Original Post Link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple hover:text-purple/80 font-semibold transition-colors"
            >
              Read original post on Substack →
            </a>
          </div>
        </article>
      </div>

      {/* Suggested Blogs Section */}
      {suggestedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-dark mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {suggestedBlogs.map((suggestedBlog) => (
                <Link
                  key={suggestedBlog.slug}
                  href={`/blogs/${suggestedBlog.slug}`}
                  className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <Image
                      src={suggestedBlog.image || 'https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=800&h=450&fit=crop'}
                      alt={suggestedBlog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">
                      {suggestedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {suggestedBlog.excerpt}
                    </p>
                    <div className="mt-4 text-purple font-semibold text-sm">
                      Read More →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
