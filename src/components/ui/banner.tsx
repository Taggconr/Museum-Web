import React from 'react';
import {cn} from "@/lib/utils";

interface IBanerProps {
    className?: string;
    text: string;
}

const Banner = ({ className, text}:IBanerProps) => {
    return (
            <div className="bg-[url('/static/banner.png')] w-full xs:bg-repeat md:bg-no-repeat xs:bg-contain md:bg-contain bg-center xs:h-[151px] md:h-[275px] flex justify-center items-center">
            <h1 className={cn(className, "text-[#4A362A] font-bold xs:text-[40px] md:text-[80px]")}>
                {text}
            </h1>
        </div>
    );
};

export default Banner;