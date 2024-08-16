import { MapContainer,TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Pins } from './Pins'
export const Map = ({items}) => {
    console.log("Wwwww",items)
    return (
        <MapContainer center={[28.402000, 76.825966]} zoom={8} scrollWheelZoom={false} className='w-full h-full relative z-10'>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
   {items.map(pins => (           
                  <Pins item={pins} />     
              ))}
</MapContainer>
    )
}