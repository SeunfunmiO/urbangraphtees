"use client";


import Link from 'next/link';
import React, { useState } from 'react'
import { AuthInput } from './ui/AuthInput';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { signIn } from '@/utils/action';
import { useRouter } from 'next/navigation';
import { MessageType } from '@/utils/type';
import MessageToast from './ui/MessageToast';
import PasswordRules from './ui/PasswordRules';
import Button from './ui/Button';

const SignInForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<MessageType>("");
    const [passwordFocused, setPasswordFocused] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: '',
            email: "",
            password: "",
            consent: false,
        },
        validationSchema: yup.object({
            email: yup.string().required("Email is required!").email("Please enter a valid email address"),
            password: yup.string().required("Password is required!"),
            consent: yup.boolean().notRequired(),
        }),
        onSubmit: async (values: {
            id: string
            email: string,
            password: string,
            consent: boolean,
        }) => {
            try {
                setLoading(true);

                const response = await signIn(values);

                if (!response?.success) {
                    setMessage(response?.message ?? "Invalid Credentials");
                    setMessageType('error')
                    return;
                } else {
                    setMessage(response.message || "Logged In Successfully");
                    setMessageType('success')
                    setSuccess(true)
                    setTimeout(() => {
                        router.push("/account");
                    }, 3000)
                }
            } catch (error) {
                console.log("Error signing in : ", error);
                setMessage("Something went wrong");
                setMessageType('error')
            } finally {
                setLoading(false);
            }
        }

    });


    return (
        <div>
            <MessageToast
                message={message}
                messageType={messageType}
            />
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <AuthInput
                    label="Email Address"
                    type="email"
                    placeholder="DESIGNER@URBANGRAPH.COM"
                    required
                />

                <div className="space-y-1">
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

                    <PasswordRules
                        passwordFocused={passwordFocused}
                        password={formik.values.password}
                    />

                    <div className="flex justify-end">
                        <Link href="/forgot-password" 
                            className="text-[10px] font-bold uppercase text-gray-400 hover:text-blue-600 transition">
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

                <Button
                    loading={loading}
                    success={success}
                    name='Logging in...'
                    title='Log In'
                    successTitle='Logged In'
                />
            </form>


        </div>
    )
}

export default SignInForm
