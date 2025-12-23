import React from 'react';
import Container from "@/components/shared/container";
import Banner from "@/components/ui/banner";
import CategotyExhibits from "@/components/widgets/categoty-exhibits";

const Page = () => {
    return (
        <div className={"pt-[40px]"}>
            <Container>
                <Banner text={"ЭКСПОНАТЫ"}/>
                <CategotyExhibits />
            </Container>
        </div>
    );
};

export default Page;