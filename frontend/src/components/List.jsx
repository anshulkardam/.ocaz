import { FilterQ } from "./FilterQ"
import { listData } from "../db/dummydata"
import { Cards } from "./Cards";
import { SelectComp } from "./ui/SelectComp";
import { SearchButton } from "./ui/SearchButton";
export const List = () => {
    const data = listData;
    return <div className="bg-blue-200 min-h-screen text-white">
        <div className="grid grid-cols-10">
            <div className="col-span-6">
                <FilterQ />
                <div className="flex gap-9">
                    <SelectComp label={"type"} />
                    <SelectComp label={"property"} />
                    <SelectComp label={"minx"} />
                    <SelectComp label={"max"} />
                    <div className="w-2 pt-4">
                        <SearchButton />

                    </div>
                </div>
                <div className=" h-[800px] overflow-y-scroll">
                {data.map(items => (
                  
                    <Cards key={items.id} item={items} />
                   
                ))}
                 </div>

            </div>
            <div>map</div>
        </div>
    </div>
}