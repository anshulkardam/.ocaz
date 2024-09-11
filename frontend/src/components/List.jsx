import { Cards } from "./Cards";
import { Map } from "./ui/Map";
import "leaflet/dist/leaflet.css"
import { Suspense, useState } from "react";
import { Await, Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

export const List = () => {
    
    const eventlist = useLoaderData()
    
    const [searchdata, setsearchData] = useSearchParams()

    const navigate = useNavigate()
    const [query, setQuery] = useState({
        city: "",
        minPrice: 0,
        maxPrice: 0,
    })
    const handlechange = (e) => {
        e.preventDefault();
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = () => {
        navigate(`/list?city=${query.city}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
    }
   
    return <div className="bg-neutral-950 min-h-screen text-white">
        <div className="grid grid-cols-12">
            <div className="col-span-8 pl-5 pt-5">
                <div className="w-full text-black pr-2">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-1 w-full">
                        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>

                        <input
                            type="text"
                            name="city"
                            placeholder="Enter location"
                            className="rounded-md p-1.5 font-poppins  flex-grow"
                            onChange={handlechange}
                            defaultValue={searchdata.get("city")}

                        />
                        <input
                            type="number"
                            name="minprice"
                            placeholder="₹min"
                            min={0}
                            max={1000000000}
                            className="font-poppins  rounded-md p-1.5 w-[10%]"
                            onChange={handlechange}
                            defaultValue={searchdata.get("minprice")}
                        />
                        <input
                            type="number"
                            name="maxprice"
                            placeholder="₹max"
                            min={0}
                            max={1000000000}
                            className=" font-poppins rounded-md p-1.5 w-[10%]"
                            onChange={handlechange}
                            defaultValue={searchdata.get("maxprice")}
                        />
                        <button className="bg-red-600 rounded-md text-lg p-1 font-medium  text-white italic font-bebas-neue w-[12%]">
                            find event!
                        </button>
                    </form>
                </div>



                <div className=" font-semibold text-center mt-1 font-playwrite-nz text-lg text-red-500 py-2">upcoming events: </div>
                <div className=" h-[800px] overflow-y-scroll pt-1 p-2">
                    <Suspense
                        fallback={<p>Loading events...</p>}
                    >
                        <Await
                            resolve={eventlist.postResponse}
                            errorElement={
                                <p>Error loading events</p>
                            }
                        >
                            {(postResponse) => (
                                postResponse.data.map((items,i) => (
                                    <div className="py-2.5" key={i}>
                                        <div className="border-black border-2 bg-slate-50 rounded-md ">
                                            <Cards  item={items} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </Await>
                    </Suspense>
                </div>

            </div>
            <div className="col-span-4 mr-2 relative z-10" >
                <Suspense
                    fallback={<p>Loading events...</p>}
                >
                    <Await
                        resolve={eventlist.postResponse}
                        errorElement={
                            <p>Error loading events</p>
                        }
                    >
                        {(postResponse) => (

                            <Map items={postResponse.data} />

                        )}
                    </Await>
                </Suspense>
            </div>
        </div>
    </div>
}

