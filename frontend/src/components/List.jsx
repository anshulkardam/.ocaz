import { FilterQ } from "./FilterQ"
import { listData } from "../db/dummydata"
import { Cards } from "./Cards";
import { SelectComp } from "./ui/SelectComp";
import { SearchButton } from "./ui/SearchButton";
import { Map } from "./ui/map";
import "leaflet/dist/leaflet.css"
export const List = () => {
    const data = listData;
    return <div className="bg-neutral-800 min-h-screen text-white">
        <div className="grid grid-cols-12">
            <div className="col-span-8 pl-5 pt-5">
                <FilterQ />
                <div className="flex gap-10 mt-1 pt-2 ">
                    <SelectComp label={"Type"} />
                    <SelectComp label={"Property"} />
                    <SelectComp label={"Min"} />
                    <SelectComp label={"Max"} />
                    <div className="pt-5">
                        <SearchButton />

                    </div>
                </div>
                <div className="font-montserrat font-semibold text-lg">Events: </div>
                <div className=" h-[800px] overflow-y-scroll pt-1">
                {data.map(items => (
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

