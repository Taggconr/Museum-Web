import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface AllExhibitsI {
    id: string;
    categoryId: string,
    images: string[] | StaticImport[];
    title: string;
    subtitle: string;
}