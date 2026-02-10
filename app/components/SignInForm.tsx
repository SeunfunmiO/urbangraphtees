"use client";


import { ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';


import React from 'react'
import { AuthInput } from './ui/AuthInput';

const SignInForm = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
                label="Email Address"
                type="email"
                placeholder="DESIGNER@URBANGRAPH.COM"
                required
            />

            <div className="space-y-1">
                <AuthInput
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    required
                />
                <div className="flex justify-end">
                    <Link href="/forgot-password" size={20} className="text-[10px] font-bold uppercase text-gray-400 hover:text-blue-600 transition">
                        Forgot Password?
                    </Link>
                </div>
            </div>

            <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-black border-gray-300 rounded-none" />
                <label htmlFor="remember" className="text-xs font-bold uppercase text-gray-600 tracking-tight cursor-pointer">
                    Keep me logged in
                </label>
            </div>

            <button className="group w-full flex items-center justify-center space-x-3 bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300">
                <span>Sign In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </form>

    )
}

export default SignInForm