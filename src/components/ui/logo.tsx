import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link className={"flex items-center"} href="/">
            <Image className={"py-[5px]"} width={70} height={70} src={"static/Logo.svg"} alt="Logotype"/>
            <p className="text-[18px] font-semibold text-[#000000] xs:hidden md:flex pl-[15px]">
                ВИРТУАЛЬНЫЙ МУЗЕЙ
                <span className="pl-[15px]">
                    МОУ СОШ Х. КРАСНЫЙ САД
                </span>
            </p>
        </Link>
    );
};

export default Logo;