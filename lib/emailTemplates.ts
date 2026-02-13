import { ResetPasswordProps, WelcomeEmailProps } from "@/utils/type";


// <h1 style="margin: 0; letter-spacing: 4px; text-transform: uppercase;" > Welcome to ${ websiteName } !</h1>

export async function sendWelcomeEmail({
    fullname,
    websiteName = 'Urbangraphtees',
    websiteUrl = process.env.NEXT_PUBLIC_APP_URL,
}: WelcomeEmailProps) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Welcome to ${websiteName}</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { padding: 40px 20px; text-align: center; background-color: #000000; color: #ffffff; }
        .hero { position: relative; text-align: center; }
        .hero img { width: 100%; height: auto; display: block; }
        .content { padding: 40px; text-align: center; color: #333333; }
        .promo-box { background-color: #f9f9f9; border: 2px dashed #000000; padding: 20px; margin: 20px 0; }
        .coupon-code { font-size: 24px; font-weight: bold; letter-spacing: 2px; }
        .button { display: inline-block; padding: 15px 30px; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 20px; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #888888; background-color: #f4f4f4; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="Logo-black.jpeg" alt="Brand Logo" width='40%' height='40%'>
        </div>

        <div class="hero">
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80" alt="New Collection">
        </div>

        <div class="content">
            <h2>YOU'RE IN THE CLUB.</h2>
            <h3 style="margin: 0 0 20px; color: #000000; font-size: 24px; font-weight: bold;">Hi , ${fullname}! 👋</h3>
            <p>Thanks for signing up! You’re now on the list for exclusive drops, early access to sales, and a whole lot of style inspiration.</p>

            <div class="promo-box">
                <p style="margin-top: 0;">As a thank you, take <strong>5% OFF</strong> your first order.</p>
                <div class="coupon-code">WELCOME5</div>
            </div>

            <a href="${websiteUrl}/collections" class="button">SHOP THE COLLECTION</a>

            <p style="margin-top: 30px; font-size: 14px;">Follow us on Instagram <strong>@urbangraphtees_thebrand</strong></p>
        </div>

        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${websiteName}. All rights reserved.</p>
            <p>Lagos State, Nigeria</p>
            <p><a href=${websiteUrl}/unsubscribe style="color: #888888;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>

    `.trim();
};

export function getResetEmailTemplate({
    websiteName = 'Urbangraphtees',
    resetUrl,
}: ResetPasswordProps) {
    return `
<!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>Reset Password</title>
            <meta name="viewport" content = "width=device-width, initial-scale=1.0">
                <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; }
        .wrapper { width: 100 %; table-layout: fixed; background-color: #f9f9f9; padding-bottom: 40px; }
        .main { background-color: #ffffff; max - width: 500px; margin: 40px auto; border-radius: 8px; border: 1px solid #eeeeee; overflow: hidden; }
        .header { background-color: #000000; padding: 30px; text-align: center; }
        .content { padding: 40px; text-align: center; color: #333333; line-height: 1.6; }
        .button { display: inline-block; padding: 14px 28px; background-color: #000000; color: #ffffff!important; text-decoration: none; font-weight: bold; border-radius: 4px; margin: 25px 0; }
        .footer { text-align: center; font-size: 12px; color: #999999; padding: 20px; }
        .warning { font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 20px; }
</style>
    </head>
    <body>
    <div class="wrapper">
        <div class="main">
            <div class="header">
                <h1 style="color: #ffffff; margin: 0; letter-spacing: 2px; font-size: 20px; text-transform: uppercase;" > ${websiteName} </h1>
                    </div>
                    <div class="content">
                        <h2 style="margin-top: 0;"> Reset Your Password </h2>
                            <p> We received a request to reset the password for your account.No worries, it happens to the best of us! </p>

                                <a href=${resetUrl} class="button"> RESET MY PASSWORD </a>

                                    <p> This link will expire in <strong>15 minutes </strong> for security reasons.</p>

                                        <div class="warning">
                                            <p>If you didn't request this, you can safely ignore this email. Your password will remain unchanged.</p>
                                        </div>
                    </div>
             </div>
              <div class="footer">
                                                    <p>& copy; ${new Date().getFullYear()} ${websiteName}. Stay stylish.</p>
                                                   

        </div>
    </div>
  </body>
  </html>
  `.trim()
}