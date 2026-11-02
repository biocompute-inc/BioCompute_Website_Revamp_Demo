import type { Metadata } from 'next';

const TITLE = 'BioCompute Inc. | Idea to lab data. In record time.';
const DESCRIPTION =
    'You or your AI agent bring the experiment. We run it on our custom hardware. You get the data.';
const OG_IMAGE =
    'https://github.com/biocompute-inc/BioCompute_Website_Revamp_Demo/releases/download/assets-2026-11-01/og-home.jpg';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: 'https://www.biocomputeinc.com/',
        siteName: 'BioCompute Inc.',
        type: 'website',
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'BioCompute - Idea to lab data. In record time.',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [OG_IMAGE],
    },
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
