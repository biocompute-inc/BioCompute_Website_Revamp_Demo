export interface Blog {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    profileImage: string;
  };
  date: string;
  image: string;
  likes: number;
  comments: Array<{
    id: number;
    name: string;
    email: string;
    comment: string;
    date: string;
  }>;
  category?: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: 'The Future of Data Storage: Why DNA is the Answer',
    subtitle: 'Exploring how DNA-based storage could revolutionize the way we preserve information',
    content: `DNA storage technology has emerged as one of the most promising solutions for long-term data archival. Unlike traditional storage methods that degrade over time, DNA can preserve information for thousands of years under proper conditions.

The process begins with encoding digital data into DNA sequences. Every digital bit is converted into nucleotides (A, T, G, C), which are then synthesized into actual DNA molecules. This remarkable approach offers unprecedented storage density – theoretically, all of human knowledge could be stored in a volume no larger than a sugar cube.

One of the key advantages of DNA storage is its stability. While hard drives can fail within a decade and tape storage degrades over 30 years, DNA in controlled conditions remains stable for millennia. This makes it ideal for archival purposes, from government records to scientific data.

The technology is still in its early stages, with costs being higher than traditional storage. However, as the technology matures and production scales up, we expect to see significant cost reductions. Several institutions, including Microsoft and the Internet Archive, are already investing heavily in DNA storage research.

The implications are staggering. Imagine being able to preserve humanity's digital heritage indefinitely, protected from data corruption and technological obsolescence. This is the promise of DNA storage.`,
    author: {
      name: 'Dr. Sarah Chen',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    },
    date: '21 January 2024',
    image: 'https://images.unsplash.com/photo-1576075798498-5778b0f89f0f?w=800&h=400&fit=crop',
    likes: 342,
    comments: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        comment: 'Fascinating technology! Really looking forward to seeing how this evolves.',
        date: '22 January 2024',
      },
    ],
  },
  {
    id: 2,
    title: 'DNA Synthesis Breakthroughs in 2024',
    subtitle: 'Latest advances in DNA synthesis technology making storage more accessible',
    content: `The past year has seen remarkable breakthroughs in DNA synthesis technology. New enzymatic approaches have significantly reduced both the time and cost of synthesizing DNA, bringing the technology closer to mainstream adoption.

One major breakthrough involves the development of more efficient DNA polymerases, which are enzymes that synthesize DNA strands. These new variants can work at higher temperatures and with greater fidelity, reducing errors and increasing throughput.

Another significant advancement is in parallel synthesis techniques. Researchers have developed methods to synthesize millions of DNA sequences simultaneously, dramatically increasing production capacity. This scalability is crucial for commercial viability.

Cost reduction has been exponential over the past decade. In 2000, synthesizing a base pair cost about $200. By 2024, this has dropped to less than $0.01. This trend is expected to continue, making DNA storage competitive with traditional methods within the next 5-10 years.

These breakthroughs are enabling new applications beyond data storage, including molecular computing and biological engineering. The future of DNA technology is more exciting than ever.`,
    author: {
      name: 'Prof. Michael Johnson',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    },
    date: '15 January 2024',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    likes: 289,
    comments: [
      {
        id: 1,
        name: 'Emma Wilson',
        email: 'emma@example.com',
        comment: 'Great overview of the recent developments!',
        date: '16 January 2024',
      },
    ],
  },
  {
    id: 3,
    title: 'Understanding DNA Error Correction',
    subtitle: 'How to ensure data integrity in DNA storage systems',
    content: `One of the critical challenges in DNA storage is maintaining data integrity over long periods. Unlike digital storage where data remains unchanged indefinitely, DNA can accumulate mutations over time through chemical degradation.

Error correction codes are essential for reliable DNA storage. These work similarly to error correction in traditional digital systems, adding redundant information that allows the original data to be recovered even if some bases are corrupted.

The most common approach uses fountain codes, which create multiple overlapping copies of the data. This redundancy ensures that even if significant portions of the DNA are damaged, the original information can still be reconstructed.

Another emerging approach is the use of parity-check codes specifically designed for DNA storage. These codes are optimized to correct the types of errors most likely to occur in DNA, such as insertions, deletions, and substitutions.

Recent research has shown that with proper error correction, DNA storage can achieve reliability exceeding 99.9999% even after storage for hundreds of years. This level of reliability makes DNA an incredibly robust storage medium.

As the field matures, we expect to see increasingly sophisticated error correction schemes that optimize the balance between redundancy, recovery speed, and storage efficiency.`,
    author: {
      name: 'Dr. James Liu',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    },
    date: '8 January 2024',
    image: 'https://images.unsplash.com/photo-1578042212220-20d8e0e32c39?w=800&h=400&fit=crop',
    likes: 215,
    comments: [],
  },
  {
    id: 4,
    title: 'Industrial Applications of DNA Storage',
    subtitle: 'How companies are beginning to implement DNA storage solutions',
    content: `DNA storage is transitioning from academic research to industrial implementation. Several companies and institutions are now piloting DNA storage systems for real-world applications.

One of the most prominent examples is the Internet Archive, which is using DNA storage to preserve digital cultural heritage. They have successfully encoded and stored significant portions of their collection in DNA, creating a backup that could outlast any conventional storage medium.

Microsoft has been actively researching DNA storage and has demonstrated the ability to encode and retrieve data from synthetic DNA. Their project has shown the feasibility of storing and retrieving multi-megabyte files, proving the technology is ready for practical applications.

Genetic databases and biobanks are another area where DNA storage is proving valuable. Organizations managing vast amounts of genetic data are exploring DNA storage as a long-term solution, creating an elegant solution where the storage medium and the data are fundamentally the same.

In healthcare, DNA storage could revolutionize how medical institutions archive patient records and research data. The longevity of DNA storage means that critical medical information could be preserved for centuries, protecting against data loss and ensuring long-term availability.

The standardization of DNA storage formats and protocols is underway, which will accelerate adoption across industries. We expect to see widespread commercial availability within the next 3-5 years.`,
    author: {
      name: 'Dr. Patricia Brown',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patricia',
    },
    date: '1 January 2024',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
    likes: 456,
    comments: [
      {
        id: 1,
        name: 'Robert Davis',
        email: 'robert@example.com',
        comment: 'Exciting to see real-world applications emerging!',
        date: '2 January 2024',
      },
    ],
  },
  {
    id: 5,
    title: 'The Economics of DNA Storage',
    subtitle: 'Cost analysis and economic viability of DNA-based storage',
    content: `Understanding the economics of DNA storage is crucial for determining when and where it will become viable. While costs have dropped dramatically, they are still higher than conventional storage for immediate access needs.

Current estimates put DNA storage at around $10,000 per terabyte for small quantities. For comparison, cloud storage costs around $0.023 per gigabyte per month. However, this changes when considering long-term storage over decades.

For a file stored for 100 years, the total cost of ownership for DNA storage becomes competitive. A terabyte stored in DNA for a century costs significantly less than the cumulative cost of refreshing cloud storage or replacing hard drives multiple times.

The cost trajectory is also favorable. DNA synthesis costs have been dropping exponentially, with a decline of approximately 25% per year. At this rate, DNA storage could achieve cost parity with cloud storage within the next decade.

Economies of scale will significantly impact costs. As production ramps up, bulk synthesis becomes more efficient, pushing prices down further. Major investments from tech companies and governments are accelerating this process.

Industries with high requirements for long-term storage – such as archives, libraries, government agencies, and healthcare – stand to benefit most immediately from DNA storage adoption. For these use cases, the economics already favor DNA storage.`,
    author: {
      name: 'Dr. Alan Martinez',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alan',
    },
    date: '25 December 2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    likes: 178,
    comments: [],
  },
];

export function getBlogById(id: number): Blog | undefined {
  return blogs.find((blog) => blog.id === id);
}

export function getSuggestedBlogs(currentBlogId: number, limit: number = 3): Blog[] {
  return blogs
    .filter((blog) => blog.id !== currentBlogId)
    .slice(0, limit);
}
