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
    callbacks: {
        async signIn({ user }) {
            await dbConnect()

            const existingUser = await UserModel.findOne({ email: user.email })
           
            if (!existingUser) {
                await UserModel.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: "google",
                    createdAt: new Date(),
                })
            }

            return true
        },
    },
})

export { handler as GET, handler as POST }
