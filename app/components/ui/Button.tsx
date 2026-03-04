// 'use client'

// import { ButtonProps } from '@/lib/db/utils/type'
// import { ArrowRight, Check, LucideLoader2 } from 'lucide-react'
// import React from 'react'

// const Button = ({ loading, success, name, title, successTitle }: ButtonProps) => {
//     return (
//         <div>
//             <button
//                 disabled={loading || success}
//                 type='submit'
//                 className={`
//                  group w-full flex items-center justify-center space-x-3
//                  bg-black text-white py-4 font-black uppercase tracking-widest text-xs
//                  transition-all duration-300
//                  hover:bg-neutral-600 rounded
//                   ${loading || success ? 'cursor-not-allowed' : ''}
//                     ${success ? 'bg-green-600 hover:bg-green-600' : ''}
//                  ${loading ? 'bg-neutral-500 hover:bg-neutral-500' : ''}
//                  `}
//             >
//                 {loading && (
//                     <span className="flex items-center space-x-2">
//                         <LucideLoader2 className="animate-spin" size={18} />
//                         <span>{name}</span>
//                     </span>
//                 )}

//                 {!loading && !success && (
//                     <div className='flex items-center gap-2'>
//                         <span>{title}</span>
//                         <ArrowRight size={18} className='group-hover:translate-x-1 transform' />
//                     </div>
//                 )}

//                 {success && (
//                     <span className="flex items-center space-x-2">
//                         <Check size={20} />
//                         <span>{successTitle}</span>
//                     </span>
//                 )}
//             </button>
//         </div>
//     )
// }

// export default Button

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'acid' | 'outline' | 'ghost' | 'danger' | 'icon'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    fullWidth?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
    acid: 'btn-acid',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    icon: 'btn-icon',
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'acid',
            size = 'md',
            loading = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            children,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || loading

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    variantStyles[variant],
                    variant !== 'icon' && sizeStyles[size],
                    fullWidth && 'w-full',
                    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                    className
                )}
                {...props}
            >
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    leftIcon
                )}
                {children && <span>{children}</span>}
                {!loading && rightIcon}
            </button>
        )
    }
)

Button.displayName = 'Button'