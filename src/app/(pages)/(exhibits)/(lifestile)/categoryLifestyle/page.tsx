import React from 'react';
import { ALL_EXHIBITS_DATA } from "@/data/allExhibits-data";
import Link from "next/link";

const CategoryLifestilePage = () => {
    const CURRENT_CATEGORY_ID = 'lifestyle';

    const filteredExhibits = ALL_EXHIBITS_DATA.filter(exhibit =>
        exhibit.categoryId === CURRENT_CATEGORY_ID
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Товары категории лайфстайл
            </h1>
            {filteredExhibits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExhibits.map(exhibit => (
                        <Link  href={`/exhibit/${exhibit.id}`} key={exhibit.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold">{exhibit.title}</h3>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 italic">В этой категории пока нет товаров</p>
            )}
        </div>
    );
};

export default CategoryLifestilePage;
