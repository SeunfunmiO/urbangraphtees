'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const Hero = () => {
    const router = useRouter()

    return (
        <section className="relative h-[95vh] md:h-[85vh] w-full overflow-hidden flex items-center justify-center">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 z-10 opacity-20 
                bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
            />

            <div className="relative z-20 text-center text-white px-4">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 italic">
                    Street <span className="text-neutral-500">Culture</span>
                </h1>
                <p className="max-w-md mx-auto text-lg md:text-xl font-medium mb-8 text-gray-200">
                    The original graphic tee movement. Dropping Friday 10AM.
                    {/* Curated styles for the modern minimalist. */}

                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.push('/shop')}
                        className="bg-white text-black px-10 py-4 font-bold uppercase hover:bg-neutral-600
                         hover:text-white transition-all duration-300">
                        Shop Drop
                    </button>
                    <button
                        onClick={() => router.push('/look-book')}
                        className="border-2 border-white text-white px-10 py-4 font-bold uppercase
                         hover:bg-white hover:text-black transition-all">
                        Lookbook
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero