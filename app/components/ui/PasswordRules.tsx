'use client'

import { Check, X } from 'lucide-react';
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

    const shouldShowStrength =
        passwordFocused && password.length > 0 && allRequiredRulesPass;




    return (
        <div>
            {shouldShowRules && (
                <ul className="text-xs space-y-1 text-neutral-600">
                    <li className={passwordRules.minLength ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.minLength ? <Check size={18} /> : <X size={16} />} Minimum 6 characters
                    </li>
                    <li className={passwordRules.uppercase ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.uppercase ? <Check size={18} /> : <X size={16} />} One uppercase letter
                    </li>
                    <li className={passwordRules.number ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.number ? <Check size={18} /> : <X size={16} />} One number
                    </li>
                    <li className={passwordRules.special ? "text-green-600 flex gap-1 items-center" : "flex gap-1 items-center"}>
                        {passwordRules.special ? <Check size={18} /> : <X size={16} />} One special character
                    </li>
                </ul>
            )}

            {shouldShowStrength && (
                <small className="text-green-600 font-medium mb-3">
                    ✔ Strong password
                </small>
            )}
        </div>
    )
}

export default PasswordRules