import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
    const res = await fetch(`${API_URL}/api/daily`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
