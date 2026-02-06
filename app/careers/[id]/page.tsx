'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import ApplyModal from './ApplyModal';
import { useEffect, useState } from 'react';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  howToApply: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://biocompute-cms.onrender.com/api/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Job not found');
        return res.json();
      })
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching job:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white text-dark min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    notFound();
  }

  return (
    <div className="bg-white text-dark">
      {/* Job Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Back Button */}
        <Link
          href="/careers"
          className="flex items-center gap-2 text-dark hover:text-purple transition-colors mb-8 w-fit"
        >
          <ChevronLeft size={20} />
          Back
        </Link>

        {/* Job Title Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{job.title}</h1>
          <p className="text-gray-600 text-lg font-medium">
            {job.location} | {job.type}
          </p>
        </div>

        {/* Job Sections */}
        <div className="space-y-12 mb-16">
          {/* Job Description */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Who Are We Looking For?</h2>
            <p className="text-gray-700 leading-relaxed">{job.requirements}</p>
          </section>

          {/* How to Apply */}
          <section>
            <h2 className="text-2xl font-bold mb-4">How To Apply?</h2>
            <p className="text-gray-700 leading-relaxed">{job.howToApply}</p>
          </section>
        </div>

        {/* Apply Button and Modal */}
        <ApplyModal jobId={job.id} jobTitle={job.title} />
      </div>
    </div>
  );
}
