import { BrowserRouter,Route,Routes } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { ListPage } from "./pages/ListPage"
import { EventInfo } from "./pages/EventInfo"
import { ProfilePage } from "./pages/ProfilePage"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { Mybookmarks } from "./pages/Mybookmarks"
function App() {
  return <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element= {<LandingPage />} ></Route>
            <Route path="/listpage" element= {<ListPage />} ></Route>
            <Route path="/eventinfo/:id" element= {<EventInfo />} ></Route>
            <Route path="/profile" element= {<ProfilePage />} ></Route>
            <Route path="/login" element= {<Login />} ></Route>
            <Route path="/signup" element= {<SignUp />} ></Route>
            <Route path="/bookmarks" element= {<Mybookmarks />} ></Route>
          </Routes>
          </BrowserRouter>
  
  
  </>
}

export default App