import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Temporäre Benutzer für die Entwicklung
const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123", // In einer echten Anwendung würde das Passwort gehasht sein
  },
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Einfache Überprüfung ohne Datenbank
        const user = users.find((user) => user.email === credentials.email)

        if (!user || user.password !== credentials.password) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
