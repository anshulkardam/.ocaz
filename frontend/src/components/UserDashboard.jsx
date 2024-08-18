import { Chat } from "./chat"
import { SavedList } from "./SavedList"

export const UserDashboard = () => {
    return <div className="bg-black min-h-screen">
        <div className="grid grid-cols-11">
            <div className="col-span-6  text-white">
                <div className=" flex justify-between p-4 text-xl font-montserrat font-semibold">
                    <div className="ml-10">User Information</div>
                    <div className="text-sm flex flex-col items-center text-yellow-300 underline cursor-pointer">Update Profile</div>
                </div>
                <div className="gap-10 pl-20 mb-5 flex bg-grid py-5">        
                        <img src="../../public/im18.jpg" className="w-12 h-12 ml-6  rounded-full " /> 
                    <div className=" text-base text-teal-400 font-montserrat font-semibold">
                    <div className="mt-1 ">Username:
                        <span className="ml-2">John Doe</span>
                    </div>
                    <div >E-mail:
                        <span className="ml-2">JohnDoe@example.com</span>
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-9 text-white mt-2">
                    <div className="col-span-5">
                        <div className="text-lg font-montserrat font-semibold text-center">Your Messages</div>
                        <Chat />
                    </div>
                    <div className="col-span-4 border-l-2 h-screen">
                        <div className="text-lg font-montserrat font-semibold text-center ">Chat</div>

                    </div>
                </div>
            </div>
            <div className="col-span-5 p-4 text-white">
                <div className="text-lg text-center py-4 font-montserrat font-bold">
                    Bookmarked <span className="text-red-500">Events</span>
                </div>
                <SavedList />
            </div>
        </div>
    </div>
}

