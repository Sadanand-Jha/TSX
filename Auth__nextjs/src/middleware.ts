import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' 

    const token = request.cookies.get('token')?.value || ''
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    // if(path === '/verifyemail'){
    //   return NextResponse.redirect(new URL('/login', request.nextUrl))
    // }

    const isMainPath = path === '/'
    if(isMainPath && token){
      return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: ['/',
    '/login',
    '/signup',
    '/profile/:path*',
    '/profile',
    // '/verifyemail/:path*'
  ],
}