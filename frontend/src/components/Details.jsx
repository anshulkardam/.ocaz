import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { Slider } from "./Slider"
import { singlePostData, userData } from "../db/dummydata"
import { Map } from "./ui/map";
import "leaflet/dist/leaflet.css"
import { useContext, useEffect } from "react";
import { Authcontext } from "../context/authContext";
import { Terms } from "./T&C";
export const Details = () => {
    const eventdetails = singlePostData;
    const navigate = useNavigate()
    const { currentUser } = useContext(Authcontext)
    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
    }, [currentUser, navigate])
    const userdata = userData;
    const details = useLoaderData();
    console.log("neW", details)
    return (currentUser && (<div className="bg-black pl-16">
        <div className="grid grid-cols-12 text-black">
            <div className="col-span-8 pt-4">
                <div className="flex grid-cols-5 justify-between">
                    <div className="col-span-4 ">
                        <Slider items={details.images} />
                    </div>
                    <div className="col-span-1 mt-4 mr-20 ">
                        <div className="h-full">
                            <Link to={'/profile'} className="block" >
                                <div className="p-4 border border-white text-center rounded-lg">
                                    <img src={details.user.avatar || '/default-avatar.jpg'} className="aspect-square w-12 h-12 object-cover rounded-full mx-auto" /> <span className="text-white">{details.user.username}</span>
                                </div>
                            </Link>
                            <div className="flex justify-center w-full ">
                                <button type="button" className="w-full justify-center px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                        <div className="flex text-3xl font-montserrat font-bold">
                            <div className="">{details.title}</div>
                            <div className="text-red-400 pl-5 ">₹{details.price}</div>
                            <div> Buy Tickets</div>
                        </div>
                        <div className="text-md items-center text-silver flex mb-2">
                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                            </svg>
                            {details.address}
                        </div>
                    </div>

                </div>

                <div className="text-slate-100 font-semibold">{details.PostDetails.desc}</div>
                <Terms />
            </div>
            <div className="col-span-4 border-l-2 p-5 text-white min-h-screen">
                <div className="text-sm pb-4">
                    <div className="font-montserrat font-semibold text-lg">
                        <span className="font-playwrite-nz text-red-600 mr-1">event</span> details
                    </div>
                    <div className="flex  text-base items-center">
                        <svg className="w-5 h-5 items-center flex flex-col text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="ml-2 font-semibold font-poppins"> {details.PostDetails.time} onwards </span>
                    </div>

                    <div className="flex font-semibold">
                        <svg className="w-5 h-5 text-text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                        </svg>

                        <span className="mr-1 ml-4 "> Alcohol is </span>   <span> {details.PostDetails.alcohol ? " Allowed" : " Not Allowed"} </span>
                    </div>
                    <div className="text-sm flex font-semibold">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                        </svg>

                        <div className="ml-4 space-x-4">
                            <span> Tickets {details.PostDetails.tickets}
                            </span>
                            <span>
                                VIP {details.PostDetails.vip}
                            </span></div>

                    </div>
                </div>
                <div className="text-sm items-center flex gap-2">
                    <div className="font-montserrat font-semibold text-lg text-red-400">
                        Save this <span className="font-playwrite-nz text-red-600 mr-1">event</span>
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
    </div>))
}