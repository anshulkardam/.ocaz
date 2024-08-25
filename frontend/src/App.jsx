import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { ListPage } from "./pages/ListPage"
import { EventInfo } from "./pages/EventInfo"
import { ProfilePage } from "./pages/ProfilePage"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { Mybookmarks } from "./pages/Mybookmarks"
import { UpdateProfile } from "./pages/UpdateProfile"
import { NewEvent } from "./pages/NewEvent"
import { alleventsloader, eventinfoloader, profilepageloader } from "./lib/loaders"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LandingPage />),
    },
    {
      path: "/listpage",
      element: (<ListPage />),
      loader: alleventsloader,
    },
    {
      path: "/eventinfo/:id",
      element: (<EventInfo />),
      loader: eventinfoloader,
    },
    {
      path: "/profile",
      element: (<ProfilePage />),
      loader: profilepageloader,
    },
    {
      path: "/login",
      element: (<Login />),
    },
    {
      path: "/signup",
      element: (<SignUp />),
    },
    {
      path: "/bookmarks",
      element: (<Mybookmarks />),
    },
    {
      path: "/updateprofile",
      element: (<UpdateProfile />),
    },
    {
      path: "/NewEvent",
      element: (<NewEvent />),
    },
  ]);
  return (
    <RouterProvider router={router} />
  )

}

export default App