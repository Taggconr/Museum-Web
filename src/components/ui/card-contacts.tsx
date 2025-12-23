"use client"
import React from 'react';
import Image from "next/image";
import { StaticImport} from "next/dist/shared/lib/get-img-props";
import {cn} from "@/lib/utils";
import {ContactsCardI} from "@/types/contacts-card.interface";
import { FaArrowRightLong } from "react-icons/fa6";

interface ContactsCardProps {
    data: ContactsCardI;
}

export const ContactsCard= ({ data }: ContactsCardProps) => {
    return (
        <div className="flex flex-col  rounded-[20px] overflow-hidden shadow-md border-[1px] border-[#BD9E7B] bg-[#F5E5D3]">
            <h4 className="px-[30px] pt-[30px] flex items-center justify-center font-semibold  text-[#4A362A]">
                {data.title}
            </h4>
            <div className="xs:px-[20px] md:px-[50px] lg:px-[30px] py-[45px] flex xs-flex-col md:flex-row items-center justify-between font-medium">
                <Image
                    src={data.image}
                    alt={data.title}
                    height={100}
                    width={100}
                />
                {(data.id === 1 || data.id === 2) && (
                    <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-[6px] px-[12px] rounded-[10px] bg-[#FFF6EB] border-[1px] border-[#DAC5AC] transition-colors duration-300 hover:bg-[#F5E7D7] hover:border-[#EACEAF]  flex gap-x-[10px] items-center justify-center"
                    >
                        {data.description}
                        <FaArrowRightLong />
                    </a>
                )}
                {(data.id === 3) && (
                    <p className="py-[6px] px-[12px]">
                        {data.description}
                    </p>
                )}
            </div>
        </div>
    );
};