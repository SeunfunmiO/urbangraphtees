'use server'
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbconnect';
import { encrypt } from '@/lib/session';
import UserModel from '@/models/user';
import * as bcrypt from 'bcrypt'
import { cookies } from 'next/headers';

export const registerUser = async (formData: {
    fullname: string;
    email: string;
    password: string;
    profilephoto: string
}) => {
    try {
        await dbConnect();

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(formData.password, salt);
        let uploadedImage;

        if (formData.profilephoto) {
            uploadedImage = await cloudinary.uploader.upload(formData.profilephoto, {
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
                image: uploadedImage?.secure_url
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
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
