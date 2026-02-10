import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 my-5">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-200">404</h1>
                </div>

                <div className="space-y-4 mb-8">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Oops! The page you&apos;re looking for seems to have gone out of stock.
                    </p>
                </div>


                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-900 font-medium rounded-lg hover:border-gray-400 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">You might also like:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link
                            href="/new-arrivals"
                            className="text-sm text-gray-700 hover:text-black underline"
                        >
                            New Arrivals
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                            href="/sale"
                            className="text-sm text-gray-700 hover:text-black underline"
                        >
                            Sale
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link
                            href="/collections"
                            className="text-sm text-gray-700 hover:text-black underline"
                        >
                            Collections
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}