'use client'
import React, { useEffect, useState } from 'react';
import { ALL_EXHIBITS_DATA } from "@/data/allExhibits-data";
import Link from "next/link";
import Banner from "@/components/ui/banner";
import Container from "@/components/shared/container";
import Image from "next/image";

interface Exhibit {
    id: string;
    category: string;
    title: string;
    subtitle: string;
    images: Images[];
}

interface Images {
    id: string;
    image: string;
}

const CategoryVovPage = () => {
    const CURRENT_CATEGORY_ID = 'vov';

    const [exhibits, setExhibits] = useState<Exhibit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExhibits = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exhibits`, {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setExhibits(data);
                } else {
                    console.error('Ошибка загрузки:', res.status);
                }
            } catch (err) {
                console.error('Сетевая ошибка:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchExhibits();
    }, []);

    const filteredExhibits = exhibits.filter(exhibit =>
        exhibit.category === CURRENT_CATEGORY_ID
    );

    return (
        <Container className={"mt-[40px]"}>
            <Banner className={"text-2xl font-bold mb-6"} text={"Великая отечественная война"} />
            {filteredExhibits.length > 0 ? (
                <div className="mt-[120px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExhibits.map(exhibit => (
                        <Link href={`/exhibit/${exhibit.id}`} key={exhibit.id} className="border-[1px] border-[#BD9E7B] bg-[#F5E5D3] flex flex-col text-center rounded-lg p-4">
                            <Image height={100} width={100} className={"w-full h-[425px] object-cover"} src={exhibit.images[1].image} alt={exhibit.title} />
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

export default CategoryVovPage;
