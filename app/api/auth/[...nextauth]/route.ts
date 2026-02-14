import dbConnect from "@/lib/dbconnect"
import UserModel from "@/models/user"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user }) {
            await dbConnect()

            const existingUser = await UserModel.findOne({ email: user.email })

            if (!existingUser) {
                await UserModel.create({
                    name: user.name,
                    email: user.email,
                   profilePhoto: user.image,
                    provider: "google",
                })
            }

            return true
        },
    },
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
})

export { handler as GET, handler as POST }
