// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL || 'https://museum-web-backend-m33d.vercel.app';

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'GET');
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'PUT');
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'DELETE');
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    return proxyRequest(req, path, 'POST');
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

async function proxyRequest(req: NextRequest, path: string[], method: string) {
    const pathStr = path.join('/');
    const url = `${BACKEND_URL}/${pathStr}`;

    // Извлекаем токен из куки (если есть)
    const token = req.cookies.get('access_token')?.value;

    // Формируем заголовки для запроса к бэкенду
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Если токен есть и это не запрос на логин – добавляем Authorization
    if (token && !pathStr.startsWith('auth/login')) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let body: any = undefined;
    if (method !== 'GET' && method !== 'DELETE') {
        body = await req.json().catch(() => undefined);
    }

    // --- ЛОГИРОВАНИЕ ---
    console.log(`[Proxy] ${method} ${url}`);
    console.log(`[Proxy] token present: ${!!token}`);
    console.log(`[Proxy] pathStr: ${pathStr}`);
    console.log(`[Proxy] headers:`, headers);
    if (body) console.log(`[Proxy] body:`, body);
    // --------------------

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    // --- ЛОГИРОВАНИЕ ОТВЕТА ---
    console.log(`[Proxy] response status: ${response.status}`);
    console.log(`[Proxy] response data:`, data);
    // -------------------------

    const nextRes = NextResponse.json(data, { status: response.status });

    // Если это ответ на логин и в теле есть access_token – устанавливаем куку для фронта
    if (pathStr === 'auth/login' && data.access_token) {
        console.log('[Proxy] Setting cookie for frontend domain');
        nextRes.cookies.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 день
        });
    }

    // Если это запрос на logout – очищаем куку на фронте
    if (pathStr === 'auth/logout') {
        console.log('[Proxy] Clearing cookie on logout');
        nextRes.cookies.set('access_token', '', { maxAge: 0, path: '/' });
    }

    return nextRes;
}