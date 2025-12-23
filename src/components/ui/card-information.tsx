import React from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {InformationCardI} from "@/types/information-card.interface";

interface CardInfoProps {
    data: InformationCardI;
}

const CardInformation = ({ data }: CardInfoProps) => {
    return (
        <div className="flex flex-col justify-center items-center text-center rounded-[20px] bg-[#F5E5D3] border-[1px] border-[#BD9E7B]">
            <Image className={"w-[100px] pt-[33px]"} width={100} height={100} src={data.image} alt={data.title} />
            <h5 className="text-[23px] font-semibold pt-[25px] px-[25px]">
                {data.title}
            </h5>
            <div className="flex flex-col text-[18px] text-left px-[28px] py-[25px]">
                <span
                    className="pl-[24px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[10px] before:h-[10px] before:rounded-full before:bg-[#4A362A] before:-translate-y-1/2"
                    style={{ display: 'inline-block', width: '100%' }} >
                       {data.description}
                     </span>
                <p className="flex items-center justify-between relative">
                     <span
                         className="pl-[24px] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[10px] before:h-[10px] before:rounded-full before:bg-[#4A362A] before:-translate-y-1/2"
                         style={{ display: 'inline-block', width: '100%' }} >
                       {data.descriptionDouble}
                     </span>
                </p>
            </div>
        </div>
    );
};

export default CardInformation;