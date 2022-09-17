import React from "react";

const SingleHeadingForPricingDetails = ({ detailName }) => {
    return (
        <div className="my-3 mb-4">
            <div className="relative z-0 h-[3px] rounded-r-full bg-secondary-color">
                <p className="relative bottom-3 z-50 mb-2 max-w-max bg-white pr-[1px] font-bold text-secondary-color">{detailName}</p>
            </div>
        </div>
    );
};

export default SingleHeadingForPricingDetails;
