'use client';

import React, { useState } from 'react';

export default function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = async () => {
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                window.location.replace('/');
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.message || 'Ошибка при выходе');
            }
        } catch (err) {
            setError('Ошибка сети. Проверьте подключение.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                className="bg-black/20 w-[65px] h-full px-2 rounded-[5px] cursor-pointer duration-200 hover:w-[75px] text-black hover:text-black/70"
                onClick={handleLogout}
                disabled={isLoading}
            >
                {isLoading ? '...' : 'Выйти'}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}