'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Heart, MessageCircle, Share2, Copy, Check } from 'lucide-react';
import { getBlogById, getSuggestedBlogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  const blog = getBlogById(parseInt(id));
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes || 0);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [comments, setComments] = useState(blog?.comments || []);
  const [copied, setCopied] = useState(false);

  if (!blog) {
    notFound();
  }

  const suggestedBlogs = getSuggestedBlogs(blog.id, 3);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentForm.name && commentForm.email && commentForm.comment) {
      const newComment = {
        id: comments.length + 1,
        name: commentForm.name,
        email: commentForm.email,
        comment: commentForm.comment,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
      setComments([...comments, newComment]);
      setCommentForm({ name: '', email: '', comment: '' });
      setShowCommentForm(false);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };

  return (
    <div className="bg-white text-dark">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-dark hover:text-purple transition-colors w-fit"
        >
          <ChevronLeft size={20} />
          Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{blog.subtitle}</p>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-6 border-y border-gray-200">
            <Image
              src={blog.author.profileImage}
              alt={blog.author.name}
              width={56}
              height={56}
              className="rounded-full"
            />
            <div>
              <p className="font-bold text-dark">{blog.author.name}</p>
              <p className="text-gray-600 text-sm">{blog.date}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Engagement Section */}
        <div className="border-y border-gray-200 py-6 mb-12 flex items-center gap-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-600 hover:text-purple transition-colors"
          >
            <Heart
              size={24}
              className={isLiked ? 'fill-purple text-purple' : ''}
            />
            <span className="font-bold">{likeCount}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center gap-2 text-gray-600 hover:text-purple transition-colors"
          >
            <MessageCircle size={24} />
            <span className="font-bold">{comments.length}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-600 hover:text-purple transition-colors ml-auto"
          >
            {copied ? (
              <>
                <Check size={24} className="text-green-500" />
                <span className="font-bold text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={24} />
                <span className="font-bold">Share</span>
              </>
            )}
          </button>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

          {/* Comment Form */}
          {showCommentForm && (
            <form
              onSubmit={handleCommentSubmit}
              className="bg-gray-50 rounded-lg p-6 mb-8"
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commentForm.name}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-3 text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={commentForm.email}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-3 text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple"
                  required
                />
                <textarea
                  placeholder="Your Comment"
                  value={commentForm.comment}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, comment: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-3 text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple resize-none h-24"
                  required
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-dark text-white px-6 py-3 rounded font-bold hover:bg-gray-900 transition-colors"
                  >
                    Post Comment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className="border border-gray-300 text-dark px-6 py-3 rounded font-bold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-dark">{comment.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{comment.date}</p>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No comments yet. Be the first to comment!</p>
              {!showCommentForm && (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="mt-4 text-purple font-bold hover:underline"
                >
                  Add a comment
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Suggested Blogs Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-12">Suggested Blogs</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {suggestedBlogs.map((suggestedBlog) => (
              <Link
                key={suggestedBlog.id}
                href={`/blogs/${suggestedBlog.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                    <Image
                      src={suggestedBlog.image}
                      alt={suggestedBlog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-3">
                      {suggestedBlog.date}
                    </p>
                    <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2 group-hover:text-purple transition-colors">
                      {suggestedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {suggestedBlog.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
