import { listData } from "../db/dummydata"
import { Cards } from "./Cards";
import { Map } from "./ui/map";
import "leaflet/dist/leaflet.css"
import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const List = () => {
    const data = listData;
    const navigate = useNavigate()
    const [query, setQuery] = useState({
        city: "",
        minPrice: 0,
        maxPrice: 0,
    })
    const eventlist = useLoaderData()
    const handlechange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = () =>{
        navigate(`/list?city=${query.city}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
    }
    return <div className="bg-neutral-800 min-h-screen text-white">
        <div className="grid grid-cols-12">
            <div className="col-span-8 pl-5 pt-5">
                <div className=" flex space-x-2 w-full text-black">
                <form onSubmit={handleSubmit}>
                <input  type="text" name="city" placeholder="City" className="rounded-md w-1/2 p-2" onChange={handlechange}></input>
                <input  type="number" name="minprice" placeholder="minPrice" min={0} max={1000000000} className="rounded-md w-1/6 p-2" onChange={handlechange}></input>
                <input  type="number" name="maxprice" placeholder="maxPrice" min={0} max={1000000000} className="rounded-md w-1/6 p-2" onChange={handlechange}></input>
                <button className="bg-black rounded-md p-2 font-semibold text-white">Search</button>
                </form>
                </div>
                
               
                <div className=" font-semibold text-lg">Events: </div>
                <div className=" h-[800px] overflow-y-scroll pt-1">
                    {eventlist.map(items => (
                        <Cards key={items.id} item={items} />
                    ))}
                </div>

            </div>
            <div className="col-span-4 mr-2 relative z-10" >
                <Map items={data} />
            </div>
        </div>
    </div>
}

