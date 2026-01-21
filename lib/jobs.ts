export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  howToApply: string;
}

export const jobOpenings: Job[] = [
  {
    id: 1,
    title: 'Lead Bioengineer',
    location: 'Bengaluru, KA, IN',
    type: 'Full-Time',
    description:
      'We are looking for a Lead Bioengineer to join our innovative team working on DNA-based data storage solutions. You will lead the design and development of cutting-edge bioengineering systems that will revolutionize how data is stored and accessed.',
    requirements:
      'PhD in Bioengineering, Molecular Biology, or related field with 5+ years of industry experience. Strong background in DNA synthesis, sequencing, and molecular biology. Experience with high-throughput systems. Excellent problem-solving skills and ability to work in a collaborative environment.',
    howToApply:
      'To apply for this position, please submit your resume, cover letter, and a portfolio of your previous projects to careers@biocomputeinc.com. Include specific examples of how your work has contributed to scientific innovation.',
  },
  {
    id: 2,
    title: 'Lead Bioengineer',
    location: 'Bengaluru, KA, IN',
    type: 'Full-Time',
    description:
      'Join our engineering team to build the infrastructure that powers the future of data storage. This role focuses on implementing scalable solutions for DNA-based data systems.',
    requirements:
      'BS/MS in Bioengineering or related field with 3+ years of experience. Knowledge of DNA biology and data storage principles. Proficiency in laboratory protocols and equipment. Team player with strong communication skills.',
    howToApply:
      'Apply through our careers portal or email careers@biocomputeinc.com with your resume and a cover letter explaining your interest in DNA-based data storage.',
  },
  {
    id: 3,
    title: 'Lead Bioengineer',
    location: 'Bengaluru, KA, IN',
    type: 'Full-Time',
    description:
      'We are hiring a Lead Bioengineer to oversee quality assurance and testing of our DNA storage systems. Ensure our products meet the highest standards of reliability and performance.',
    requirements:
      'BS in Biology, Chemistry, or Bioengineering with 4+ years of QA/testing experience. Experience with DNA sequencing validation. Knowledge of regulatory requirements for biotech products. Detail-oriented and process-driven.',
    howToApply:
      'Send your application to careers@biocomputeinc.com with your resume, certifications, and references from previous positions.',
  },
];

export function getJobById(id: number): Job | undefined {
  return jobOpenings.find((job) => job.id === id);
}
