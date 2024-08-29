import { Suspense, useContext, useEffect, useState } from "react"
import { Chat } from "./Chat"
import { Acebutton } from "./ui/Acebutton"
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom"
import axios from "axios"
import { Authcontext } from "../context/authContext"
import { Cards } from "./Cards"
import { apiUrl } from "../lib/loaders"

export const UserDashboard = () => {
    const { currentUser, updateUser } = useContext(Authcontext)

    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
    }, [currentUser, navigate])
    async function handlelogout() {
        try {
            const res = await axios.post(`${apiUrl}/api/v1/auth/logout`, {}, { withCredentials: true })
            updateUser(null)
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
    const data = useLoaderData()
    
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
                    <Link to={'/listpage'}>
                        <Acebutton label={"Your Saved Events!"} size={8} />
                    </Link>
                    <Link to={'/NewEvent'}>
                        <Acebutton label={"Create New Event"} size={8} />
                    </Link>
                </div>
                <div className=" pt-4">
                    <div className="text-xl font-montserrat font-semibold text-center">Your created <span className="text-orange-600 font-playwrite-nz">events</span></div>
                    <div className=" h-[600px] overflow-y-scroll pt-1 p-2">
                        <Suspense
                            fallback={<p>Loading events...</p>}
                        >
                            <Await
                                resolve={data.Eventresponse}
                                errorElement={
                                    <p>Error loading events</p>
                                }
                            >
                                {(Eventresponse) => (
                                    Eventresponse.data.filter((item) => (item.userId  === currentUser.id )).map(items => (
                                        <div key={items.id} className="py-2.5">
                                            <div className="border-black border-2 bg-white rounded-md ">
                                                <Cards  item={items} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className="col-span-5 p-4 text-white h-[100vh] overflow-y-scroll">
                <div className="h-[600px] ">
                    <div className="text-lg font-montserrat font-semibold text-center">Your <span className="text-orange-600 font-playwrite-nz">messages</span></div>
                    <Suspense fallback={<p>Loading...</p>} >
                        <Await
                            resolve={data.chatResponse}
                            errorElement={<p>Error Loading Messages!</p>}
                        >
                            {(chatResponse) => <Chat chats={chatResponse.data} />}
                        </Await>
                    </Suspense>

                </div>
            </div>

        </div>
    </div>))
}

