import { listData } from "../db/dummydata"
import { Cards } from "./Cards"

export const SavedList = ({items}) => {
    
    return <div>
        {listData.map(items => (
                    <Cards key={items.id} item={items} />
                ))}
    </div>
}