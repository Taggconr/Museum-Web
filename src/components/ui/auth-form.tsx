'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PanelProps {
    isOpen: boolean;
}

export default function AuthForm({ isOpen }: PanelProps) {
    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    if (!isOpen) return null;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            if (res.ok) {
                window.location.replace('/dashboard/users');
            } else {
                const data = await res.json();
                setError(data.message || 'Неверный логин или пароль');
            }
        } catch (err) {
            setError('Ошибка сети. Проверьте подключение.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-20 right-10 z-20" data-auth-panel>
            <form
                className="bg-white border-black border-1 rounded-lg p-4 grid gap-3 w-[300px] justify-center"
                onSubmit={handleLogin}
            >
                <h3 className="text-[#4A362A] font-bold text-[30px]">Авторизация</h3>
                <input
                    className="w-full p-2 border rounded-lg border-gray-400"
                    type="text"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    disabled={loading}
                    required
                />
                <input
                    className="w-full p-2 border rounded-lg border-gray-400"
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    className="p-3 rounded-lg bg-[#FFEEDD] text-[#4A362A] cursor-pointer transition-colors duration-300 hover:bg-[#EEE4DA] font-medium"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Вход...' : 'Логин'}
                </button>
            </form>
        </div>
    );
}