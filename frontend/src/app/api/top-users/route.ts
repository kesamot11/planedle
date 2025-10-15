import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
    try {
    
        const res = await fetch(`${API_URL}/api/users/top-users`, {
            method: 'GET',
            headers: {
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