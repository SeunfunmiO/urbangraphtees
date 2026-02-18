"use client"

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const AuthOptions = () => {
    const router = useRouter()
    const handleSignIn = () => {
        signIn('google')
        router.push("/user/account")
    }
    return (
        <div className="grid grid-cols-1 gap-4">
            <button
                onClick={()=>handleSignIn()}
                className="py-3 border border-gray-200 font-bold text-xs justify-center gap-1
                uppercase tracking-widest hover:bg-gray-50 transition flex items-center"
            >
                <Image
                    src='/google-color-svgrepo-com.svg'
                    alt='Google'
                    width={14}
                    height={14}
                />
                Google
            </button>
        </div>
    )
}

export default AuthOptions