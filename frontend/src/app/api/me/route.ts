// app/api/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL!; 

export async function GET() {
  const jar = await cookies();
  const jwt = jar.get('jwt')?.value;        
  const cookieHeader = jar.toString();    

  const res = await fetch(`${API_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      cookie: cookieHeader,                  
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      'content-type': 'application/json',
    },
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
