import { Asterisk } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur: React.ChangeEventHandler<HTMLInputElement>
    error?: string
}

export const AuthInput = ({ label, error, ...props }: AuthInputProps) => (
    <div className="w-full">
        <div className='flex'>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5 tracking-widest">
                {label}
            </label>

            {
                label !== 'Image' ?
                    (
                        <Asterisk
                            size={10}
                            className="text-red-500/70"
                            aria-hidden
                        />
                    ) :
                    <>
                        <p className="text-neutral-400/70 text-xs ml-1">(Optional)</p>
                    </>
            }

        </div>
        <input
            {...props}
            className={`w-full px-4 py-3 bg-white border  rounded
             outline-none transition-all placeholder:text-gray-300
             ${error
                    ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                    : 'focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 border-gray-200'

                }
             `
            }
        />

        {error && (
            <small className="text-red-600">{error}</small>
        )}
    </div>
);