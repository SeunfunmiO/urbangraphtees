"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    return (
        <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    <div className="shrink-0flex items-center">
                        <Link href="/" className="md:text-2xl font-black tracking-tighter text-black uppercase">
                            Urban<span className="text-neutral-600">Graph</span>Tees
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/shop" className="text-sm font-medium hover:text-neutral-600 transition">
                            SHOP ALL
                        </Link>
                        <Link href="/new-arrivals" className="text-sm font-medium hover:text-neutral-600 transition">
                            NEW ARRIVALS
                        </Link>
                        <Link href="/collections" className="text-sm font-medium hover:text-neutral-600 transition">
                            COLLECTIONS
                        </Link>
                        <Link href="/account" className="text-sm font-medium hover:text-neutral-600 transition">
                            MY ACCOUNT
                        </Link>
                    </div>

                    <div className="flex items-center space-x-5">
                        <button className="text-gray-700 hover:text-black transition">
                            <Search size={20} />
                        </button>
                        <Link href="/cart" className="text-gray-700 hover:text-black transition relative">
                            <ShoppingBag size={20} />
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full 
                                flex items-center justify-center font-bold">
                                0
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/log-in')}
                                className="bg-black text-white text-sm px-5 py-2 font-bold uppercase hover:bg-neutral-600
                             hover:text-white transition-all duration-300 rounded "
                            >
                                Log In
                            </button>

                            <button
                                onClick={() => router.push('/create-account')}
                                className="border-2 border-neutral-800 text-sm text-black px-5 py-2 font-bold uppercase
                             hover:bg-black hover:text-white transition-all rounded-full"
                            >
                                Create an Account
                            </button>
                        </div>

                        <button
                            className="md:hidden text-black"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        <Link href="/shop" className="block text-lg font-semibold px-2">Shop All</Link>
                        <Link href="/new-arrivals" className="block text-lg font-semibold px-2">New Arrivals</Link>
                        <Link href="/collections" className="block text-lg font-semibold px-2">Collections</Link>
                        <Link href="/account" className="block text-lg font-semibold px-2">My Account</Link>
                        <Link href="/log-in" className="block text-lg font-semibold px-2">Log In</Link>
                        <Link href="/create-account" className="block text-lg font-semibold px-2">Create an Account</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavigationBar