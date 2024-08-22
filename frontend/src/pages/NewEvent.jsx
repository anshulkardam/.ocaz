
import { CreateEvent } from "../components/CreateEvent"
import { Header } from "../components/Header"

export const NewEvent = () => {
    return <div className="bg-black min-h-screen  flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
            <CreateEvent />
        </div>
    </div>

}