import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BioCompute Inc. - DNA-Based Data Storage',
  description: 'The Future of Data Storage is DNA',
  icons: {
    icon: '/faviconfinal.png',
    shortcut: '/faviconfinal.png',
    apple: '/faviconfinal.png',
  },
  verification: {
    google: 'Uax0mjW4qGOXzwc51e-p5w5ZL9o9J2Ox-ZHVbA_xIn0',
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
        <main>{children}</main>
      </body>
    </html>
  );
}
