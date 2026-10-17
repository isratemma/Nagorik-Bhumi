import { NextResponse } from 'next/server';

// Routes that require authentication
const protectedPrefixes = ['/dashboard', '/admin'];
// Routes only for unauthenticated users
const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Read auth cookie (set on login — placeholder for real JWT/session)
  const token = request.cookies.get('nb_token')?.value;

  const isProtected = protectedPrefixes.some(p => pathname.startsWith(p));
  const isAuthRoute = authRoutes.some(p => pathname.startsWith(p));

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already-logged-in users away from auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};
