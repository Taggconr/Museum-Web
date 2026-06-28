// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL || 'https://museum-web-backend-m33d.vercel.app';

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

// Аналогично для GET, PUT, DELETE ...

async function proxyRequest(req: NextRequest, path: string[], method: string) {
    const pathStr = path.join('/');
    const url = `${BACKEND_URL}/${pathStr}`;

    // Извлекаем токен из куки (если есть)
    const token = req.cookies.get('access_token')?.value;

    // Формируем заголовки для запроса к бэкенду
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Если токен есть и это не запрос на логин (где токена ещё нет), добавляем Authorization
    // Также для логаута (если он защищён) тоже передаём токен
    if (token && !pathStr.startsWith('auth/login')) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let body: any = undefined;
    if (method !== 'GET' && method !== 'DELETE') {
        body = await req.json().catch(() => undefined);
    }

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    const nextRes = NextResponse.json(data, { status: response.status });

    // Если это ответ на логин и в теле есть access_token – устанавливаем куку для фронта
    if (pathStr === 'auth/login' && data.access_token) {
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
        nextRes.cookies.set('access_token', '', { maxAge: 0, path: '/' });
    }

    return nextRes;
}