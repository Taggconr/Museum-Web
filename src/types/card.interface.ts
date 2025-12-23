import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface CardI {
    id?: string,
    title: string;
    titleDouble?: string;
    classNameTitleOne?: string;
    classNameTitleTwo?: string;
    image: string | StaticImport;
    icon: string | StaticImport
    subtitle?: string;
    description?: string;
    descriptionDouble?: string;
    descriptionThreeple?: string;
}