import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface FooterI {
    id: string | number;
    name: string;
    text?: string;
    icon: string | StaticImport;
    link?: string;
}