"use client"
import React from 'react';
import {CardI} from "@/types/card.interface";
import Image from "next/image";
import { StaticImport} from "next/dist/shared/lib/get-img-props";
import {cn} from "@/lib/utils";

interface CardProps {
    data: CardI;
}

export const Card= ({ data }: CardProps) => {
    return (
        <div className="flex flex-col  rounded-[20px]  pb-[40px]  overflow-hidden shadow-md border-[1px] border-[#BD9E7B] bg-[#F5E5D3]">

            <div className="px-[10px] flex flex-col items-center justify-center font-semibold  text-[#4A362A]">
                <h4 className={cn(data.classNameTitleOne, "")}>
                    {data.title}
                </h4>
                <h5 className={cn(data.classNameTitleTwo, "text-[25px]")}>
                    {data.titleDouble}
                </h5>
            </div>
            <div className="xs:hidden md:block px-[10px] pt-[45px] mx-auto relative w-[247px] h-[247px]">
                <Image
                    src={data.image}
                    alt={data.title}
                    height={247}
                    width={247}
                />
                <div className="absolute h-[80px] w-[75px] xs:left-[80%] xs:bottom-[60%] md:left-[70%] md:bottom-[70%] lg:left-[80%] lg:bottom-[60%]">
                    <Image width={75} height={80} alt={data.title} src={data.icon}/>
                </div>
            </div>
            <div className="px-[40px] flex flex-col  py-[35px]">
                <div className="text-[#563206] font-medium">
                    <p className="">
                        {data.title}
                    </p>
                </div>
                <div className="text-left text-[#5A3C17]">
                    <p className="">
                        {data.description}
                    </p>
                    <p className="">
                        {data.descriptionDouble}
                    </p>
                    <p className="">
                        {data.descriptionThreeple}
                    </p>
                </div>
            </div>
            <div className=" relative xs:block md:hidden px-[10px] xs:pt-[29px] md:pt-[47px] mx-auto w-[247px] h-[247px]">
                <Image
                    src={data.image}
                    alt={data.title}
                    height={247}
                    width={247}
                />
                <div className="absolute h-[80px] w-[75px] xs:left-[80%] xs:bottom-[80%] md:left-[70%] md:bottom-[70%] lg:left-[80%] lg:bottom-[60%]">
                    <Image width={75} height={80}  alt={data.title} src={data.icon}/>
                </div>
            </div>
        </div>
    );
};