'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'How does DNA-based data storage work?',
    answer:
      'DNA-based data storage encodes digital data into DNA sequences using synthetic DNA synthesis. The data is represented in the form of A, T, G, and C nucleotides (the building blocks of DNA). These sequences are then synthesized and stored in stable forms. When you need the data back, the DNA is sequenced and the process is reversed to retrieve your original digital information. This method offers unprecedented storage density compared to traditional solutions.',
  },
  {
    id: 2,
    question: 'Is DNA data storage secure?',
    answer:
      'Yes, DNA data storage offers excellent security characteristics. The data is stored in physical DNA molecules that cannot be accessed without proper laboratory equipment and knowledge of the decoding process. Additionally, DNA sequences can be encrypted before storage for an extra layer of security. The stored DNA can also be kept in controlled environments (like vaults) to prevent unauthorized access.',
  },
  {
    id: 3,
    question: 'How long can data be stored in DNA?',
    answer:
      'DNA is one of the most stable storage mediums known. Under proper conditions, DNA can preserve data for thousands of years without degradation. Studies have shown that DNA molecules can maintain their integrity in cool, dry, and dark environments for extended periods. This makes DNA ideal for long-term archival of critical data.',
  },
  {
    id: 4,
    question: 'What types of data can be stored in DNA?',
    answer:
      'Any type of digital data can be stored in DNA - documents, images, videos, databases, software, or any other digital file. The data is converted into binary format and then encoded into DNA sequences. This makes it versatile for various use cases, from personal archives to enterprise-level data storage.',
  },
  {
    id: 5,
    question: 'How fast is data retrieval from DNA storage?',
    answer:
      'Data retrieval involves sequencing the stored DNA, which can take from hours to days depending on the amount of data and the sequencing technology used. While not as fast as traditional storage, this approach is ideal for archival and long-term backup purposes where access speed is less critical than durability and storage density.',
  },
  {
    id: 6,
    question: 'What are the cost implications of DNA storage?',
    answer:
      'Current DNA storage costs are higher than traditional storage per gigabyte for immediate access needs. However, when considering long-term storage over decades or centuries, the total cost of ownership becomes competitive. Additionally, DNA offers superior density, meaning more data in less physical space, which can offset costs in large-scale applications.',
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white text-dark">
      {/* FAQ Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-gray-600 text-lg">
            These are the questions that we get asked the most often about
            BioCompute.
            <br />
            Can't find what you are looking for?{' '}
            <Link href="/contact" className="text-purple font-bold hover:underline">
              Reach out to us!
            </Link>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-0 max-w-3xl mx-auto">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-300 last:border-b-0"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full py-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-bold text-dark">
                  {item.question}
                </h3>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 text-gray-600 transition-transform ${expandedId === item.id ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              {/* Answer - Accordion Content */}
              {expandedId === item.id && (
                <div className="pb-6 text-gray-700 leading-relaxed max-w-2xl">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
