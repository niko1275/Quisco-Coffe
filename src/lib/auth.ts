import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("🔐 Intentando autorizar:", credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Credenciales faltantes")
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          console.log("❌ Usuario no encontrado")
          return null
        }

        if (!user.password) {
          console.log("❌ Usuario sin contraseña")
          return null
        }

        console.log("👤 Usuario encontrado:", {
          id: user.id,
          email: user.email,
          role: user.role
        })

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        console.log("🔑 Contraseña válida:", isPasswordValid)

        if (!isPasswordValid) {
          console.log("❌ Contraseña incorrecta")
          return null
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }

        console.log("✅ Autorización exitosa:", result)
        return result
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  }
} 