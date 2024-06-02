// addapted from https://github.com/vercel/examples/blob/main/edge-middleware/basic-auth-password/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from "./app/actions"

/*export const config = {
  matcher: ['/admin/**'],
}*/

export async function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  console.log("middleware called")

  if (!basicAuth) {
    // Prompt for authentication
    return new Response('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
      },
    });
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')
    
    if (await authenticateUser(user, pwd)) {
        return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}