'use client'

import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { AuthInput } from './ui/AuthInput'
import Button from './ui/Button'
import { useRouter } from 'next/navigation'
import MessageToast from './ui/MessageToast'
import { MessageType } from '@/utils/type'
import { forgotPassword } from '@/utils/action'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ForgotPassword = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<MessageType>("");

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: yup.object({
            email: yup.string()
                .email("Invalid email")
                .required("Email is required")
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const response = await forgotPassword({ email: values.email });

                if (!response?.success) {
                    setMessage(response?.message ?? "Invalid Credentials");
                    setMessageType('error')
                    return;
                } else {
                    setMessage(response.message || "Reset link sent , Please, check your email");
                    setMessageType('success')
                    setSuccess(true)
                }
            } catch (error) {
                console.log("Error sending reset link : ", error);
                setMessage("Something went wrong");
                setMessageType('error')
            } finally {
                setLoading(false)
            }
        }
    })

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        No worries! Enter your email and we&apos;ll send you a reset link.
                    </p>
                </div>

                <MessageToast
                    message={message}
                    messageType={messageType}
                />

                <form
                    onSubmit={formik.handleSubmit}
                    className="mt-8 space-y-6"
                >

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

                    <Button
                        loading={loading}
                        success={success}
                        name='Sending...'
                        title='Send Reset Link'
                        successTitle='Link Sent'
                    />
                </form>
                <div className="text-sm text-center">
                    <button
                        onClick={() => router.push("/log-in")}
                        className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-500">
                        <ArrowLeft size={16} className="mr-2" /> Back to login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword