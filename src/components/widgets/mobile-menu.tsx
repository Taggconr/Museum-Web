"use client"

import React, { useEffect } from 'react';
import {MENU_DATA} from "@/data/menu-data";
import Link from "next/link";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    // Блокируем скролл страницы при открытом меню
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Закрытие по Esc
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40">
            {/* Затемняющий фон */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Панель меню */}
            <div className={`absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#FFEDDA] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Шапка с кнопкой закрытия */}
                <div className="flex items-center justify-between p-6 border-b border-[#FFD2A1]">
                    <h3 className="font-semibold text-[#1D1D1D] text-lg">Меню</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#563206] hover:text-[#563206]/70 focus:outline-none"
                        aria-label="Закрыть меню"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Пункты меню */}
                <nav className="p-6">

                    <menu className={"flex flex-col lg:gap-x-[30px] xl:gap-x-[100px]"}>
                        {MENU_DATA.map((item, index) => (
                            <li key={index} className={"flex pt-[25px]"}>
                                <Link href={item.href} className={"text-[#1D1D1D] px-2 border-b-[4px] border-transparent transition-colors duration-200 hover:text-[#545454] hover:border-[#FBDAB7]"}
                                      onClick={(e) => {

                                          onClose(); // Закрываем меню при клике на пункт
                                      }}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </menu>
                </nav>
            </div>
        </div>
    );
};
