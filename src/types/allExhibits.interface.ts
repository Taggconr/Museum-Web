import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface AllExhibitsI {
    id: string;
    image: string | StaticImport;
}