import React from 'react';
import {cn} from "@/lib/utils";
import {IContainerProps} from "@/types/container.interface";

const Container = ({children, className}: IContainerProps) => {
    return (
        <div className={cn(className, "max-w-[1439px] px-5 mx-auto")}>
            {children}
        </div>
    );
};

export default Container;