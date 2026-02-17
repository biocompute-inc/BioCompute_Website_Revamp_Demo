"use client";

import LogoLoop from '@/client/components/ui/logoloop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiDocker, SiKubernetes } from 'react-icons/si';

const techLogos = [
    { node: <SiReact className="text-6xl text-blue-500" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="text-6xl text-gray-900" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="text-6xl text-blue-600" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="text-6xl text-cyan-500" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs className="text-6xl text-green-600" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython className="text-6xl text-blue-500" />, title: "Python", href: "https://python.org" },
    { node: <SiDocker className="text-6xl text-blue-600" />, title: "Docker", href: "https://docker.com" },
    { node: <SiKubernetes className="text-6xl text-blue-700" />, title: "Kubernetes", href: "https://kubernetes.io" },
];

export default function TestingPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">LogoLoop Component Test</h1>

                {/* Debug: Show icons directly first */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-800">Raw Icons (Debug)</h2>
                    <div className="flex gap-8 p-4 bg-white border rounded-lg">
                        <SiReact className="text-6xl text-blue-500" />
                        <SiNextdotjs className="text-6xl text-gray-900" />
                        <SiTypescript className="text-6xl text-blue-600" />
                        <SiTailwindcss className="text-6xl text-cyan-500" />
                    </div>
                </div>

                {/* Horizontal loop going left */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-800">Horizontal Loop (Left) - Speed 100</h2>
                    <div className="h-32 w-full border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
                        <LogoLoop
                            logos={techLogos}
                            speed={100}
                            direction="left"
                            logoHeight={60}
                            gap={60}
                            hoverSpeed={20}
                            scaleOnHover
                            pauseOnHover
                            ariaLabel="Technology partners"
                        />
                    </div>
                </div>

                {/* Horizontal loop going right */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-800">Horizontal Loop (Right) - Speed 150</h2>
                    <div className="h-32 w-full border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
                        <LogoLoop
                            logos={techLogos}
                            speed={150}
                            direction="right"
                            logoHeight={60}
                            gap={60}
                            pauseOnHover
                        />
                    </div>
                </div>

                {/* Fast loop */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-800">Fast Loop - Speed 200</h2>
                    <div className="h-32 w-full border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
                        <LogoLoop
                            logos={techLogos}
                            speed={200}
                            direction="left"
                            logoHeight={60}
                            gap={60}
                            fadeOut
                            ariaLabel="Technology partners"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}