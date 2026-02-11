import React from 'react';
import Container from "@/components/shared/container";
import AllExhibitsSwiperComponent from "@/components/ui/all-exhibits-swiper-component";
import {Button} from "@/components/ui/button";
import Link from "next/link";


const AllExhibitsSlider = () => {
    return (
        <div className={"mt-[120px]"}>
            <Container>
                <div className="w-full flex  justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-center font-bold text-[50px] text-[#4A362A]">
                            Более 40 экспонатов!
                        </h1>
                        <AllExhibitsSwiperComponent />
                        <Link href={'/exhibits'} className={'flex justify-center items-center mt-[60px] w-[260px] h-[70px] md:w-[465px] md:h-[130px] bg-[#FFE7CC] hover:bg-[#FFE7CC]/80 rounded-[20px] font-medium text-[#4A362A] hover:text-[#4A362A]/80 text-[20px] md:text-[35px]'}>
                            Перейти к экспонатам
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AllExhibitsSlider;