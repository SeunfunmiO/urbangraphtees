import React from 'react'

const Loading = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="flex gap-6">
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="flex gap-4">
                            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="h-96 bg-gray-200 rounded-lg mb-12 animate-pulse" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Loading