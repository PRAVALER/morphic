import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import AzureADProvider from 'next-auth/providers/azure-ad'

// Estendendo a tipagem da sessão para incluir o accessToken
declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: 'openid profile email'
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: any }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Send properties to the client
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
})

export { handler as GET, handler as POST }
