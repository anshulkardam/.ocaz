import { Link, useNavigate } from "react-router-dom"
import { Acebutton } from "./ui/Acebutton"
import { InfiniteMovingCards } from "./ui/MovingCards";
import { useState } from "react";


export const LandingInfo = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState({
        title: "",
        city: "",
        minPrice: 0,
        maxPrice: 0,
    })
   
    const handlechange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/listpage?title=${query.title}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`)
    }

    return <div className="bg-black min-h-screen flex justify-center">
        <div className="grid grid-cols-10">
            <div className="pt-36 col-span-7">
                <div className="text-7xl text-white text-center font-montserrat font-bold">Elevate Your Event</div>
                <div className="text-xl text-center font-montserrat font-semibold text-slate-300">Streamline Your Events, Maximize Your Impact
                </div>
                <div className="flex justify-center pt-9 gap-8">
                    <Link to={'/login'} >
                        <Acebutton label={"Host an Event"} size={6} />
                    </Link>
                    <Link to={'/listpage'} >
                        <Acebutton label={"Attend an Event"} size={6} />
                    </Link>
                </div>

                <div className="w-full pt-10">

                    <form className="w-3/4 mx-auto " onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" name="title" onChange={handlechange} className="block w-full p-4 ps-10 text-white font-medium text-sm border border-gray-300 rounded-full bg-slate-900" placeholder="Search Events, Gatherings..." required />
                            <button type="submit" className=" absolute end-2.5 bottom-2.5 bg-black hover:bg-slate-950  focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium text-slate-300 rounded-lg text-sm px-4 py-2">Search</button>
                        </div>
                    </form>

                </div>
                <div className="text-white flex pt-20 justify-center gap-32 text-center">
                    <div>
                        <div className="text-5xl font-poppins font-bold text-slate-300">6+</div>
                        <div>Years of Experience</div>
                    </div>
                    <div>
                        <div className="text-5xl font-poppins font-bold text-slate-300">2<span className="text-red-600 text-5xl font-poppins font-bold">M</span></div>
                        <div>Users Trusted</div>
                    </div>
                    <div>
                        <div className="text-5xl font-poppins font-bold text-slate-300">900+</div>
                        <div>Events Created</div>
                    </div>
                </div>
                <div className="text-white pt-24 text-3xl flex justify-center text-center ">
                    <p className="w-3/4 font-montserrat font-semibold">
                        "More than just attending—dive in, connect, and make every event uniquely yours with tailored experiences."
                    </p>
                </div>
                <div className="pt-20">
                    <InfiniteMovingCards items={testimonials} className={"text-slate-200"} />
                    <InfiniteMovingCards items={testimonials} className={"text-slate-200"} direction="right" />
                </div>
            </div>
            <div className="col-span-3 cursor-pointer">
                <div>
                    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./image2.jpg"
                                    alt="beachparty.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./im18.jpg"
                                    alt="comedyshow.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./image4.jpg"
                                    alt="concert.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./image1.jpg"
                                    alt="bookevent.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./im17.jpg"
                                    alt="techevent.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./image3.jpg"
                                    alt="bonfire.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./img15.jpg"
                                    alt="galaevent.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./im209.jpg"
                                    alt="match.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./img2.jpg"
                                    alt="opera.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./img3.jpg"
                                    alt="carshow.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

const testimonials = [{ quote: "Their attention to detail and organizational prowess is second to none. A true partner in every sense.", name: "Emily White, Event Coordinator", title: "Elevate Enterprises" },
{ quote: "The platform's intuitive design and efficient management tools have significantly improved our event planning processes.", name: "Vikram Singh, Event Manager", title: "Apex Horizon" },
{ quote: "From intuitive design to outstanding customer support, this platform offers a stellar experience. It made organizing our event both simple and enjoyable.", name: "Abhishek 'YoLo' Rawat", title: "Event Manager" },
{ quote: "With its innovative features and user-friendly interface, .Ocaz is setting new industry standards.", name: "Manya Jain, Co-founder", title: "K-Enterprises" },
{ quote: "This site has become an essential part of our event planning toolkit. The features are incredibly useful and easy to navigate.", name: "James Taylor, Event Director", title: "Nexify" },
{ quote: "Our organization has greatly benefited from the superior coordination and user-centric design of this platform. It has elevated our event planning to new heights.", name: "Meera Reddy ", title: "Event Strategist" },
{ quote: "Looks cool, I like the images and everything", name: "Joice. V Joseph", title: "Chidiya Ghar ltd." },
]