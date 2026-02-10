'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 my-5">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Something Went Wrong
                    </h2>
                    <p className="text-gray-600 text-lg">
                        We encountered an unexpected error. Don&apos;t worry, our team has been notified.
                    </p>
                    {error.digest && (
                        <p className="text-sm text-gray-500 font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-900 font-medium rounded-lg hover:border-gray-400 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                        Still having issues? We&apos;re here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-black underline"
                        >

                            Contact Support
                        </Link>
                        <span className="hidden sm:inline text-gray-300">•</span>
                        <Link
                            href="/faq"
                            className="text-gray-700 hover:text-black underline"
                        >
                            Visit FAQ
                        </Link>
                        <span className="hidden sm:inline text-gray-300">•</span>
                        <Link
                            href="mailto:support@yourstore.com"
                            className="text-gray-700 hover:text-black underline"
                        >
                            Email Us
                        </Link>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default Error