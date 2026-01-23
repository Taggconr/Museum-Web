'use client';
import { useRef } from 'react'; // Исправлено: useRef → useRef
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import { ALLEXHIBITS_DATA } from '@/data/allExhibits-data';
import Image from 'next/image';
import {NavigationOptions} from "swiper/types";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const SwiperComponent = () => {
    const navigationNextRef = useRef<HTMLButtonElement>(null);
    const navigationPrevRef = useRef<HTMLButtonElement>(null);

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={25}
            slidesPerView={1}
            breakpoints={{
                760: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 5 },
                1920: { slidesPerView: 6 },
            }}
            navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
            }}
            onInit={(swiper) => {
                if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation !== 'boolean' &&
                    navigationPrevRef.current &&
                    navigationNextRef.current
                ) {
                    const navigation = swiper.params.navigation as NavigationOptions;

                    navigation.prevEl = navigationPrevRef.current;
                    navigation.nextEl = navigationNextRef.current;

                    swiper.navigation.init();
                    swiper.navigation.update();
                }
            }}

            loop={true}
            className="mt-[50px] flex flex-col items-center justify-center h-[268px] w-[270px] md:w-[499px] lg:w-[801px] xl:w-[1108px] 2xl:w-[1439px] bg-[#F5E5D3] border-[1px] border-[#BD9E7B] rounded-[20px]"
        >
            {ALLEXHIBITS_DATA.map((item) => (
                <SwiperSlide key={item.id}>
                    <Image
                        src={item.image}
                        alt="exhibits"
                        width={197}
                        height={180}
                        className="flex items-center justify-center pt-[35px] pb-[53px] w-full h-full"
                    />
                </SwiperSlide>
            ))}
            <button
                ref={navigationNextRef}
                className="cursor-pointer absolute right-[5px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full h-[88px] w-[88px] bg-[#BD9E7B]/90 transition-colors duration-200 hover:bg-[#BD9E7B]/80"
            >
                <FaAngleRight size={45}/>
            </button>
            <button
                ref={navigationPrevRef}
                className="cursor-pointer absolute left-[5px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full h-[88px] w-[88px] bg-[#BD9E7B]/90 transition-colors duration-200 hover:bg-[#BD9E7B]/80"
            >
                <FaAngleLeft size={45}/>
            </button>
        </Swiper>
    );
};

export default SwiperComponent;
