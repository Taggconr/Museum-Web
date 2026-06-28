'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navigation from "@/components/widgets/navigation";
import AuthForm from '../ui/auth-form';

const Header = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    const togglePanel = () => setIsPanelOpen(!isPanelOpen);

    useEffect(() => {
        if (!isPanelOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            const isClickInsidePanel = target.closest('[data-auth-panel]') !== null;
            const isClickOnToggle = target.closest('[data-auth-toggle]') !== null;

            if (!isClickInsidePanel && !isClickOnToggle) {
                setIsPanelOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsPanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPanelOpen]);

    return (
        <header className='fixed top-[-1] left-0 w-full z-50'>
            <Navigation onTogglePanel={togglePanel} />
            <AuthForm isOpen={isPanelOpen} />
        </header>
    );
};

export default Header;