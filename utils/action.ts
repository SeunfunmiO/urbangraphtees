'use server'
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbconnect';
import UserModel from '@/models/user';
import * as bcrypt from 'bcrypt'

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