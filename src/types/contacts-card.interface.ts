import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface ContactsCardI {
    id?: string | number;
    title: string;
    image: string | StaticImport;
    description?: string;
    link?: string;
}