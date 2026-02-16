import {ICardExhibits} from "@/types/categoty-cardExhibits.interface";

export const DATA_CARD_EXHIBITS: ICardExhibits[] = [
    {
        id: 1,
        categoryId: 'vov',
        image: "/static/helmetExhibit.png",
        title: "Великая Отечественная война",
        link: "/categoryVov",
    },
    {
        id: 2,
        categoryId: 'lifestyle',
        image: "/static/lifestyleExhibit.png",
        title: "Быт",
        link: "/categoryLifestyle",
    },
    {
        id: 3,
        categoryId: 'history',
        image: "/static/historyExhibit.png",
        title: "Краеведческий уголок",
        link: "/categoryHistory",
    },
    {
        id: 4,
        categoryId: 'svo',
        image: "/static/peopleSvoExhibit.png",
        title: "Участники Специальной Военной Операции",
        link: "/categorySvo",
    },
]

