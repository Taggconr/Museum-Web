import React from 'react';
import {Button} from "@/components/ui/button";
import { FaLongArrowAltDown } from "react-icons/fa";
import Image from "next/image";
import banerImg from "../../../public/static/hero-baner.png";
import Link from "next/link";

const HeroBaner = () => {
    return (
        <div className={"bg-[#FFF8F1] mt-[40px] rounded-[20px] md:grid md:grid-cols-2 md:justify-between xs:flex xs:flex-col xs:justify-center xs:items-center xs:text-center"}>
            <div className="relative sm:block md:hidden">
                <Image className={""} height={429} width={308}  src={banerImg} alt={'baner-image'} />
            </div>
            <div className="flex flex-col sm:text-center md:text-left text-[#4A362A] sm:pl-0 md:pl-[20px] xl:pl-[56px] pt-[20px] pb-[88px]">
                <h1 className="font-bold xs:text-[35px] md:text-[50px] xl:text-[80px]">ВИРТУАЛЬНЫЙ <p className="relative xs:bottom-[15px] md:bottom-[30px] xs:text-[65px] md:text-[80px] xl:text-[110px]">МУЗЕЙ</p></h1>
                <h2 className="relative xs:bottom-[25px] md:bottom-[40px] text font-semibold xs:text-[30px] xl:text-[40px]">Наследие, которое <p className="relative bottom-[25px] xs:text-[38px] xl:text-[51px]">живет сегодня</p></h2>
                <a href={"#goExhibits"} className={"xs:w-[282px] lg:w-[401px] xs:px-[20px] lg:px-[35px] py-[17px] rounded-[20px] bg-[#FFEEDD] text-[#4A362A] cursor-pointer transition-colors duration-300 hover:bg-[#EEE4DA] font-medium  xs:text-[30px] lg:text-[40px] sm:mx-auto md:mx-0 flex justify-center items-center"}>В путешествие<FaLongArrowAltDown className={"relative top-[5px]"} size={30}/></a>
            </div>
            <div className="relative xs:hidden md:block w-full h-[600px]">
                <Image className={"object-contain"} fill src={banerImg} alt={'baner-image'} />
            </div>
        </div>
    );
};

export default HeroBaner;