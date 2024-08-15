import { Link } from "react-router-dom"
import { Acebutton } from "./ui/acebutton"


export const LandingInfo = () => {

    return <div className="bg-black min-h-screen flex justify-center">
        <div className="grid grid-cols-10">
            <div className="pt-36 col-span-7">
                <div className="text-7xl text-white text-center font-montserrat font-bold">Elevate Your Event</div>
                <div className="text-xl text-center font-montserrat font-semibold text-slate-300">Streamline Your Events, Maximize Your Impact
                </div>
                <Link to={'/listpage'} >
                <div className="flex justify-center pt-9 gap-8"> 
                    <Acebutton label={"Host an Event"} />
                    <Acebutton label={"Attend an Event"} />
                </div>
                </Link>
                <div className="w-full pt-10">

                    <form className="w-3/4 mx-auto ">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-slate-900" placeholder="Search Events, Gatherings..." required />
                            <button type="submit" className=" absolute end-2.5 bottom-2.5 bg-black hover:bg-slate-950  focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium text-slate-300 rounded-lg text-sm px-4 py-2">Search</button>
                        </div>
                    </form>
                       
                </div>
                <div className="text-white flex pt-16 justify-center gap-32 text-center">
                    <div>
                    <div className="text-5xl font-poppins font-bold text-slate-300">6+</div>
                    <div>Years of Experience</div>
                    </div>
                    <div>
                    <div  className="text-5xl font-poppins font-bold text-slate-300">2<span className="text-red-600 text-5xl font-poppins font-bold">M</span></div>
                    <div>Users Trusted</div>
                    </div>
                    <div>
                    <div className="text-5xl font-poppins font-bold text-slate-300">900+</div>
                    <div>Events Created</div>
                    </div>
                </div>
            </div>
            <div className="col-span-3">
                <div>
                <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <img class="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                src="./image1.jpg"
                                alt="" />
                        </div>
                        <div>
                            <img class="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                src="./image2.jpg"
                                alt="" />
                        </div>
                        <div>
                            <img class="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                src="./img8.jpeg"
                                alt="" />
                        </div>
                        <div>
                            <img class="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                src="./image4.jpg"
                                alt="" />
                        </div>
                        <div>
                            <img class="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                src="./image6.webp"
                                alt="" />
                        </div>
                        <div>
                            <img class="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                src="./image3.jpg"
                                alt="./image3.jpg" />
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    </div>
}

