import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Pins } from './Pins'
export const Map = ({ items }) => {
     
    return (
        <MapContainer center={items.length === 1 ?
            [items[0].langitude, items[0].longitude ] :
            [17.1937, 78.9629]
        } zoom={items.length === 1 ? 15 : 5} scrollWheelZoom={false} className='w-full h-full relative z-10'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items.map((pins,i) => (
                <Pins item={pins} key={i} />
            ))}
        </MapContainer>
    )
}