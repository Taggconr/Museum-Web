"use client"
import React from 'react';
import {ICardExhibits} from "@/types/categoty-cardExhibits.interface";
import Image from "next/image";
import Link from "next/link";

interface CardExhibits {
    data: ICardExhibits;
}

const CardCategoryExhibits = ({data}:CardExhibits) => {
    return (
        <Link href={data.link} className="flex rounded-[20px] overflow-hidden shadow-md border-[1px] border-[#BD9E7B] bg-[#F5E5D3] transition-colors duration-300 hover:bg-[#E9D7C2] hover:border-[#DDC3A6]">
            <div className="px-[33px] py-[16px] flex flex-col text-center items-center justify-center">
                <div className="">
                    <Image
                        src={data.image}
                        alt={data.title}
                        height={331}
                        width={639}
                        className="rounded-[10px]"
                    />
                </div>
                <h4 className={"py-[25px] font-bold xs:text-[18px] md:text-[20px]  text-[#4A362A]"}>
                    {data.title}
                </h4>
            </div>
        </Link>
    );
};

export default CardCategoryExhibits;