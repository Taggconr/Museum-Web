import React from 'react';
import Container from "@/components/shared/container";
import ticherImg from "../../../public/static/ticher.png"
import Image from "next/image";
const Ticher = () => {
    return (
        <div className={"mt-[120px]"}>
            <Container>
                <div className="flex  xs:flex-col md:flex-row">
                    <div className="">
                        <Image width={300} height={300} src={ticherImg} alt={"ticher"} className={"rounded-[20px] xs:w-full md:w-[300px] h-[300px] object-cover overflow-hidden"}/>
                    </div>
                    <div className="flex flex-col justify-center xs:text-center md:text-left xs:pl-0 md:pl-[35px]">
                        <h5 className="text-[40px] font-semibold text-[#4A362A]">Серогазова Ольга Юрьевна</h5>
                        <h6 className="pt-[25px] text-[30px] font-medium text-[#4A362A]">Учитель истории</h6>
                        <p className="pt-[25px] text-[20px] font-regular text-[#4A362A]">Ответственный за ведение музейного уголка</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Ticher;