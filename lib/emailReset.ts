import nodemailer from "nodemailer"
import { getResetEmailTemplate } from "./emailTemplates"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export async function sendResetEmail(email: string, resetUrl: string) {

    const html = getResetEmailTemplate({
        resetUrl,
        websiteName: "Urbangraphtees",
    })

    await transporter.sendMail({
        from: `"Urbangraphtees" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Password",
        html,
    })
}
