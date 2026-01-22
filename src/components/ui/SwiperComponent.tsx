'use client';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination, Navigation, Scrollbar, A11y } from 'swiper/modules';
import {ALLEXHIBITS_DATA} from "@/data/allExhibits-data";
import {AllExhibitsI} from "@/types/allExhibits.interface";
import Image from "next/image";


const SwiperComponent = () => {

    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={25}
            slidesPerView={1}
            breakpoints={
                {
                    760: {slidesPerView: 2},
                    1024: {slidesPerView: 3},
                    1280: {slidesPerView: 5},
                    1920: {slidesPerView: 6},
                }
            }
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            loop={true}
            className={'mt-[50px] flex flex-col items-center justify-center h-[268px] w-[270px]  md:w-[499px] lg:w-[801px] xl:w-[1108px] 2xl:w-[1439px] bg-[#F5E5D3] border-[1px] border-[#BD9E7B] rounded-[20px]'}
        >
            {ALLEXHIBITS_DATA.map((item, index) => (
                <SwiperSlide key={item.id}>
                    <Image src={item.image} alt={'exhibits'} width={197} height={180} className={'flex items-center justify-center pt-[35px] pb-[53px]  w-full h-full'}/>
                </SwiperSlide>
            ))}
            <div className="hidden md:block">
                <div
                    className="swiper-button-next  bg-[#BD9E7B]/90 hover:bg-[#BD9E7B]/70 p-2 rounded-full"
                    style={{
                        '--swiper-navigation-color': '#4A362A',
                        '--swiper-navigation-size': '60px'
                    }}
                ></div>
                <div
                    className="swiper-button-prev bg-[#BD9E7B]/90 hover:bg-[#BD9E7B]/70 p-2 rounded-full"
                    style={{
                        '--swiper-navigation-color': '#4A362A',
                        '--swiper-navigation-size': '60px'
                    }}
                ></div>
            </div>

        </Swiper>
    );
};

export default SwiperComponent;
