import React from 'react';
import {MENU_DATA} from "@/data/menu-data";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Menu} from "@/types/menu.interface";
import {ClassNameIProps} from "@/types/className.interface";

const NavigationLinks = ({className}:ClassNameIProps ) => {
    return (
        <menu className={"flex lg:gap-x-[30px] xl:gap-x-[100px]"}>
            {MENU_DATA.map((item, index) => (
                <li key={index} className={cn(className, "flex")}>
                    <Link href={item.href} className={"text-[#1D1D1D] px-2 border-b-[4px] border-transparent transition-colors duration-200 hover:text-[#545454] hover:border-[#FBDAB7]"}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </menu>
    );
};

export default NavigationLinks;