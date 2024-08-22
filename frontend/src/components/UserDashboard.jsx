import { useContext, useEffect, useState } from "react"
import { Chat } from "./chat"
import { SavedList } from "./SavedList"
import { Acebutton } from "./ui/acebutton"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Authcontext } from "../context/authContext"

export const UserDashboard = () => {
    const {currentUser,updateUser} = useContext(Authcontext)

    const navigate = useNavigate()
    const [window, Setwindow] = useState(false)
    function windowclick() {
        Setwindow(true);
    }
    useEffect(()=>{
        if(!currentUser){
            navigate('/login')
        }
    },[currentUser,navigate])
    async function handlelogout(){
        try {
        const res = await axios.post("http://localhost:3000/api/v1/auth/logout", {}, { withCredentials: true })
         updateUser(null)
        navigate('/')
        } catch(e){
            console.log(e)
        }
    }
    return (currentUser && (<div className="bg-black min-h-screen">
        <div className="grid grid-cols-10">
            <div className="col-span-5 pl-10   text-white">
                <div className="ml-10 mb-1 text-center p-4 text-xl font-montserrat font-semibold">
                    Your <span className="text-red-500 font-playwrite-nz">account</span>
                </div>
                <div className=" p-4 rounded-xl bg-grid ">
                    <div className="flex justify-center">
                        <div>
                            <div className=" ">
                                <div className="flex  gap-3   ">
                                    <img src={currentUser.avatar || "/default-avatar.jpg"} className="w-16 h-16 border-red-500 border-2 rounded-full " />
                                    <div className=" text-xl  font-montserrat   font-semibold">
                                        <div className=" ">{currentUser.firstName}
                                        <span className=" ml-2">{currentUser.lastName}
                                        </span>
                                        </div>
                                        
                                        <div className=" text-red-500 text-sm">@{currentUser.username}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className=" text-base  font-montserrat  text-center  font-semibold">E-mail</div>
                                <div className=" text-red-500 text-base text-center  font-montserrat    ">{currentUser.email}</div>

                            </div>

                        </div>

                    </div>
                    <div className="items-center flex justify-center gap-5 mt-2">
                        <Link to={'/updateprofile'} >
                    <button type="button" className="text-white hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2">Edit Profile</button>
                    </Link>
                    <button type="button" onClick={handlelogout} className="text-red-700 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2">Logout</button>
                   
                    </div>
                </div>
                <div className="flex justify-evenly mt-4">
                    <Link to={'/bookmarks'}>
                        <Acebutton label={"Your Saved Events!"} size={8} />
                    </Link>
                    <Link to={'/NewEvent'}>
                        <Acebutton label={"Create New Event"} size={8} />
                    </Link>
                </div>
                <div onClick={() => { Setwindow(true) }}> Chat..</div>
                {window && (<div className="bg-white  mt-4 fixed bottom-0 left-[10%] mx-auto max-w-lg">
                    <div className="flex justify-between bg-blue-400">
                        <div className="flex items-center gap-3">
                            <img src="../../public/im18.jpg" alt="pfp.jpg" className="w-7 h-7 ml-2 rounded-full " />
                            <div className="text-white font-montserrat font-semibold">John Doe</div>
                        </div>
                        <div className="text-xl font-bold font-montserrat cursor-pointer mr-3 mb-2 mt-1 " onClick={() => Setwindow(false)}>X</div>
                    </div>
                    <div className="h-[250px] bg-fuchsia-500 p-1 overflow-y-scroll">
                        <div className="flex mb-2 gap-1 w-1/2">
                            <img src="../../public/im17.jpg" className="rounded-full h-6 w-6" alt="John Doe" />
                            <span className="ml-2 border border-white p-2 rounded-md ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda.  </span>
                        </div>
                        <div className="flex mb-2 gap-1 w-1/2 ml-auto items-center justify-end">
                            <span className="mr-2 text-right border border-white p-2 rounded-md">Lorem ipsum dolor,</span>
                            <img src="../../public/im17.jpg" className="rounded-full h-6 w-6" alt="John Doe" />
                        </div>
                        <div className="flex mb-2 gap-1 w-1/2 ">
                            <img src="../../public/im17.jpg" className="rounded-full h-6 w-6" alt="John Doe" />
                            <span className="ml-2 border border-white p-2 rounded-md ">Lorem ipsum dolor, sit
                            </span>
                        </div>
                        <div className="flex mb-2 gap-1 w-1/2  ml-auto items-center justify-end">
                            <span className="mr-2 text-right border border-white p-2 rounded-md">Lorem ipsum dolor,</span>
                            <img src="../../public/im17.jpg" className="rounded-full h-6 w-6" alt="John Doe" />
                        </div>
                    </div>
                    <div className="w-full flex">
                        <input type="text" placeholder="Type your message..." className="w-full text-black  bg-slate-300" />
                        <button className="p-2  bg-blue-600  font-poppins "> Send</button>
                    </div>
                </div>)}
            </div>
            <div className="col-span-5 p-4 text-white h-[100vh] overflow-y-scroll">
                <div className="h-[300px]">
                    <div className="text-lg font-montserrat font-semibold text-center">Your <span className="text-orange-600 font-playwrite-nz">messages</span></div>
                    <Chat onClick={windowclick} />
                </div>
            </div>

        </div>
    </div> ))
}

