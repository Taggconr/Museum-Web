import React from 'react';
import sliderImageOne from '../../../public/static/missionCardTwo.png';
import Image from "next/image";
import Container from "@/components/shared/container";
const Slider = () => {
    return (
        <div>
            <Container className="flex justify-center items-center mt-[49px]">
                <div className="w-full h-[268px] bg-[#F5E5D3] border-[1px] border-[#BD9E7B] rounded-[20px] overflow-x-scroll overflow-hidden flex justify-center items-center gap-x-[25px] snap-x snap-mandatory snap-center">
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] pb-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] pb-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                    <Image width={197} height={180} src={sliderImageOne} alt={'exhibits'} className="py-[44px] px-[22px]" />
                </div>
            </Container>

        </div>
    );
};

export default Slider;