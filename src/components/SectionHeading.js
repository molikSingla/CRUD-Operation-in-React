import React from "react";

const SectionHeading = ({ children }) => {
    return (
        <div className="relative flex h-1 w-full justify-center bg-secondary-color">
            <p className="relative bottom-6 h-14 bg-white px-1 font-open-sans-font text-3.5xl font-bold text-secondary-color">{children}</p>
        </div>
    );
};

export default SectionHeading;
