// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL || 'https://museum-web-backend-m33d.vercel.app';

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'GET');
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'POST');
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'PUT');
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'DELETE');
}

async function proxyRequest(req: NextRequest, path: string[], method: string) {
    const pathStr = path.join('/');
    const url = `${BACKEND_URL}/${pathStr}`;

    let body: any = undefined;
    if (method !== 'GET' && method !== 'DELETE') {
        body = await req.json().catch(() => undefined);
    }

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    const nextRes = NextResponse.json(data, { status: response.status });

    // Если бэкенд вернул токен – устанавливаем куку для фронта
    if (data.access_token) {
        nextRes.cookies.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 день
        });
    }

    // Если это запрос на logout – очищаем куку
    if (pathStr === 'auth/logout') {
        nextRes.cookies.set('access_token', '', { maxAge: 0, path: '/' });
    }

    return nextRes;
}