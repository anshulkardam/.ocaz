import { Link } from "react-router-dom"
import { Button } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Cards = ({ item }) => {

    const dateString = item.date

    const fixeddate = new Date(dateString);
    const options = {
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = fixeddate.toLocaleDateString(undefined, options);
    function notify(){
        toast.info("Coming Soon!");
    }
    return <div>
        <Link to={`/eventinfo/${item.id}`} >
            <div className="relative h-full flex" >
                <img src={item.images[0]} className="object-cover aspect-video h-[170px] w-[200px]  " />
                <div className="w-full ml-2 font-sans text-black">
                    <div className="text-xl font-semibold font-poppins p-1.5">
                        {item.title} | <span className="">{item.city}</span>
                    </div>
                    <div className="flex items-center pl-1.5 text-sm font-normal font-poppins ">
                        <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clipRule="evenodd" />
                        </svg>
                        <div>{formattedDate} </div>

                    </div>
                    <div className="flex text-sm mt-1 items-center pl-1.5 font-normal font-poppins"><svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                    </svg>
                        {item.address}
                    </div>
                    <div className="mt-5 flex justify-between items-center p-3  ">
                        <div className="text-lg bg-green-200 rounded-md font-bold text-black  px-2 py-1">
                            ₹{item.price.toLocaleString()}
                        </div>
                        <Button onClick={notify} className="bg-red-600 text-white hover:bg-yellow-700" size="sm">
                            <HiShoppingCart className="mr-2 h-5 w-5" />
                            Buy now
                        </Button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </Link>
    </div>
}