import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

// Move authOptions to a separate variable
const nextAuthOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        })
    ],
    secret: process.env.SECRET!,
}

// Create the NextAuth handler
const handler = NextAuth(nextAuthOptions)

// Export the handler as GET and POST
export { handler as GET, handler as POST }

// If you need to use authOptions elsewhere, export it as a named export
export { nextAuthOptions as authOptions }
