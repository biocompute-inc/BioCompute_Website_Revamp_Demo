export default function HomeLoading() {
    return (
        <div className="min-h-screen bg-black">
            {/* Hero — full screen dark */}
            <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* Title skeleton */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    <div className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-64 sm:w-80 md:w-96 lg:w-[28rem] bg-white/10 animate-pulse rounded-xl" />
                    <div className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-36 sm:w-48 md:w-64 lg:w-72 bg-purple-500/20 animate-pulse rounded-xl" />
                </div>

                {/* Device image skeleton — centred, sized to match the real image */}
                <div
                    className="bg-white/5 animate-pulse rounded-3xl"
                    style={{ width: 'clamp(180px, 30vw, 480px)', aspectRatio: '0.6' }}
                />
            </section>

            {/* Features Section — white bg */}
            <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-row items-center justify-around gap-8">
                    {/* Left: heading skeleton */}
                    <div className="flex flex-col gap-3">
                        <div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
                        <div className="h-8 sm:h-10 md:h-12 w-56 sm:w-72 md:w-80 bg-gray-200 animate-pulse rounded" />
                        <div className="h-8 sm:h-10 md:h-12 w-48 sm:w-64 md:w-72 bg-gray-200 animate-pulse rounded" />
                        <div className="h-8 sm:h-10 md:h-12 w-40 sm:w-56 md:w-64 bg-gray-200 animate-pulse rounded" />
                    </div>

                    {/* Right: button skeletons */}
                    <div className="flex flex-col gap-4">
                        <div className="h-12 sm:h-14 w-40 sm:w-48 bg-gray-200 animate-pulse rounded" />
                        <div className="h-12 sm:h-14 w-40 sm:w-48 bg-gray-200 animate-pulse rounded" />
                    </div>
                </div>
            </section>

            {/* BackedBy Section — white bg */}
            <section className="bg-white pb-6 px-4 sm:px-6">
                {/* "We're Backed By" divider */}
                <div className="flex items-center justify-center gap-4 py-6 sm:py-8">
                    <div className="flex-1 h-px bg-gray-200" />
                    <div className="h-6 w-40 sm:w-56 bg-gray-200 animate-pulse rounded" />
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Logo marquee skeleton */}
                <div className="flex gap-10 sm:gap-14 overflow-hidden px-2">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-none h-10 sm:h-14 w-28 sm:w-36 bg-gray-200 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
