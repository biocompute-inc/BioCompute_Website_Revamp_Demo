import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DNABackground from '@/components/DNABackground';
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'BioCompute Inc. - DNA-Based Data Storage',
  description: 'The Future of Data Storage is DNA',
  icons: {
    icon: '/logoSM.png',
  },
};
const inter = Inter({
  subsets: ['latin'],
  // Optional: Define CSS variable to use in Tailwind
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-dark text-white ${inter.variable}`}>
        {/* DNA Helix persists across all pages */}
        <DNABackground />

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
