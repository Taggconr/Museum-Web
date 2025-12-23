import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface InformationCardI {
    id?: string,
    image: string | StaticImport;
    title: string;
    description?: string;
    descriptionDouble?: string;
}