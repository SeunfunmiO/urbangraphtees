import React from 'react'
import RegistrationClientComponent from '../components/RegistrationClientComponent'
import Link from 'next/link'
import Image from 'next/image'

const Page = () => {

    return (
        <div className="flex min-h-screen">
            {/* Visual Side */}
            <div className="relative hidden lg:flex flex-1 bg-zinc-900 items-center justify-center overflow-hidden">
                <Image
                    src="/Logo-black.jpeg"
                    alt="Urban Fashion"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-110 hover:scale-100 
                    transition-transform duration-[5s]"
                    width={1000}
                    height={1000}
                />
                <div className="relative z-10 p-12 text-center">
                    <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                        Join the <br /> <span className="text-neutral-600 underline decoration-white">Collectives</span>
                    </h2>
                    <p className="text-gray-300 font-medium tracking-wide capitalize">More than a brand. It’s a culture.</p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-white my-6">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <Link href="/" className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                            Urban<span className="text-neutral-600">Graph</span>Tees
                        </Link>
                        <h1 className="mt-8 text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                            Start Your <br />Collection
                        </h1>
                        <p className="mt-4 text-gray-500 font-medium">
                            Already a member? <Link href="/log-in" className="text-neutral-600 hover:underline">Log In</Link>
                        </p>
                    </div>

                    <RegistrationClientComponent />

                    <p className="mt-10 text-[10px] text-gray-400 uppercase tracking-widest text-center">
                        © {new Date().getFullYear()} UrbanGraphTees — All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page