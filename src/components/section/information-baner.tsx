import React from 'react';
import Container from "@/components/shared/container";
import Image from "next/image";
import bookImg from "../../../public/static/book.png";

interface IInformationBanerProps {
    name: string;
    text: string;
    description: string;
}

const InformationBaner = ({ name, text, description}: IInformationBanerProps) => {
    return (
        <div className={"mt-[40px]"}>
            <Container>
                <div className="w-full flex xs:flex-col md:flex-row items-center justify-center bg-[#FFF8F1] rounded-[20px] py-[110px] px-[50px]">
                    <div className="xs:flex md:hidden ">
                        <Image height={449} width={432} src={bookImg} alt={"book"} />
                    </div>
                    <div className="xs:text-center md:text-left xs:flex xs:flex-col md:flex-2">
                        <h1 className=" xs:text-[70px] lg:text-[90px] xl:text-[100px] font-bold ">
                            {name}
                        </h1>
                        <h2 className="xs:text-[30px] pt-[8px] lg:text-[40px] xl:text-[50px] font-semibold ">
                            {text}
                        </h2>
                        <h3 className="text-[25px] pt-[40px] font-regular ">
                            {description}
                        </h3>
                    </div>
                    <div className="xs:hidden md:flex md:flex-1">
                        <Image height={449} width={432} src={bookImg} alt={"book"} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default InformationBaner;