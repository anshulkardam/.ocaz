import { Header } from "../components/Header"
import { SavedList } from "../components/SavedList"
import { FooterComponent } from "../components/ui/Footer"

export const Mybookmarks = () => {
    return <div>
        <Header />
        <div className="bg-black min-h-screen text-white p-4">
            <div className="text-lg text-center py-4 font-montserrat font-bold">
                Bookmarked <span className="text-red-500 font-playwrite-nz text-xl">events</span>
            </div>
            <SavedList />

        </div>
        <FooterComponent />
    </div>
}