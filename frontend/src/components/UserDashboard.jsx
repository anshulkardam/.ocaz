import { SavedList } from "./SavedList"

export const UserDashboard = () => {
    return <div className="grid grid-cols-12">
        <div className="col-span-8">
            <div className=" flex justify-between">
                <div className="text-2xl">User Information</div>
                <div>Update Profile</div>
            </div>
            <div className="flex">Avatar:
                <img src="../../public/im18.jpg" className="w-12 h-12 rounded-full" />
            </div>
            <div>Username: John Doe</div>
            <div>E-mail: john@gmail.com</div>
            <div className="text-2xl flex justify-between">
                My List
                <div>Add New Post</div>
            </div>
            <SavedList />

        </div>
        <div className="col-span-4 border-l-2">
            messages
        </div>
    </div>
}