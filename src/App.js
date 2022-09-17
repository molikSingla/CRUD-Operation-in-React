import React, { useEffect, useState } from "react";
import SectionElement from "./components/SectionElement";
import SectionHeading from "./components/SectionHeading";
import SingleService from "./components/SingleService";

import { CookiesProvider, useCookies } from "react-cookie";

// ✅ Components --------------------------------------------------------------------------------------
import SingleTestimonial from "./components/SingleTestimonial";
import testimonialData from "./helpers/TestimonialData";
import { singleWebHosting } from "./helpers/PricingData";
import SinglePricingElem from "./components/SinglePricingElem";
import SingleHeadingForPricingDetails from "./components/SingleHeadingForPricingDetails";

// ✅ Icons  -------------------------------------------------------------------------------------------
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";

const App = () => {
    // 1) For header Appereance -----------------------------------------------------------------
    const [headerAppearence, setHeaderAppearence] = useState("");

    // 2) Cookies
    const [cookies, setCookie] = useCookies("mytestimonial");

    // 3) For Testimonial ---------------------------------------------------------------------
    const [testimonialsArray, setTestimonialsArray] = useState([]);
    const [testimonialCount, setTestimonialCount] = useState(
        cookies?.mytestimonial?.user_name ? testimonialData?.length + 1 : testimonialData?.length
    );
    const [testimonialCountToShow, setTestimonialCountToShow] = useState(0);
    const [testimonialDataToCollect, setTestimonialDataToCollect] = useState({
        user_name: "",
        description: "",
    });

    // Functions ----------------------------------------------------------------------
    function listenScrollEvent() {
        window.scrollY > 55 ? setHeaderAppearence("bg-secondary-color") : setHeaderAppearence("");
    }

    function handlePreviousTestimonial() {
        setTestimonialCountToShow((prev) => (prev === 0 ? testimonialCount - 1 : prev - 1));
    }
    function handleNextTestimonial() {
        setTestimonialCountToShow((prev) => (prev === testimonialCount - 1 ? 0 : prev + 1));
    }
    function handleSaveTestimonialData() {
        setCookie("mytestimonial", JSON.stringify(testimonialDataToCollect), {
            path: "/",
        });
        setTestimonialsArray(() => {
            return [
                <SingleTestimonial
                    key={Math.random()}
                    userName={testimonialDataToCollect.user_name}
                    description={testimonialDataToCollect.description}
                />,
                ...testimonialData.map((single) => {
                    return <SingleTestimonial key={Math.random()} userName={single.userName} description={single.description} image={single.image} />;
                }),
            ];
        });
        setTestimonialDataToCollect({
            user_name: "",
            description: "",
        });
        setTestimonialCountToShow(0);
    }

    function handleOnChangeOnFormData(evt) {
        const { name, value } = evt.target;
        setTestimonialDataToCollect((prev) => {
            return { ...prev, [name]: value };
        });
    }

    // UseEffects --------------------------------------------------------------------------------
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    useEffect(() => {
        if (cookies?.mytestimonial?.user_name) {
            setTestimonialsArray(() => {
                return [
                    <SingleTestimonial
                        key={Math.random()}
                        userName={cookies?.mytestimonial?.user_name}
                        description={cookies?.mytestimonial?.description}
                    />,
                    ...testimonialData.map((single) => {
                        return (
                            <SingleTestimonial key={Math.random()} userName={single.userName} description={single.description} image={single.image} />
                        );
                    }),
                ];
            });
        } else {
            setTestimonialsArray(() => {
                return testimonialData.map((single) => {
                    return <SingleTestimonial key={Math.random()} userName={single.userName} description={single.description} image={single.image} />;
                });
            });
        }
    }, []);

    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div className="h-auto">
            {/* ✅ Header ------------------------------------------------------------------------------------- */}
            <header
                className={`header_section fixed top-0 z-50 flex h-14 w-full items-center justify-between ${headerAppearence} px-5 font-open-sans-font text-white transition-all duration-500 md:px-10`}
            >
                <div className="logo">
                    <p className="text-1.5xl font-bold text-white md:text-2xl">Hostinger</p>
                </div>
                <div className="hidden gap-6 md:flex lg:gap-20 ">
                    <nav className="flex items-center gap-5 font-medium lg:gap-9">
                        <p>Web Hosting</p>
                        <p>Services</p>
                        <p>Email</p>
                        <p>Domain</p>
                    </nav>
                    <div className="login_cart flex h-full items-center gap-8">
                        <button className="rounded-full border-2 border-white py-[2px] px-7 font-rubik-font font-semibold transition-all duration-300 hover:bg-white hover:text-secondary-color">
                            Log In
                        </button>
                        <button className="flex items-center gap-2 font-semibold transition-all duration-200 hover:scale-110">
                            <FiShoppingCart className="text-3xl" />
                            Cart
                        </button>
                    </div>
                </div>
                <div>
                    <AiOutlineMenu className="text-2xl" onClick={() => setOpenMenu(true)} />

                    <div
                        className={`${!openMenu && "scale-out-right"} ${
                            openMenu && "fade-in-right"
                        } absolute right-0 top-0 flex h-screen w-screen flex-col items-center gap-5 bg-white text-3xl text-black`}
                    >
                        <div className="mt-10 mb-16 flex w-full justify-end px-10">
                            <ImCross onClick={() => setOpenMenu(false)} />
                        </div>
                        <p>Home</p>
                        <p>Services</p>
                        <p>Login</p>
                        <p>Cart</p>
                    </div>
                </div>
            </header>

            {/* ✅ Hero Section ------------------------------------------------------------------------------------- */}
            <div className="hero_section box-border w-full bg-white md:h-[clamp(37rem,100vh,44rem)]">
                <div className="little_bit_translate section_background_gradient relative box-border flex h-full w-full flex-col gap-3 px-5 pt-16 md:flex-row md:px-10">
                    <div className="flex w-full flex-col items-center justify-center gap-3 py-6 font-open-sans-font md:w-1/2 md:py-14">
                        <p className="text-center text-1.5xl font-bold text-white md:text-3.5xl">Savings to Set Your Website in Motion</p>
                        <p className="text-center text-5xl font-bold text-white md:text-5xl">₹ 149.00/mo</p>
                        <p className="text-center text-white">Make moves with a free domain and SSL included with a four-year subscription.</p>
                        <button className="mt-8 box-border max-w-max rounded-full border-2 border-transparent bg-secondary-color px-12 py-2 font-rubik-font text-lg font-medium text-white transition-all duration-300 hover:border-2 hover:border-white hover:bg-transparent hover:text-white">
                            Get Started
                        </button>
                        <p className="flex items-center gap-2 text-center font-medium text-white">
                            <TiTick className="text-2xl text-green-600" /> Get exclusive 30-day money-back guarantee
                        </p>
                    </div>
                    <div className="mt-2 flex h-[80vh]  w-full items-center justify-center pb-8 md:w-1/2">
                        <iframe className="h-full w-full md:h-4/5 md:w-4/5" src="https://embed.lottiefiles.com/animation/89111"></iframe>
                    </div>
                </div>
            </div>

            {/* ✅ Services Section ------------------------------------------------------------------------------------- */}
            <SectionElement>
                <div className="flex h-full w-full flex-col items-center gap-16">
                    <SectionHeading>Out Services</SectionHeading>
                    <div className="box-border flex h-auto w-full flex-col flex-wrap items-center gap-4 pl-6 md:flex-row md:gap-y-7 md:pl-16 lg:gap-5">
                        <SingleService serviceName={"Free SSL"} />
                        <SingleService serviceName={"Access Management"} />
                        <SingleService serviceName={"eCommerce Optimization"} />
                        <SingleService serviceName={"Free Migration"} />
                        <SingleService serviceName={"Automated backups"} />
                        <SingleService serviceName={"DDoS Protection"} />
                        <SingleService serviceName={"PHP Speed Boost"} />
                        <SingleService serviceName={"LiteSpeed Cache Plugin"} />
                        <SingleService serviceName={"One-Click WordPress Installation"} />
                        <SingleService serviceName={"24/7/365 Tech Support"} />
                        <SingleService serviceName={"Auto Script Installer"} />
                        <SingleService serviceName={"99.9% Uptime Guarantee"} />
                    </div>
                </div>
            </SectionElement>

            {/* ✅ Testimonials --------------------------------------------------------------------------------------------- */}
            <SectionElement bgToAdd={"bg_gradient"}>
                <div className="relative bottom-6 h-auto px-1 font-open-sans-font text-3.5xl font-bold text-white">Testimonials</div>
                <div className="flex w-full flex-col gap-8 lg:flex-row">
                    <div className="order-2 flex h-auto w-full justify-center px-2 md:px-8 lg:order-1 lg:max-w-max">
                        <div className="carosouel_div relative flex gap-5 px-3 md:px-10">
                            <IoIosArrowDropleftCircle
                                onClick={handlePreviousTestimonial}
                                className="absolute top-[43%] left-[-24px] z-50 text-4xl text-white md:left-[-12px] md:text-5xl"
                            />

                            {testimonialsArray[testimonialCountToShow]}

                            <IoIosArrowDroprightCircle
                                onClick={handleNextTestimonial}
                                className="absolute top-[43%] right-[-24px] z-40 text-4xl text-white md:right-[-12px] md:text-5xl"
                            />
                        </div>
                    </div>

                    <section className="order-1 mx-auto h-auto w-full max-w-4xl rounded-md bg-white p-6 shadow-md dark:bg-gray-800 lg:order-2 lg:h-60">
                        <h2 className="text-lg font-semibold capitalize text-gray-700 dark:text-white">Write Testimonial</h2>

                        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                                    name="user_name"
                                    value={testimonialDataToCollect.user_name}
                                    onChange={handleOnChangeOnFormData}
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="description">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                                    name="description"
                                    value={testimonialDataToCollect.description}
                                    onChange={handleOnChangeOnFormData}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleSaveTestimonialData}
                                className="transform rounded-md bg-secondary-color px-8 py-2.5 font-rubik-font font-semibold leading-5 text-white transition-colors duration-300 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                            >
                                Save
                            </button>
                        </div>
                    </section>
                </div>
            </SectionElement>

            {/* ✅ Pricing Plan --------------------------------------------------------------------------------------------- */}
            <SectionElement>
                <div className="flex h-full w-full flex-col items-center gap-16">
                    <SectionHeading>Pricing Plans</SectionHeading>
                    <div className="all_cards h-auto w-full bg-white p-10 px-24">
                        <div className="single_card flex h-auto w-96 flex-col gap-7 rounded-2xl border-2 border-gray-200 bg-white font-open-sans-font shadow-lg">
                            <p className="r w-full rounded-t-lg bg-secondary-color py-3 text-center font-open-sans-font text-lg font-bold text-white">
                                Single Web Hosting
                            </p>
                            <div className="flex flex-col items-center gap-2">
                                <p>Ideal solution for beginners</p>
                                <p className="font-open-sans-font text-4xl font-bold text-secondary-color">₹ 69.00 /mo</p>
                                <button className="rounded-full bg-secondary-color px-12 py-2 font-rubik-font text-lg font-semibold text-white">
                                    Add to Cart
                                </button>
                                <p>₹159.00/mo when you renew</p>
                            </div>

                            <div className="all_details flex flex-col gap-6 px-6 pb-7">
                                <div className="flex flex-col gap-[6px]">
                                    <SingleHeadingForPricingDetails detailName={"Top feature comparison"} />

                                    {singleWebHosting.topfeatureComparision.map((elem) => {
                                        return (
                                            <p>
                                                <span className="font-bold text-secondary-color">{elem.split(" ")[0]}</span>{" "}
                                                {elem.split(" ").slice(1).join(" ")}
                                            </p>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col gap-[6px]">
                                    <SingleHeadingForPricingDetails detailName={"Security"} />

                                    {singleWebHosting.security.map((elem) => {
                                        return <SinglePricingElem elem={elem} />;
                                    })}
                                </div>
                                <div className="flex flex-col gap-[6px]">
                                    <SingleHeadingForPricingDetails detailName={"Free Bonuses"} />
                                    {singleWebHosting.freeBonuses.map((elem) => {
                                        return <SinglePricingElem elem={elem} />;
                                    })}
                                </div>
                                <div className="flex flex-col gap-[6px]">
                                    <SingleHeadingForPricingDetails detailName={"Wordpress Option"} />

                                    {singleWebHosting.wordpressOption.map((elem) => {
                                        return <SinglePricingElem elem={elem} />;
                                    })}
                                </div>
                                <div className="flex flex-col gap-[6px]">
                                    <SingleHeadingForPricingDetails detailName={"Service and Support"} />

                                    {singleWebHosting.serviceAndSupport.map((elem) => {
                                        return <SinglePricingElem elem={elem} />;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionElement>
        </div>
    );
};

export default App;
// function randomTextGenerator(length = 10) {
//     const para = `Testimonials from customers who are not famous have been effectively used in marketing for as long as marketing has existed citation needed A past or current customer will present a formal word of mouth testimonial that a business can use in marketing and to build trust with future customers. Testimonials are incredibly effective when believed to be true, but a challenge is having the audience believe that testimonials presented by a business are given by real people not fabricated by the business itself Even so, testimonials reviews, and case studies are still considered by most marketing experts to be the most effective means of marketing and gaining brand trust by small and medium-sized businesses.`;

//     const paraArray = para.split(" ");
//     const randomStart = parseInt(Math.random() * 60);
//     const randomWordsString = paraArray.slice(randomStart, randomStart + length).join(" ") + ".";
//     return randomWordsString[0].toUpperCase() + randomWordsString.slice(1);
// }
