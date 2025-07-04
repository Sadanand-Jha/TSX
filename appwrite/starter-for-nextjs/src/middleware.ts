import { NextResponse, NextRequest } from 'next/server'
import createQuestionCollection from './models/server/question.collection';
import getOrCreateDB from './models/server/dbSetup';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    await Promise.all([
        createQuestionCollection(),
        getOrCreateDB()
    ])
    return NextResponse.next()
}
 
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /api routes
     * - /_next/static (static files)
     * - /_next/image (image optimizer)
     * - /favicon.ico (favicon)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};