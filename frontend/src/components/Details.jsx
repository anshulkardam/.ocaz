import { Link, useLoaderData } from "react-router-dom"
import { Slider } from "./Slider"
import { singlePostData, userData } from "../db/dummydata"
import { Map } from "./ui/map";
import "leaflet/dist/leaflet.css"
export const Details = () => {
    const eventdetails = singlePostData;
    const userdata = userData;
    const details = useLoaderData();
    console.log("neW",details)
    return <div className="bg-neutral-800 pl-16">
        <div className="grid grid-cols-12 text-black">
            <div className="col-span-8 pt-4">
                <div className="flex grid-cols-5 justify-between">
                    <div className="col-span-4 ">
                        <Slider items={details.images} />
                    </div>
                    <div className="col-span-1 mt-4 mr-20 ">
                        <div className="h-full">
                            <Link to={'/profile'} className="block" >
                                <div className="p-4 border border-white text-center ">
                                    <img src={details.user.avatar || '/default-avatar.jpg'} className="aspect-square w-12 h-12 object-cover rounded-full mx-auto" /> <span className="text-white">{details.user.username}</span>
                                </div>
                            </Link>
                            <div className="flex justify-center">
                                <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-3 h-3 text-white me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between pt-5 text-white">
                    <div>
                        <div className="flex text-2xl font-montserrat font-semibold">
                            <div className="">{details.title}</div>
                            <div className="text-gold pl-5 ">₹{details.price}</div>
                        </div>
                        <div className="text-md items-center text-silver flex mb-2">
                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                            </svg>
                            {details.address}
                        </div>
                    </div>

                </div>

                <div className="text-slate-100">{details.PostDetails.desc}</div>
            </div>
            <div className="col-span-4 border-l-2 p-5 text-white min-h-screen">
                <div className="text-sm">
                    <div className="font-poppins font-semibold text-lg">General

                    </div>
                    <div className="flex ">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span> Time </span> <span> {details.PostDetails.time} </span>
                    </div>
                    <div className="flex">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M5.535 7.677c.313-.98.687-2.023.926-2.677H17.46c.253.63.646 1.64.977 2.61.166.487.312.953.416 1.347.11.42.148.675.148.779 0 .18-.032.355-.09.515-.06.161-.144.3-.243.412-.1.111-.21.192-.324.245a.809.809 0 0 1-.686 0 1.004 1.004 0 0 1-.324-.245c-.1-.112-.183-.25-.242-.412a1.473 1.473 0 0 1-.091-.515 1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.401 1.401 0 0 1 13 9.736a1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.4 1.4 0 0 1 9 9.74v-.008a1 1 0 0 0-2 .003v.008a1.504 1.504 0 0 1-.18.712 1.22 1.22 0 0 1-.146.209l-.007.007a1.01 1.01 0 0 1-.325.248.82.82 0 0 1-.316.08.973.973 0 0 1-.563-.256 1.224 1.224 0 0 1-.102-.103A1.518 1.518 0 0 1 5 9.724v-.006a2.543 2.543 0 0 1 .029-.207c.024-.132.06-.296.11-.49.098-.385.237-.85.395-1.344ZM4 12.112a3.521 3.521 0 0 1-1-2.376c0-.349.098-.8.202-1.208.112-.441.264-.95.428-1.46.327-1.024.715-2.104.958-2.767A1.985 1.985 0 0 1 6.456 3h11.01c.803 0 1.539.481 1.844 1.243.258.641.67 1.697 1.019 2.72a22.3 22.3 0 0 1 .457 1.487c.114.433.214.903.214 1.286 0 .412-.072.821-.214 1.207A3.288 3.288 0 0 1 20 12.16V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-6.888ZM13 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" clipRule="evenodd" />
                        </svg>
                        <span> Services</span>
                    </div>
                    <div className="flex">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd"/>
</svg>

                        <span> Alcohol </span>   <span> {details.PostDetails.alcohol? "Allowed" : "Not Allowed"} </span>
                    </div>
                </div>
                <div className="text-sm">
                    <div className="font-poppins font-semibold text-lg">
                        Event Details
                    </div>
                    <div className="flex gap-8">
                        <div>{details.PostDetails.tickets} Tickets </div>
                        <div>{details.PostDetails.vip} VIP</div>
                    </div>
                </div>
                <div className="text-sm items-center flex gap-2">
                <div className="font-poppins font-semibold text-lg text-red-400">
                        Save Event
                    </div>
                    <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z" />
                    </svg>                    
                </div>
                <div>
                    <div className="font-poppins font-semibold text-lg">
                        Location
                    </div>
                    <div className="w-full h-[300px] ">
                        <Map items={[singlePostData]} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}