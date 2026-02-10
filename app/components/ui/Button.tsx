'use client'

import { ButtonProps } from '@/utils/type'
import { ArrowRight, Check, LucideLoader2 } from 'lucide-react'
import React from 'react'

const Button = ({ loading, success, name, title, successTitle }:ButtonProps) => {
    return (
        <div>
            <button
                disabled={loading || success}
                type='submit'
                className={`
                 group w-full flex items-center justify-center space-x-3
                 bg-black text-white py-4 font-black uppercase tracking-widest text-xs
                 transition-all duration-300
                 hover:bg-neutral-600
                  ${loading || success ? 'cursor-not-allowed' : ''}
                    ${success ? 'bg-green-600 hover:bg-green-600' : ''}
                 ${loading ? 'bg-neutral-500 hover:bg-neutral-500' : ''}
                 `}
            >
                {loading && (
                    <span className="flex items-center space-x-2">
                        <LucideLoader2 className="animate-spin" size={18} />
                        <span>{name}</span>
                    </span>
                )}

                {!loading && !success && (
                    <div className='flex items-center gap-2'>
                        <span>{title}</span>
                        <ArrowRight size={18} className='group-hover:translate-x-1 transform' />
                    </div>
                )}

                {success && (
                    <span className="flex items-center space-x-2">
                        <Check size={20} />
                        <span>{successTitle}</span>
                    </span>
                )}
            </button>
        </div>
    )
}

export default Button