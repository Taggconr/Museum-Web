// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'access_token';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    const isAuthenticated = !!sessionCookie;
    const { pathname } = request.nextUrl;

    // Если пользователь НЕ авторизован и запрашивает защищённую страницу
    if (!isAuthenticated && pathname.startsWith('/dashboard')) {
        // Редирект на главную (там всплывёт панель входа)
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Если авторизован и запрашивает защищённую страницу — разрешаем доступ
    if (isAuthenticated && pathname.startsWith('/dashboard')) {
        const response = NextResponse.next();
        // Запрещаем кеширование, чтобы после выхода кнопка "назад" не показывала дашборд
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }

    // Для всех остальных путей (включая главную) просто пропускаем
    return NextResponse.next();
}

// Применяем middleware только к защищённым страницам
export const config = {
    matcher: ['/dashboard/:path*'],
};