import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    if(pathname === '/verify_email') return NextResponse.redirect(new URL('/register', request.url))
}
 
export const config = {
  matcher: ['/register'],
}