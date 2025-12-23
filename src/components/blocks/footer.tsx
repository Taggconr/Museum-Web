import React from 'react';
import Container from "@/components/shared/container";
import Logo from "@/components/ui/logo";
import {FooterI} from "@/types/footer.interface";
import {FOOTER_DATA} from "@/data/footer-data";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-[#000000]/10 mt-[120px] py-[25px] flex justify-between ">
            <Container className="flex justify-center items-center xs:flex-col lg:flex-row pb-[25px]">
                <Logo />
                <div className="flex xs:flex-col md:flex-row items-center xs:ml-0 lg:ml-[29px] xl:ml-[100px] gap-x-[88px]">
                    {FOOTER_DATA.map((item: FooterI, index) => (
                        <div key={item.id || index} className="flex xs:py-[25px] md:py-0 flex-col justify-center items-center">
                            <div className="">
                                {item.id === 2 && (
                                    <div className="relative xs:top-0 md:top-[13px]">
                                        {item.name}
                                    </div>
                                )}
                                {item.id === 1 && (
                                    <div className="relative xs:top-0 md:bottom-[5px]">
                                        {item.name}
                                    </div>
                                )}
                                {item.id === 3 && (
                                    <div className="">
                                        {item.name}
                                    </div>
                                )}
                            </div>

                            <div className="xs:py-[25px] md:py-0">
                                {item.id === 1 && (
                                    <p className="relative xs:top-0 md:top-[25px]">{item.text} </p>
                                )}
                                {item.id === 2 && (
                                    <a href={item.link}  target="_blank" rel="noopener noreferrer"  className="w-[62px] h-[62px]">
                                        <Image
                                        width={60}
                                        height={60}
                                        src={item.icon}
                                        alt={'iconVK'}
                                        className={"relative xs:top-0 md:top-[25px]"}
                                    />
                                    </a>
                                )}
                                {item.id === 3 && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="" >
                                        <p className={"relative xs:top-0 md:top-[25px] border-b-[2px] border-transparent text-[#000000] inline-block text-[20px] duration-300 hover:border-[#5F5F5F] hover:text-[#353535]"}>Перейти</p>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>


            </Container>
        </div>
    );
};

export default Footer;