// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Povol login stránku a statiky
  if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Chránit třeba /dashboard a /account
  const protectedPaths = ['/dashboard', '/account'];
  if (protectedPaths.some(p => req.nextUrl.pathname.startsWith(p))) {
    // ping na naši proxy /api/me
    const meRes = await fetch(new URL('/api/me', req.url), { method: 'GET' });

    if (meRes.status !== 200) {
      const url = new URL('/login', req.url);
      url.searchParams.set('next', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*', '/login', '/((?!api).*)'],
};
