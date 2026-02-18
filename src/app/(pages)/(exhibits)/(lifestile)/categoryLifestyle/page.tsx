import React from 'react';
import { ALL_EXHIBITS_DATA } from "@/data/allExhibits-data";
import Link from "next/link";
import Banner from "@/components/ui/banner";
import Container from "@/components/shared/container";
import Image from "next/image";

const CategoryLifestilePage = () => {
    const CURRENT_CATEGORY_ID = 'lifestyle';

    const filteredExhibits = ALL_EXHIBITS_DATA.filter(exhibit =>
        exhibit.categoryId === CURRENT_CATEGORY_ID
    );

    return (
        <Container className={"mt-[40px]"}>
            <Banner className={"text-2xl font-bold mb-6"} text={"БЫТ"} />
            {filteredExhibits.length > 0 ? (
                <div className="mt-[120px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExhibits.map(exhibit => (
                        <Link  href={`/exhibit/${exhibit.id}`} key={exhibit.id} className="border-[1px] border-[#BD9E7B] bg-[#F5E5D3] flex flex-col text-center rounded-lg p-4">
                            <Image height={100} width={100} className={"w-full h-[425px] object-cover"} src={exhibit.images[1]} alt={exhibit.title} />
                            <h3 className="text-lg font-semibold mt-[26px]">{exhibit.title}</h3>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 italic">В этой категории пока нет товаров</p>
            )}
        </Container>
    );
};

export default CategoryLifestilePage;
