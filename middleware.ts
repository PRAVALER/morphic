import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Add request information to response headers
    const protocol = req.headers.get('x-forwarded-proto') || req.nextUrl.protocol
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || ''
    const baseUrl = `${protocol}${protocol.endsWith(':') ? '//' : '://'}${host}`

    const response = NextResponse.next()
    response.headers.set('x-url', req.url)
    response.headers.set('x-host', host)
    response.headers.set('x-protocol', protocol)
    response.headers.set('x-base-url', baseUrl)

    return response
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/login'
    }
  }
)

// Protect all routes except public ones
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)'
  ]
}
