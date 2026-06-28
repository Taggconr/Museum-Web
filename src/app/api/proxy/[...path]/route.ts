// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL || 'https://museum-web-backend-m33d.vercel.app';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params, 'GET');
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params, 'POST');
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params, 'PUT');
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params, 'DELETE');
}

async function proxyRequest(req: NextRequest, params: { path: string[] }, method: string) {
    const path = params.path.join('/');
    const url = `${BACKEND_URL}/${path}`;

    // Получаем тело запроса (если есть)
    let body: any = undefined;
    if (method !== 'GET' && method !== 'DELETE') {
        body = await req.json().catch(() => undefined);
    }

    // Делаем запрос к бэкенду
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            // Если нужно передать какие-то заголовки от клиента (например, Authorization) – добавьте
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    // Получаем данные ответа
    const data = await response.json();

    // Создаём ответ для клиента
    const nextRes = NextResponse.json(data, { status: response.status });

    // Если бэкенд вернул токен (например, в поле access_token) – установим куку для фронта
    if (data.access_token) {
        nextRes.cookies.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 день (в секундах)
        });
    }

    // Если бэкенд вернул ошибку – просто передаём её дальше
    return nextRes;
}