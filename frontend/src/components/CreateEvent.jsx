import { Acebutton } from "./ui/Acebutton";
import { Datepicker } from "flowbite-react";
import axios from 'axios'
import { useState } from "react";
import CloudinaryUploadWidget from "./UploadWidget";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/loaders";
export const CreateEvent = () => {
    const navigate = useNavigate()
    const [images, setImages] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const Formdata = new FormData(e.target)
        const inputs = Object.fromEntries(Formdata)
        console.log(inputs)
        try {
            const response = await axios.post(`${apiUrl}/api/v1/post/createEvent`, {
                postData: {
                    title: inputs.title,
                    type: inputs.type,
                    price: parseInt(inputs.price),
                    images: images,
                    date: "2024-08-22T18:30:00.000Z",
                    venue: inputs.venue,
                    address: inputs.address,
                    city: inputs.city,
                    langitude: parseFloat(inputs.Latitude),
                    longitude: parseFloat(inputs.Longitude)
                },
                PostDetails: {
                    desc: inputs.description,
                    directions: inputs.directions,
                    time: inputs.time,
                    alcohol: JSON.parse(inputs.alcohol),
                    tickets: parseInt(inputs.tickets),
                    vip: parseInt(inputs.vip)
                }
            }, { withCredentials: true })
            console.log(response.data)
            navigate(`/eventinfo/${response.data.id}`)
        } catch (e) {
            console.log("error found")
        }
    }
    return (
        <div className="">
            <div className="bg-white max-w-4xl w-full p-6 text-black rounded-md">
                <div className="text-2xl font-poppins  font-semibold">
                    Create New Event
                </div>
                <div className="text-sm font-poppins ">
                    Enter the details for your event listing.
                </div>
                <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-10 gap-5">
                            <div className="col-span-5">
                                <div className="font-montserrat font-semibold text-sm mb-2 ">Title
                                    <input
                                        className="p-2  rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                        placeholder="Event name or title"
                                        name="title"
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="font-montserrat font-semibold text-sm">
                                        Description
                                    </div>
                                    <textarea name="description" className="border mt-1 border-neutral-800 border-opacity-50 rounded-md w-full h-44" placeholder="Write about the Event"></textarea>
                                </div>
                                <div className="font-montserrat font-semibold text-sm mb-2">Address
                                    <input
                                        className="p-2 rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                        placeholder="e.g., 10/1, Main Road, Sector 15, New Delhi, Delhi, 110001"
                                        name="address"
                                    />
                                </div>
                                <div className="flex gap-2 mb-2">
                                    <div className="font-montserrat font-semibold text-sm">Latitude
                                        <input
                                            className="p-2 rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="19.192327"
                                            name="Latitude"
                                        />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm">Longitude
                                        <input
                                            className="p-2 rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="72.965639"
                                            name="Longitude"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="col-span-5">

                                <div className="flex gap-2 mb-2 ">
                                    <div className="font-montserrat font-semibold text-sm w-[65%] cursor-pointer"> Date
                                        <Datepicker name="date" className="cursor-pointer" />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm w-[35%] cursor-pointer">Time
                                        <div className="relative">
                                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input name="time" type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="00:00" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-2">
                                    <div className="font-montserrat font-semibold text-sm w-[65%]">Venue
                                        <input
                                            className="p-2 rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="Talkatora Stadium, New Delhi"
                                            name="venue"
                                        />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm w-[35%]">City
                                        <input
                                            className="p-2 rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="New Delhi"
                                            name="city"
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-2 gap-2">
                                    <div className="font-montserrat font-semibold text-sm w-[65%]">Type
                                        <input
                                            className="p-2 w-full rounded-md w-2xl border mt-1 border-neutral-800 border-opacity-50 font-montserrat text-sm"
                                            placeholder="ex. Hip Hop Concert"
                                            name="type"
                                        />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm w-[35%]">Price
                                        <input
                                            className="p-2 w-full rounded-md w-sm border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="INR"
                                            name="price"
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="font-montserrat font-semibold text-sm">
                                        Directions
                                    </div>
                                    <textarea name="directions" className="border mt-1 border-neutral-800 border-opacity-50 rounded-md w-full" placeholder="Provide specific directions or landmarks here..."></textarea>
                                </div>
                                <div className="flex mb-2 gap-2">
                                    <div className="font-montserrat font-semibold text-sm flex-2">Alcohol
                                        <select id="countries" defaultValue="" name="alcohol" className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="" disabled>Choose</option>
                                            <option value="true">Allowed</option>
                                            <option value="false">Not Allowed</option>
                                        </select>
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm flex-1">
                                        Tickets
                                        <input name="tickets" type="number" id="number-input" aria-describedby="helper-text-explanation" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000" required />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm flex-1">
                                        VIP Tickets
                                        <input name="vip" type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload Images</label>
                                    <div className="flex items-center">
                                        <CloudinaryUploadWidget uwConfig={{
                                            cloudName: "du9f90ci8",
                                            uploadPreset: "ocazUPLOAD",
                                            multiple: true,
                                            maxFiles: 4 - images.length,
                                            maxImageFileSize: 8000000,
                                            folder: "posts",
                                        }} setState={setImages} />
                                        <div className="flex space-x-2 ml-4">
                                            {images.map((items, i) => (<img src={items} key={i} className="w-10 h-10 flex"></img>))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Acebutton label={"Create Event"} size={8} />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};
