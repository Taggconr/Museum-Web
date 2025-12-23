import {CardI} from "@/types/card.interface";
import fkf from "../../public/static/missionCardOne.png"
import {InformationCardI} from "@/types/information-card.interface";
export const INFORMATION_CARDS_DATA: InformationCardI[] = [
    {
        id: '1',
        image: "/static/iconSave.png",
        title: 'Сохранение культурного наследия',
        description: "Cбор и хранение исторических артефактов",
        descriptionDouble: "Обеспечение физической и цифровой сохранности коллекций для будущих поколений",
    },
    {
        id: '2',
        image: "/static/iconBrain.png",
        title: 'Научно ‑ исследовательская деятельность',
        description: "Обеспечение доступа",
        descriptionDouble: "Развитие исследовательского потенциала",
    },
    {
        id: '3',
        image: "/static/iconBook.png",
        title: 'Просветительская и образовательная миссия',
        description: "Предоставить ресурсы для самообразования",
        descriptionDouble: "Продемонстрировать историю",
    },
]