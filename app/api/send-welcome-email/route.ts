
import { sendWelcomeEmail } from "@/lib/emailTemplates";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function POST(req: Request) {
    try {
        const { fullname, email } = await req.json();

        if (!fullname || !email) {
            return NextResponse.json(
                { success: false, message: "Fullname and email are required" },
                { status: 400 }
            );
        }

        const emailHtml = await sendWelcomeEmail({
            fullname,
            email,
            websiteName: "Urbangraphtees",
            websiteUrl: process.env.NEXT_PUBLIC_APP_URL,
        });

        const info = await transporter.sendMail({
            from: {
                name: 'Urbangraphtees',
                address: process.env.EMAIL_USER || process.env.SMTP_USER!,
            },
            to: email,
            subject: `Welcome to Urbangraphtees 🎉`,
            html: emailHtml,
        });

        console.log('✅ Email sent:', info.messageId);


        return NextResponse.json({
            success: true,
            message: "User registered and welcome email sent!",
            emailHtml,
            messageId: info.messageId,
        });

    } catch (error) {
        console.error("Error sending email", error);
        return NextResponse.json({ success: false, error });
    }
}




