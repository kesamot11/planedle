import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(request: Request) {
    try {
        const jar = await cookies();
        const jwt = jar.get('jwt')?.value;    
        const cookieHeader = jar.toString();

        const { id } = await request.json(); 
    
        const res = await fetch(`${API_URL}/api/users/increment/${id}`, {
            method: 'PUT',
            headers: {
                cookie: cookieHeader,                  
                ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
                'content-type': 'application/json',
            },
        });
    
        if (!res.ok) {
          return NextResponse.json({ error: 'Failed to increment' }, { status: res.status });
        }
    
        const data = await res.json();
        return NextResponse.json(data);
      } catch (e: any) {
        return NextResponse.json({ error: e.message ?? 'Unexpected error' }, { status: 500 });
      }
}