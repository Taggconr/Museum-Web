import React from 'react';
import Container from "@/components/shared/container";
import Link from "next/link";

const GoExhibits = () => {
    return (
        <div id="goExhibits" >
            <Container  className="mt-[120px] flex flex-col justify-center items-center text-[#4A362A]">
                <h3 className="font-bold xs:text-[23px] md:text-[30px] lg:text-[40px] xl:text-[50px] flex xs:flex-col md:flex-row items-center ">
                    ХРАНИМ ПРОШЛОЕ,<span className={""}>ОТКРЫВАЕМ БУДУЩЕЕ</span>
                </h3>
                <Link href={"/exhibits"} className={"xs:px-[33px] xs:py-[18px]   md:px-[120px]  md:py-[45px] xs:mt-[33px] md:mt-[80px] rounded-[20px] bg-[#FFE7CC] cursor-pointer transition-colors duration-300 hover:bg-[#E9D4BD] font-semibold xs:text-[23px] md:text-[50px]"}>
                    Начать экскурсию
                </Link>
            </Container>
        </div>
    );
};

export default GoExhibits;