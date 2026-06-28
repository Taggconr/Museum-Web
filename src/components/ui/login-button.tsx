'use client';
import React from 'react';
import { RiLoginBoxFill } from "react-icons/ri";

interface ButtonProps {
    onClick: () => void;
}

export default function LoginButton({ onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer text-[25px] text-[#1D1D1D] px-2 transition-colors duration-200 hover:text-[#545454]"
            data-auth-toggle
        >
            <RiLoginBoxFill />
        </button>
    );
}