import { Marker, Popup } from "react-leaflet"
import { Link } from "react-router-dom"

export const Pins = ({ item }) => {
   
    return (
        <Marker position={[item.langitude, item.longitude]}>
            <Link to={`/eventinfo/${item.id}`} >
            <Popup>
                <div className="flex">
                    <div>
                        <img src={item.img} className="object-cover h-[60px] w-[100px] rounded-md" />
                    </div>
                    <div>
                        <div>
                        {item.title}
                        </div>
                        {item.address}
                    </div>
                </div>
            </Popup>
            </Link>
        </Marker>
    )
}