// src/components/widgets/navigation.tsx
'use client';

import React, { useState } from 'react';
import Container from "@/components/shared/container";
import Logo from "@/components/ui/logo";
import NavigationLinks from "@/components/ui/navigation-links";
import MobileMenuButton from "@/components/ui/mobile-menu-button";
import { MobileMenu } from "@/components/widgets/mobile-menu";
import CheckCookies from './check-cookies';

interface MenuProps {
    onTogglePanel: () => void;
}

const Navigation = ({ onTogglePanel }: MenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={"bg-[#FFEDDA]"}>
            <Container className={"flex justify-between items-center"}>
                <Logo />
                <NavigationLinks className={"xs:hidden lg:flex"} />
                <MobileMenuButton onClick={() => setIsMenuOpen(true)} />
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                <CheckCookies onTogglePanel={onTogglePanel} />
            </Container>
        </div>
    );
};

export default Navigation;