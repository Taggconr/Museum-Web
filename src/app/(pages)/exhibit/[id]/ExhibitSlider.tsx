'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import {Navigation} from "swiper/modules";
import {useRef} from "react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import {NavigationOptions} from "swiper/types";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

interface ExhibitSliderProps {
    images: string[] | StaticImport[];
    title: string;
}

export default function ExhibitSlider({ images, title }: ExhibitSliderProps) {
    const navigationNextRef = useRef<HTMLButtonElement>(null);
    const navigationPrevRef = useRef<HTMLButtonElement>(null);

    return (
        <Swiper
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            modules={[Navigation]}
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
            className="m-[36px] w-[300px] md:w-[500px]"
        >
            {images.map((imageSrc, index) => (
                <SwiperSlide key={index} className={""}>
                    <Image
                        src={`/${imageSrc}`}
                        alt={`${title}, изображение ${index + 1}`}
                        width={500}
                        height={500}
                        loading="lazy"
                        className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] object-cover rounded-[20px]"
                    />
                </SwiperSlide>
            ))}
            <div className="">
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
            </div>
        </Swiper>
    );
}
