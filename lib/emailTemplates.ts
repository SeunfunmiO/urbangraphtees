

interface WelcomeEmailProps {
    fullname: string,
    email: string,
    websiteName?: string;
    websiteUrl?: string;
}

export async function sendWelcomeEmail({
    fullname,
    websiteName = 'Urbangraphtees',
    websiteUrl = process.env.NEXT_PUBLIC_APP_URL,
}: WelcomeEmailProps) {
  return  `
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
            <h1 style="margin: 0; letter-spacing: 4px; text-transform: uppercase;">Welcome to ${websiteName}!</h1>
        </div>

        <div class="hero">
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80" alt="New Collection">
        </div>

        <div class="content">
            <h2>YOU'RE IN THE CLUB.</h2>
            <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: bold;">Hi , ${fullname}! 👋</h3>
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
