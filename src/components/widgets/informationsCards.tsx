import React from 'react';
import {Card} from "@/components/ui/card";
import {INFORMATION_CARDS_DATA} from "@/data/information-card-data";
import CardInformation from "@/components/ui/card-information";
import Container from "@/components/shared/container";

const InformationsCards = () => {
    return (
        <div>
            <Container>
                <div className={"mt-[120px] grid xs:gap-y-[25px] md:gap-y-0  xs:grid-cols-1 md:grid-cols-3 gap-x-[25px]"}>
                    {INFORMATION_CARDS_DATA.map((card) => (
                        <CardInformation key={card.id} data={card} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default InformationsCards;