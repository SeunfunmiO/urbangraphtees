"use client";

import { ArrowRight, Check, LucideLoader2, X } from 'lucide-react';
import { AuthInput } from './ui/AuthInput';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ChangeEvent, useEffect, useState } from 'react';
import { registerUser } from '@/utils/action';
import { FormData, MessageType } from '@/utils/type';
import { fireConfetti } from '@/lib/confetti';


const RegistrationClientComponent = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<MessageType>("");
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        image: '',
        fullname: '',
        email: '',
        confirmpassowrd: '',
        password: '',
        agree: false
    })

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const reader = new FileReader()

        reader.onloadend = () => {
            const photoBase64 = reader.result as string;
            setFormData(prev => ({
                ...prev,
                image: photoBase64
            }))
        }
        reader.readAsDataURL(file)
    }


    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
            confirmpassword: "",
            image: '',
            agree: false,
        },
        validationSchema: yup.object({
            fullname: yup.string().required("Please enter your fullname"),
            email: yup.string().required("Email is required!").email("Please enter a valid email address"),
            password: yup.string().required("Password is required!"),
                // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                //     'Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character'),
            confirmpassword: yup.string().required("Please re-enter your password")
                .oneOf([yup.ref("password")], "Passwords must match"),
            agree: yup.boolean().oneOf([true], "You must agree to continue"),
            image: yup.string().notRequired()
        }),
        onSubmit: async (values: {
            fullname: string,
            email: string,
            password: string,
            confirmpassword: string,
            image: string,
            agree: boolean
        }) => {
            const payload = {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                profilephoto: formData.image
            }
            try {
                setLoading(true);

                const response = await registerUser(payload);

                if (!response?.success) {
                    setMessage(response?.message ?? "Account creation failed");
                    setMessage('error')
                    return;
                } else {
                    setMessage(response.message || "Account created successfully, Check email for welcome message");
                    setMessageType('success')
                    setSuccess(true)
                    fireConfetti()
                    setTimeout(() => {
                        router.push("/sign-in");
                    }, 3000)
                }
            } catch (error) {
                console.log("Error creating account : ", error);
                setMessage("Something went wrong");
                setMessageType('error')
            } finally {
                setLoading(false);
                setSuccess(false)
            }
        }

    });

    const password = formik.values.password;

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


    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage('')
            setMessageType('')
        }, 3000)

        return () => clearTimeout(timer)
    }, [message])


    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            {message && (
                <small
                    className={`
                     px-4 py-1 rounded text-sm font-medium inline-block
             ${messageType === "success" &&
                        "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"}
             ${messageType === "error" &&
                        "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"}
                `}
                >
                    {message}
                </small>
            )}

            <AuthInput
                name='fullname'
                label="Full Name"
                type="text"
                placeholder="TYLER DURDEN"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullname}
                error={
                    formik.touched.fullname
                        ? formik.errors.fullname
                        : ''
                }
            />


            <AuthInput
                name='email'
                label="Email Address"
                type="email"
                placeholder="TYLER@URBANGRAPH.COM"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={
                    formik.touched.email
                        ? formik.errors.email
                        : ''
                }
            />

            <AuthInput
                name='image'
                label="Image"
                type="file"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.image}
            />

            <AuthInput
                name='password'
                label="Password"
                type="password"
                placeholder="••••••••"
                onFocus={() => setPasswordFocused(true)}
                onBlur={(e) => {
                    setPasswordFocused(false);
                    formik.handleBlur(e);
                }}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                    formik.touched.password
                        ? formik.errors.password
                        : ''
                }
            />
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


            <AuthInput
                name='confirmpassword'
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                error={
                    formik.touched.confirmpassword
                        ? formik.errors.confirmpassword
                        : ''
                }
            />

            <div>
                <div className="flex items-center space-x-2 py-2">
                    <input
                        name='agree'
                        type="checkbox"
                        id="terms"
                        className="mt-1 accent-black"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
                        I AGREE TO THE <span
                            onClick={() => router.push('/terms-of-service')}
                            className="underline cursor-pointer text-black font-bold">
                            TERMS OF SERVICE</span> AND PRIVACY POLICY.
                    </label>
                </div>
                {formik.touched.agree && formik.errors.agree && (
                    <small className="text-red-600">{formik.errors.agree}</small>
                )}
            </div>

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
                        <span>Creating account...</span>
                    </span>
                )}

                {!loading && !success && (
                    <div className='flex items-center gap-2'>
                        <span>Create Account</span>
                        <ArrowRight size={18} className='group-hover:translate-x-1 transform' />
                    </div>
                )}

                {success && (
                    <span className="flex items-center space-x-2">
                        <Check size={20} />
                        <span>Account Created</span>
                    </span>
                )}
            </button>
        </form>
    );
}

export default RegistrationClientComponent