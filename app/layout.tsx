import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DNABackground from '@/components/DNABackground';

export const metadata: Metadata = {
  title: 'BioCompute Inc. - DNA-Based Data Storage',
  description: 'The Future of Data Storage is DNA',
  icons: {
    icon: '/logoSM.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">
        <DNABackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
