import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { hasSupabasePublicEnv } from '@/lib/supabase/env';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/auth/callback';

  if (!hasSupabasePublicEnv()) {
    if (!isPublicRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next({
      request,
    });
  }

  const { response, user } = await updateSession(request);

  if (!user && !isPublicRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  if (user && isPublicRoute) {
    const appUrl = request.nextUrl.clone();
    appUrl.pathname = '/';
    return NextResponse.redirect(appUrl);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
