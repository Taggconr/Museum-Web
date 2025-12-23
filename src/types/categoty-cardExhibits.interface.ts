import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface ICardExhibits {
    id: string | number;
    image: string | StaticImport;
    title: string;
    link: string;
}