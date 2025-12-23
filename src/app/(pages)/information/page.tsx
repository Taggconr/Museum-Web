import React from 'react';
import InformationBaner from "@/components/section/information-baner";
import InformationsCards from "@/components/widgets/informationsCards";
import Ticher from "@/components/section/ticher";
import AllExhibitsSlider from "@/components/section/AllExhibits-slider";

const InformationPage = () => {
    return (
        <div>
            <InformationBaner name="О музее" text={"Миссии, преподаватель, коллекция"} description={"Наш музей — это пространство, где прошлое встречается с настоящим. Здесь собраны уникальные экспонаты, отражающие многовековую историю культуры и науки. Мы сохраняем наследие, делаем его доступным и вдохновляем на новые открытия."}/>
            <InformationsCards />
            <Ticher />
            <AllExhibitsSlider />
        </div>
    );
};

export default InformationPage;