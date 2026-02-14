"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

const AuthOptions = () => {

    return (
        <div className="grid grid-cols-2 gap-4">
            <button
            onClick={()=>signIn('google')}
                className="py-3 border border-gray-200 font-bold text-xs 
                uppercase tracking-widest hover:bg-gray-50 transition"
            >
                Google
            </button>
            <button
                // onClick={() => signIn('appl')}
                className="py-3 border border-gray-200 font-bold text-xs 
                 uppercase tracking-widest hover:bg-gray-50 transition"
            >
                Apple ID
            </button>
        </div>
    )
}

export default AuthOptions