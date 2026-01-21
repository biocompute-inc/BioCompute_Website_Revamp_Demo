"use client";
import Image from "next/image";

export default function About() {
    const team = [
        {
            avatar: "/Anaghaupdated.jpeg",
            name: "Anagha Rajesh",
            title: "Founder"
        },
        {
            avatar: "/Akansha.jpg",
            name: "Akanksha Dasmohapatra",
            title: "Chief Product Officer"
        },
        {
            avatar: "/Naveen.png",
            name: "Naveen",
            title: "Electronics Engineer"
        },
        {
            avatar: "/SaiPooja.jpg",
            name: "Sai Pooja",
            title: "Bio-Engineer"
        },
    ]

    return (
        <div className="relative min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 pb-0 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Foreground Content */}
                <div className="relative z-10 max-w-7xl mx-auto text-center backdrop-blur-xl bg-black/30 rounded-3xl p-12">
                    <h1 className="text-6xl sm:text-5xl lg:text-7xl font-bold text-white">
                        WELCOME TO THE STRAND AGE
                    </h1>
                </div>
            </section>

            {/* Vision and Offer Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/80 rounded-3xl p-8 sm:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Our Vision */}
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Our Vision
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We envision a future where biotechnology seamlessly integrates with computational innovation,
                                enabling groundbreaking solutions to the world&apos;s most pressing challenges. Our mission is to
                                pioneer technologies that bridge the gap between biological systems and computational power,
                                creating tools that empower researchers, healthcare professionals, and innovators worldwide.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                At the core of our vision lies a commitment to democratizing access to cutting-edge biocomputing
                                technologies, making them accessible, affordable, and impactful for communities across the globe.
                            </p>
                        </div>

                        {/* What We Offer */}
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                What We Offer
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Our portfolio spans innovative biocomputing solutions designed to accelerate research and development.
                                We provide state-of-the-art platforms that combine biological data processing with advanced
                                computational algorithms, enabling real-time analysis and insights.
                            </p>
                            <ul className="text-lg text-gray-700 leading-relaxed space-y-3">
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Advanced DNA computing platforms for complex problem-solving</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Integrated biotech and computational research tools</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Collaborative platforms for interdisciplinary innovation</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple font-bold mr-2">•</span>
                                    <span>Educational resources and training programs</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-xl mx-auto backdrop-blur-xl bg-gray-50/90 rounded-3xl p-8 sm:p-12">
                    <div className="max-w-xl mx-auto text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            OUR TEAM
                        </h2>
                        <p className="text-lg text-gray-600">
                            Working together to make a difference
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl">
                            {
                                team.map((item, idx) => (
                                    <li key={idx} className="flex flex-col items-center">
                                        <div className="w-full h-60 sm:h-56">
                                            <Image
                                                src={item.avatar}
                                                width={215}
                                                height={240}
                                                className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h4 className="text-lg text-gray-800 font-semibold">{item.name}</h4>
                                            <p className="text-gray-600">{item.title}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}