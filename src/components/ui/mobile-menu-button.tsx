"use client"
import React from 'react';
import { useState } from 'react';
import {Button} from "@/components/ui/button";
import { IoMenu } from "react-icons/io5";

interface MenuButtonProps {
    onClick: () => void;
}
const MobileMenuButton = ({ onClick }: MenuButtonProps) => {
    return (
        <div>
            <Button onClick={onClick} className={"md:flex lg:hidden"}>
                <IoMenu color={"#563206"} size={"66"}/>
            </Button>
        </div>
    );
};

export default MobileMenuButton;