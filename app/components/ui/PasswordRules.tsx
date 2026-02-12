'use client'

import { StrengthType } from '@/utils/type';
import { AlertCircle, Check, CheckCircle, MinusCircle, X } from 'lucide-react';
import React from 'react'


const PasswordRules = ({ passwordFocused, password }: { passwordFocused: boolean, password: string }) => {
    const passwordRules = {
        minLength: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password),
    };

    const allRequiredRulesPass =
        passwordRules.minLength &&
        passwordRules.uppercase &&
        passwordRules.lowercase &&
        passwordRules.number &&
        passwordRules.special;

    const shouldShowRules =
        passwordFocused && password.length > 0 && !allRequiredRulesPass;

    const strengthScore = Object.values(passwordRules).filter(Boolean).length;

    const strength: StrengthType =
        strengthScore <= 2 ? 'weak' :
            strengthScore <= 4 ? 'medium' : 'strong';

    const shouldShowMeter = passwordFocused && password.length > 0;

    return (
        <div>
            {shouldShowMeter && (
                <div className="my-2 space-y-1">
                    <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300
                 ${strength === 'weak' && 'w-1/3 bg-red-500'}
                    ${strength === 'medium' && 'w-2/3 bg-yellow-500'}
                    ${strength === 'strong' && 'w-full bg-green-600'}
                `}
                        />
                    </div>

                    <span
                        className={`text-xs font-medium
                  ${strength === 'weak' && 'text-red-600'}
                 ${strength === 'medium' && 'text-yellow-600'}
                 ${strength === 'strong' && 'text-green-600'}
                 `}
                    >
                        {strength === 'weak' && (
                            <span className='flex items-center gap-1'>
                                <AlertCircle size={14} />
                                Weak password
                            </span>
                        )}
                        {strength === 'medium' && (
                            <span className='flex items-center gap-1'>
                                <MinusCircle size={14} />
                                Medium password
                            </span>
                        )}
                        {strength === 'strong' && (
                            <span className='flex items-center gap-1'>
                                <CheckCircle size={14} />
                                Strong password
                            </span>
                        )}
                    </span>
                </div>
            )}

            {shouldShowRules && (
                <ul className="text-xs space-y-1 text-neutral-600">
                    <li className={passwordRules.minLength ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.minLength ? <Check size={14} /> : <X size={14} />} Minimum 6 characters
                    </li>
                    <li className={passwordRules.uppercase ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.uppercase ? <Check size={14} /> : <X size={14} />} One uppercase letter
                    </li>
                    <li className={passwordRules.number ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.number ? <Check size={14} /> : <X size={14} />} One number
                    </li>
                    <li className={passwordRules.special ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.special ? <Check size={14} /> : <X size={14} />} One special character
                    </li>
                </ul>
            )}
        </div>
    )
}

export default PasswordRules