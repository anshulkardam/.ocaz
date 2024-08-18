import { useState } from "react"
import { Chat } from "./chat"
import { SavedList } from "./SavedList"
import { Acebutton } from "./ui/acebutton"

export const UserDashboard = () => {
    const [window, Setwindow] = useState(false)

    return <div className="bg-black min-h-screen">
        <div className="grid grid-cols-10">
            <div className="col-span-5  text-white">
                <div className=" flex justify-between p-4 text-xl font-montserrat font-semibold">
                    <div className="ml-10">User Information</div>
                    <div className="text-sm flex flex-col items-center text-yellow-300 underline cursor-pointer">Update Profile</div>
                </div>
                <div className="gap-10 pl-20 mb-5 flex bg-grid py-5 items-center ">
                    <img src="../../public/im18.jpg" className="w-24 h-24  rounded-full " />
                    <div className=" text-lg  font-montserrat font-semibold">
                        <div className="mt-1 ">Username:
                            <span className="ml-2 text-teal-400 ">John Doe</span>
                        </div>
                        <div >E-mail:
                            <span className="ml-2 text-teal-400 ">JohnDoe@example.com</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Acebutton label={"See Your Bookmarks!"} size={10} />
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
                    <div className="text-lg font-montserrat font-semibold text-center">Your <span className="text-orange-600">Messages</span></div>
                    <Chat />
                </div>
            </div>

        </div>
    </div>
}

