'use server'
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbconnect';
import { encrypt } from '@/lib/session';
import UserModel from '@/models/user';
import * as bcrypt from 'bcrypt'
import { cookies } from 'next/headers';
import crypto from 'crypto'
import { sendResetEmail } from '@/lib/emailReset';


export const registerUser = async (formData: {
    fullname: string;
    email: string;
    password: string;
    profilePhoto: string
}) => {
    try {
        await dbConnect();

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(formData.password, salt);
        let uploadedImage;

        if (formData.profilePhoto) {
            uploadedImage = await cloudinary.uploader.upload(formData.profilePhoto, {
                folder: "urbangraphtees/pictures",
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            })
        }

        let emailStatus: "sent" | "failed" = "failed";

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/send-welcome-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fullname: formData.fullname,
                        email: formData.email,
                    }),
                }
            );

            if (res.ok) {
                emailStatus = "sent";
            } else {
                console.error("Email API error:", await res.text());
            }

            const user = await UserModel.create({
                ...formData,
                password: hash,
                profilePhoto: uploadedImage?.secure_url
            });

            if (!user) {
                return {
                    success: false,
                    message: "Invalid Credentials",
                };
            }
        } catch (emailError) {
            console.error("Email request failed:", emailError);
        }

        return {
            success: true,
            message: "Account created successfully , Check email for welcome message",
            emailStatus,
        };
    } catch (error) {
        console.error("Error creating account:", error);
        return {
            success: false,
            message: "Internal server error",
        };
    }
};

export const signIn = async (formData: {
    id: string,
    email: string,
    password: string
}) => {
    try {
        await dbConnect()

        const user = await UserModel.findOne({ email: formData.email }).select("+password")

        if (!user) {
            return {
                success: false,
                message: "Invalid Credentials"
            }
        }

        const validPassword = await bcrypt.compare(formData.password, user.password)
        if (!validPassword) {
            return {
                success: false,
                message: "Invalid Credentials",
            }
        }

        const cookieStore = await cookies()
        const token = await encrypt({ _id: user._id.toString() })
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 14 * 24 * 60 * 60),
            sameSite: "lax",
            path: '/',
        })


        return {
            success: true,
            message: "Logged in successfully",
        }

    } catch (error) {
        console.log("Error logging into account :", error);
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

export const forgotPassword = async (data: { email: string }) => {
    try {
        const email = (data.email).toLowerCase()

        if (!email) {
            return { success: false, message: "Email is required" }
        }

        await dbConnect()

        const user = await UserModel.findOne({ email })

        if (!user) {
            return {
                success: true,
                message:
                    "If an account with that email exists, we’ve sent a reset link."
            }
        }

        const now = new Date()
        const windowTime = 15 * 60 * 1000

        user.passwordResetRequests = user.passwordResetRequests.filter(
            (timestamp: Date) => now.getTime() - timestamp.getTime() < windowTime
        )

        if (user.passwordResetRequests.length >= 3) {
            return {
                success: false,
                message: "Too many reset attempts. Please try again later."
            }
        }

        user.passwordResetRequests.push(now)
        await user.save()


        const resetToken = crypto.randomBytes(32).toString("hex")


        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex")

        user.resetPasswordToken = hashedToken
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
        await user.save()

        try {
            const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`

            await sendResetEmail(user.email, resetUrl)

        } catch (emailError) {
            console.error("Email failed:", emailError)

            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            await user.save()

            return {
                success: false,
                message: "Could not send reset email. Please try again."
            }
        }

        return {
            success: true,
            message:
                "If an account with that email exists, we’ve sent a reset link."
        }

    } catch (error) {
        console.error("Forgot Password Error:", error)
        return {
            success: false,
            message: "Something went wrong. Please try again."
        }
    }
}

export const resetPassword = async (data: {
    token: string,
    newPassword: string
}) => {
    try {
        const { token, newPassword } = data

        if (!token || !newPassword) {
            return { success: false, message: "Token and new password are required" }
        }

        await dbConnect()

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        const user = await UserModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        })

        if (!user) {
            return { success: false, message: "Invalid or expired token" }
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        user.passwordResetRequests = []

        await user.save()

        return { success: true, message: "Password reset successfully" }
    } catch (error) {
        console.error("Reset Password Error:", error)
        return { success: false, message: "Something went wrong. Please try again." }
    }
}