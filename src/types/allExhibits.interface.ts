import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface AllExhibitsI {
    id: string;
    images: string[] | StaticImport[];
    title: string;
    subtitle: string;
}