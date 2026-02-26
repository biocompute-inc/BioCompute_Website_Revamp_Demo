export default function ProductLoading() {
    return (
        <div className="min-h-screen">
            {/* Hero Section Skeleton — white background */}
            <section className="relative min-h-screen bg-white">
                <div className="w-full px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20 md:pt-28 lg:pt-36 xl:pt-44 pb-0">
                    {/* Title skeleton */}
                    <div className="flex justify-center gap-2 mb-4 flex-wrap mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-0">
                        <div className="h-12 sm:h-14 md:h-16 lg:h-14 xl:h-24 w-72 sm:w-96 md:w-[32rem] lg:w-[36rem] xl:w-[52rem] bg-gray-200 animate-pulse rounded-xl" />
                    </div>

                    {/* Subtitle skeleton */}
                    <div className="mb-4 md:mb-6 flex justify-center">
                        <div className="h-6 sm:h-7 md:h-8 w-72 sm:w-96 bg-gray-200 animate-pulse rounded-lg" />
                    </div>

                    {/* Buttons skeleton */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
                        <div className="h-12 sm:h-14 w-full sm:w-40 bg-gray-200 animate-pulse rounded-full" />
                        <div className="h-12 sm:h-14 w-full sm:w-44 bg-gray-200 animate-pulse rounded-full" />
                    </div>

                    {/* Device image skeleton */}
                    <div className="w-56 sm:w-72 md:w-[22rem] lg:w-[28rem] xl:w-[36rem] mx-auto mt-2 sm:mt-4 md:mt-6">
                        <div
                            className="w-full bg-gray-200 animate-pulse rounded-3xl"
                            style={{ aspectRatio: '0.75' }}
                        />
                    </div>
                </div>

                {/* Bento grid skeleton — dark */}
                <div className="relative bg-black -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 animate-pulse"
                                style={{ minHeight: '220px' }}
                            >
                                <div className="w-12 h-12 bg-white/10 rounded-xl mb-4" />
                                <div className="h-5 w-3/4 bg-white/10 rounded mb-3" />
                                <div className="h-4 w-full bg-white/10 rounded mb-2" />
                                <div className="h-4 w-5/6 bg-white/10 rounded mb-2" />
                                <div className="h-4 w-2/3 bg-white/10 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section Skeleton */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mx-auto mb-3" />
                        <div className="h-5 w-64 bg-gray-200 animate-pulse rounded mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden bg-gray-100 animate-pulse">
                                <div className="aspect-video bg-gray-200" />
                                <div className="p-5">
                                    <div className="h-5 w-1/2 bg-gray-200 rounded mb-3" />
                                    <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                                    <div className="h-4 w-4/5 bg-gray-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section Skeleton */}
            <section className="bg-black min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="h-8 w-48 bg-white/10 animate-pulse rounded mx-auto mb-16" />
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 w-full max-w-5xl">
                    {/* Icon box skeleton */}
                    <div className="w-40 h-40 md:w-64 md:h-64 lg:w-[320px] lg:h-[320px] bg-white/5 border border-purple-500/20 rounded-3xl animate-pulse flex-shrink-0" />
                    {/* Text skeleton */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="h-4 w-24 bg-purple-400/20 animate-pulse rounded mb-3" />
                        <div className="h-12 w-4/5 bg-white/10 animate-pulse rounded mb-4" />
                        <div className="h-4 w-full bg-white/10 animate-pulse rounded mb-2" />
                        <div className="h-4 w-11/12 bg-white/10 animate-pulse rounded mb-2" />
                        <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded" />
                    </div>
                </div>
                {/* Step tabs skeleton */}
                <div className="mt-16 w-full max-w-5xl border-t border-white/10 pt-4 flex justify-between gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="h-3 w-16 bg-white/10 animate-pulse rounded hidden md:block" />
                            <div className="h-1 w-full bg-white/20 animate-pulse rounded-full" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
