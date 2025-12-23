import React from 'react';
import Container from "@/components/shared/container";


const AllExhibitsSlider = () => {
    return (
        <div className={"mt-[120px]"}>
            <Container>
                <div className="w-full flex  justify-center items-center">
                    <div className="flex flex-col">
                        <h1 className="text-center font-bold text-[50px] text-[#4A362A]">
                            Более 40 экспонатов!
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AllExhibitsSlider;