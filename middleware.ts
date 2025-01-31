import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { verify } from "jsonwebtoken"

// const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"

export function middleware(request: NextRequest) {
  // const session = request.cookies.get("session")?.value

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Commenting out authentication check
    /*
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    try {
      verify(session, SECRET_KEY)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
    */

    // Allow all access to dashboard pages
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
