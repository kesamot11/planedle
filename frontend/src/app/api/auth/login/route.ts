import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Send to backend
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        redirect: 'manual',
    });
    
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return NextResponse.json(err, { status: res.status });
      }

      const setCookie = res.headers.get('set-cookie');
      const data = await res.json();

      const response = NextResponse.json(data);

      if(setCookie) {
        const match = /([^=;]+)=([^;]+)/.exec(setCookie);
        if(match) {
            response.cookies.set(match[1], match[2], {
                httpOnly: /HttpOnly/i.test(setCookie),
                secure: process.env.NODE_ENV === 'production' || /Secure/i.test(setCookie),
                sameSite: /SameSite=Strict/i.test(setCookie)
                  ? 'strict'
                  : /SameSite=None/i.test(setCookie)
                  ? 'none'
                  : 'lax',
                path: /Path=([^;]+)/i.exec(setCookie)?.[1] ?? '/',
                maxAge: (() => {
                  const m = /Max-Age=(\d+)/i.exec(setCookie);
                  return m ? Number(m[1]) : undefined;
                })(),
              });
        }
      }

      return response;

    }
    