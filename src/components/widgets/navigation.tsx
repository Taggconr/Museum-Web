"use client"
import React from 'react';
import { useState } from 'react';
import Container from "@/components/shared/container";
import Logo from "@/components/ui/logo";
import NavigationLinks from "@/components/ui/navigation-links";
import MobileMenuButton from "@/components/ui/mobile-menu-button";
import {MobileMenu} from "@/components/widgets/mobile-menu";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className={"bg-[#FFEDDA]"}>
            <Container className={"flex justify-between items-center"}>
                <Logo/>
                <NavigationLinks className={"xs:hidden lg:flex"}/>
                <MobileMenuButton onClick={() => setIsMenuOpen(true)}/>
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
            </Container>
        </div>
    );
};

export default Navigation;