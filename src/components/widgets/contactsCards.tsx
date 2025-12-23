import React from 'react';
import {CONTACTS_CARDS_DATA} from "@/data/contacts-card-data";
import {ContactsCard} from "@/components/ui/card-contacts";

const ContactsCards = () => {
    return (
        <div>
            <div className={"mt-[75px] grid gap-[25px] xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}>
                {CONTACTS_CARDS_DATA.map((card) => (
                    <ContactsCard key={card.id} data={card}/>
                ))}
            </div>
        </div>
    );
};

export default ContactsCards;