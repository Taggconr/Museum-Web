'use client';

import React, { useEffect, useState } from 'react';
import LoginButton from '../ui/login-button';
import Link from 'next/link';
import { LuLayoutPanelTop } from 'react-icons/lu';

interface MenuProps {
    onTogglePanel: () => void;
}

const CheckCookies = ({ onTogglePanel }: MenuProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
        console.log('Нет переменной')
    }
    useEffect(() => {
        // Проверяем авторизацию через API (кука отправится автоматически)
        const checkAuth = async () => {
            try {
                const res = await fetch(`${url}/profile`, {
                    credentials: 'include', // передаём куку    
                });
                setIsAuthenticated(res.ok);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div className="w-8 h-8" />; // скелетон или просто пустота
    }

    return (
        <div>
            {isAuthenticated ? (
                <Link
                    className="cursor-pointer text-[25px] text-[#1D1D1D] px-2 transition-colors duration-200 hover:text-[#545454]"
                    href="/dashboard/users"
                >
                    <LuLayoutPanelTop />
                </Link>
            ) : (
                <LoginButton onClick={onTogglePanel} />
            )}
        </div>
    );
};

export default CheckCookies;