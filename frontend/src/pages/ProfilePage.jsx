import { Header } from "../components/Header"
import { FooterComponent } from "../components/ui/Footer"
import { UserDashboard } from "../components/UserDashboard"

export const ProfilePage = () =>  {
    return <div className="">
       <Header />
        <UserDashboard />
        <FooterComponent />
    </div>
}