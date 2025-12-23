import React from 'react';
import {CARDS_DATA} from "@/data/card-data";
import {Card} from "@/components/ui/card";

const MissionsCards = () => {
    return (
        <div>
            <div className={"mt-[100px] grid xs:gap-y-[25px] md:gap-y-0  xs:grid-cols-1 md:grid-cols-3 gap-x-[25px]"}>
                {CARDS_DATA.map((card) => (
                    <Card key={card.id} data={card} />
                ))}
            </div>
        </div>

    );
};

export default MissionsCards;