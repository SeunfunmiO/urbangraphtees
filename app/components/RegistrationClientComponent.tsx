"use client";


import { AuthInput } from './ui/AuthInput';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ChangeEvent, useEffect, useState } from 'react';
import { registerUser } from '@/utils/action';
import { FormData, MessageType } from '@/utils/type';
import { fireConfetti } from '@/lib/confetti';
import MessageToast from './ui/MessageToast';
import PasswordRules from './ui/PasswordRules';
import Button from './ui/Button';


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
            agree: false,
        },
        validationSchema: yup.object({
            fullname: yup.string().required("Please enter your fullname"),
            email: yup.string().required("Email is required!").email("Please enter a valid email address"),
            password: yup.string().required("Password is required!"),
            confirmpassword: yup.string().required("Please re-enter your password")
                .oneOf([yup.ref("password")], "Passwords must match"),
            agree: yup.boolean().oneOf([true], "You must agree to continue"),
        }),
        onSubmit: async (values: {
            fullname: string,
            email: string,
            password: string,
            confirmpassword: string,
            agree: boolean
        }) => {
            const payload = {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                profilePhoto: formData.image
            }
            try {
                setLoading(true);

                const response = await registerUser(payload);

                if (!response?.success) {
                    setMessage(response?.message ?? "Account creation failed");
                    setMessageType('error')
                    return;
                } else {
                    setMessage(response.message || "Account created successfully, Check email for welcome message");
                    setMessageType('success')
                    setSuccess(true)
                    fireConfetti()
                    setTimeout(() => {
                        router.push("/log-in");
                    }, 5000)
                }
            } catch (error) {
                console.log("Error creating account : ", error);
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
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            <MessageToast
                message={message}
                messageType={messageType}
            />

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
                onChange={handleFileChange}
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

            <PasswordRules
                passwordFocused={passwordFocused}
                password={formik.values.password}
            />

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

            <Button
                loading={loading}
                success={success}
                name='Creating Account...'
                title='Create an Account'
                successTitle='Account Created'
            />
        </form>
    );
}

export default RegistrationClientComponent