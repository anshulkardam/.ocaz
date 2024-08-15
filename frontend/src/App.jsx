import { BrowserRouter,Route,Routes } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { ListPage } from "./pages/ListPage"
function App() {
  return <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element= {<LandingPage />} ></Route>
            <Route path="/listpage" element= {<ListPage />} ></Route>
          </Routes>
          </BrowserRouter>
  
  
  </>
}

export default App