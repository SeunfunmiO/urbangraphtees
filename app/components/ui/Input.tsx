import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    hint?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            fullWidth = true,
            className,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-condensed font-600 text-xs uppercase tracking-widest text-brand-mutedLt"
                        style={{ letterSpacing: '0.15em' }}
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none">
                            {leftIcon}
                        </span>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'input-brand',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            error && 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_#FF3333]',
                            className
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">
                            {rightIcon}
                        </span>
                    )}
                </div>

                {error && (
                    <p className="text-xs text-red-400 font-body mt-0.5">{error}</p>
                )}
                {hint && !error && (
                    <p className="text-xs text-brand-muted font-body mt-0.5">{hint}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

/* ── Textarea variant ─────────────────────────────────────────────────────── */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    hint?: string
    fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, hint, fullWidth = true, className, id, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-condensed font-600 text-xs uppercase tracking-widest text-brand-mutedLt"
                        style={{ letterSpacing: '0.15em' }}
                    >
                        {label}
                    </label>
                )}

                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'input-brand resize-none min-h-[120px]',
                        error && 'border-red-500',
                        className
                    )}
                    {...props}
                />

                {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
                {hint && !error && <p className="text-xs text-brand-muted mt-0.5">{hint}</p>}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

/* ── Select variant ───────────────────────────────────────────────────────── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
    fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, fullWidth = true, className, id, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-condensed font-600 text-xs uppercase tracking-widest text-brand-mutedLt"
                        style={{ letterSpacing: '0.15em' }}
                    >
                        {label}
                    </label>
                )}

                <select
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'input-brand appearance-none cursor-pointer',
                        error && 'border-red-500',
                        className
                    )}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                    }}
                    {...props}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}
                            style={{ background: '#1A1A1A', color: '#F5F5F0' }}
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>

                {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
            </div>
        )
    }
)

Select.displayName = 'Select'