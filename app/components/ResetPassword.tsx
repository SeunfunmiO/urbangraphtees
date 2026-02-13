"use client";

import React, { useEffect, useState } from 'react';
import { LockKeyhole, ArrowLeft } from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { MessageType } from '@/utils/type';
import * as yup from 'yup'
import { AuthInput } from './ui/AuthInput';
import PasswordRules from './ui/PasswordRules';
import Button from './ui/Button';
import MessageToast from './ui/MessageToast';
import { resetPassword } from '@/utils/action';

const ResetPassword = ({ token }: { token: string }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<MessageType>("");
    const [passwordFocused, setPasswordFocused] = useState(false);

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmpassword: "",
        },
        validationSchema: yup.object({
            newPassword: yup.string().required("Password is required!"),
            confirmpassword: yup.string().required("Please re-enter your password")
                .oneOf([yup.ref("newPassword")], "Passwords must match"),
        }),
        onSubmit: async (values: {
            newPassword: string,
            confirmpassword: string,
        }) => {
            const payload = {
                token,
                newPassword: values.newPassword,
            }
            try {
                setLoading(true);

                const response = await resetPassword(payload);

                if (!response?.success) {
                    setMessage(response?.message ?? "password update failed");
                    setMessageType('error')
                    return;
                } else {
                    setMessage(response.message || "Password updated successfully! Redirecting...");
                    setMessageType('success')
                    setSuccess(true)
                    fireConfetti()
                    setTimeout(() => {
                        router.push("/log-in");
                    }, 5000)
                }
            } catch (error) {
                console.log("Password update error : ", error);
                setMessage("Something went wrong");
                setMessageType('error')
            } finally {
                setLoading(false);
            }
        }

    });

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage('')
            setMessageType('')
        }, 3000)

        return () => clearTimeout(timer)
    }, [message])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                        <LockKeyhole size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Set new password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Must be at least 6 characters long.
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={formik.handleSubmit}>
                    <MessageToast
                        message={message}
                        messageType={messageType}
                    />

                    <div className="space-y-4">

                        <div className="mt-1 ">
                            <AuthInput
                                name='newPassword'
                                label="New Password"
                                type="password"
                                placeholder="••••••••"
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={(e) => {
                                    setPasswordFocused(false);
                                    formik.handleBlur(e);
                                }}
                                onChange={formik.handleChange}
                                value={formik.values.newPassword}
                                error={
                                    formik.touched.newPassword
                                        ? formik.errors.newPassword
                                        : ''
                                }
                            />

                            <PasswordRules
                                passwordFocused={passwordFocused}
                                password={formik.values.newPassword}
                            />
                        </div>

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
                    </div>

                    <Button
                        loading={loading}
                        success={success}
                        name='Updating...'
                        title='Update Password'
                        successTitle='Updated'
                    />
                </form>
                <div className="text-center">
                    <button
                        onClick={() => router.push("/log-in")}
                        className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-500">
                        <ArrowLeft size={16} className="mr-2" /> Back to login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword