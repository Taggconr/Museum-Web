import React from 'react';


import {DATA_CARD_EXHIBITS} from "@/data/categoty-cardExhibits-data";
import CardCategoryExhibits from "@/components/ui/card-category-exhibits";

const CategotyExhibits = () => {
    return (
        <div>
            <div className={"xs:mt-[40px] md:mt-[120px] grid xs:grid-cols-1 md:grid-cols-2 gap-[25px]"}>
                {DATA_CARD_EXHIBITS.map((card) => (
                    <CardCategoryExhibits key={card.id} data={card}/>
                ))}
            </div>
        </div>
    );
};

export default CategotyExhibits;