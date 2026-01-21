import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DNAHelix from '@/client/components/ui/dnahelix';
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
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <DNAHelix
            linesGradient={["#9333ea", "#a855f7", "#c084fc", "#7c3aed", "#6366f1", "#4f46e5", "#3b82f6", "#2563eb", "#1d4ed8"]}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[1, 1, 1]}
            lineDistance={[0.2, 0.15, 0.18]}
            topWavePosition={{ x: 8.5, y: 0, rotate: -0.9 }}
            middleWavePosition={{ x: 7.0, y: 0.1, rotate: 0.1 }}
            bottomWavePosition={{ x: 8.0, y: -1, rotate: 0.8 }}
            animationSpeed={0.2}
            bendStrength={0.8}
            opacity={0.6}
          />
        </div>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
