export default function BlogDetailLoading() {
    return (
        <div className="min-h-screen pt-16">
            {/* Hero Skeleton */}
            <div className="relative w-full h-[400px] md:h-[500px] bg-gray-200 animate-pulse">
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-12 w-3/4 bg-gray-300 rounded mb-4" />
                        <div className="h-6 w-48 bg-gray-300 rounded" />
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-4">
                    <div className="h-8 bg-gray-200 animate-pulse rounded" />
                    <div className="h-8 bg-gray-200 animate-pulse rounded" />
                    <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded" />
                    <div className="h-32 bg-gray-200 animate-pulse rounded mt-8" />
                    <div className="h-8 bg-gray-200 animate-pulse rounded" />
                    <div className="h-8 bg-gray-200 animate-pulse rounded" />
                    <div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded" />
                </div>
            </article>

            {/* Suggested Blogs Skeleton */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                                <div className="aspect-video w-full bg-gray-200 animate-pulse" />
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
                                    <div className="h-4 bg-gray-200 animate-pulse rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
