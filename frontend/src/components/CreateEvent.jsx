import { Acebutton } from "./ui/acebutton";
import "react-quill/dist/quill.snow.css"
import { Datepicker } from "flowbite-react";
import { useState } from "react";
import CloudinaryUploadWidget from "./UploadWidget";
export const CreateEvent = () => {
    const [images, setImages] = useState([])
    const handleSubmit = e => {
        e.preventDefault()
        const Formdata = new FormData(e.target)
        const inputs = Object.fromEntries(Formdata)
        console.log(inputs)
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
                                <div className="flex gap-2 mb-2">
                                    <div className="font-montserrat font-semibold text-sm">Type
                                        <input
                                            className="p-2 rounded-md w-2xl border mt-1 border-neutral-800 border-opacity-50 font-montserrat text-sm"
                                            placeholder="ex. Hip Hop Concert"
                                            name="type"
                                        />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm">Price
                                        <input
                                            className="p-2 rounded-md w-sm border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="INR"
                                            name="price"
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-2 ">

                                    <div className="font-montserrat font-semibold text-sm"> Date
                                        <Datepicker name="date" />
                                    </div>


                                    <div className="font-montserrat font-semibold text-sm">Time
                                        <div className="relative">
                                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input name="time" type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="00:00" />
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="col-span-5">
                                <div className="flex gap-2 mb-2">
                                    <div className="font-montserrat font-semibold text-sm">Venue
                                        <input
                                            className="p-2 rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="Talkatora Stadium, New Delhi"
                                            name="venue"
                                        />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm">City
                                        <input
                                            className="p-2 rounded-md w-full border mt-1 border-neutral-800 border-opacity-50 font-montserrat font-medium"
                                            placeholder="New Delhi"
                                            name="city"
                                        />
                                    </div>

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
                                <div className="mb-2">
                                    <div className="font-montserrat font-semibold text-sm">
                                        Directions
                                    </div>
                                    <textarea name="directions" className="border mt-1 border-neutral-800 border-opacity-50 rounded-md w-full" placeholder="Provide specific directions or landmarks here..."></textarea>
                                </div>
                                <div className="flex mb-2 gap-5">
                                    <div className="font-montserrat font-semibold text-sm">Alcohol
                                        <select id="countries" defaultValue="" name="alcohol" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value="" disabled>Choose</option>
                                            <option value="Yes">Allowed</option>
                                            <option value="No">Not Allowed</option>
                                        </select>
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm">
                                        Tickets
                                        <input name="tickets" type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000" required />
                                    </div>
                                    <div className="font-montserrat font-semibold text-sm">
                                        VIP Tickets
                                        <input name="vip" type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload Images</label>
                                    <div className="flex items-center">
                                        <CloudinaryUploadWidget uwConfig={{
                                            cloudName: "du9f90ci8",
                                            uploadPreset: "ocazUPLOAD",
                                            multiple: true,
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
