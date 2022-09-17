import React from "react";

const SingleTestimonial = ({ userName, description, image }) => {
    return (
        <div
            className={`scale-in-center single_card flex h-60 w-[clamp(260px,100%,400px)] flex-col gap-4 rounded-xl bg-white p-2 py-4 pl-3 transition-all duration-300 hover:shadow-2xl sm:w-[420px] md:px-8 md:py-5`}
        >
            <div className="flex items-center gap-5">
                <img className="h-16 w-16 rounded-full border-4 border-secondary-color" src={image || "https://picsum.photos/64"} alt="" />
                <p className="name__ font-roboto-font text-xl font-bold text-secondary-color ">{userName}</p>
            </div>
            <p className="font-open-sans-font font-medium">{description}</p>
        </div>
    );
};

export default SingleTestimonial;
