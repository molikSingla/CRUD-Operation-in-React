import React from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const SinglePricingElem = ({ elem }) => {
    return (
        <p className="flex items-center gap-1">
            {elem[0] === "+" && <TiTick className="text-lg text-green-600" />}
            {elem[0] === "-" && <ImCross className="mr-1 text-sm text-red-600" />}
            <span className={`ml-1 font-open-sans-font font-bold text-secondary-color`}>{elem.split(" ")[0].substring(1)}</span>
            {elem.split(" ").slice(1).join(" ")}
        </p>
    );
};

export default SinglePricingElem;
// 1)
//  <p className="flex items-center gap-1">
//      {elem[0] === "+" && <TiTick className="text-lg text-green-600" />}
//      {elem[0] === "-" && <ImCross className="mr-1 text-sm text-red-600" />}
//      <span className={`ml-1 font-open-sans-font font-bold text-secondary-color`}>{elem.split(" ")[0].substring(1)}</span>
//      {elem.split(" ").slice(1).join(" ")}
//  </p>;

// 2)
{
    /* <p className="flex items-center gap-1">
    <span
        className={`${elem[0] === "-" && "text-red-700"} font-open-sans-font font-bold text-secondary-color ${
            elem[0] === "+" && "text-green-700"
        } ml-4`}
    >
        {elem.split(" ")[0].substring(1)}
    </span>{" "}
    {elem.split(" ").slice(1).join(" ")}
</p>; */
}
