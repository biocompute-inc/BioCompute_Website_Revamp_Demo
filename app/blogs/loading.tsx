export default function BlogsLoading() {
    return (
        <div className="min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header Skeleton */}
                <div className="mb-12">
                    <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* Blog Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                            {/* Image Skeleton */}
                            <div className="aspect-video w-full bg-gray-200 animate-pulse" />

                            <div className="p-6">
                                {/* Author Skeleton */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                                    <div className="flex-1">
                                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1" />
                                        <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
                                    </div>
                                </div>

                                {/* Title Skeleton */}
                                <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
                                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-3" />

                                {/* Excerpt Skeleton */}
                                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
