import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getJobById, jobOpenings } from '@/lib/jobs';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return jobOpenings.map((job) => ({
    id: job.id.toString(),
  }));
}

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const job = getJobById(parseInt(params.id));
  if (!job) return { title: 'Job Not Found' };
  return {
    title: `${job.title} - BioCompute Inc.`,
    description: `Join our team as a ${job.title} in ${job.location}`,
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = getJobById(parseInt(params.id));

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

        {/* Apply Button */}
        <button className="bg-black text-white px-8 py-4 rounded font-bold hover:bg-gray-900 transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}
