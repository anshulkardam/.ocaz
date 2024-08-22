import { useContext, useState } from "react"
import { Authcontext } from "../context/authContext"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

export const UpdateProfileCard = () => {
    const navigate = useNavigate()
    const { currentUser,updateUser } = useContext(Authcontext)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        username: currentUser.username,
        password: currentUser.password
    });
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    console.log(formData)

    const handleSubmit = async () => {
        if (!formData.firstName || !formData.lastName || !formData.username) {
            return console.log("works")
        }
        try{
        const response = await axios.put(`http://localhost:3000/api/v1/user/update/${currentUser.id}`, formData, { withCredentials: true })
        updateUser(response.data)
        navigate('/')
        } catch(e){
            console.log(e)
        }

    };

    return <div className="">
        <div className=" bg-grid max-w-md w-full p-6 text-white rounded-md">
            <div className="">
                <div className="flex justify-center">
                    <div className="flex items-center">
                        <img src={currentUser.avatar || "/default-avatar.jpg"} className="w-20 h-20 rounded-full" />
                        <div className="font-montserrat font-semibold ml-4 text-lg">
                            <div>{currentUser.firstName}
                                <span className="ml-1">{currentUser.lastName}</span>
                            </div>
                            <div className="text-sm text-red-500">@{currentUser.username}</div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <div className="font-montserrat font-semibold text-xl">Update Profile</div>
                    <div className="font-montserrat text-xs">Manage your Personal Information</div>
                </div>
            </div>
            <div className="mt-2">
                <div className="font-montserrat font-semibold mb-2">
                    Profile Picture
                </div>
                <div className="flex justify-around mb-3">
                    <img src={currentUser.avatar || "/default-avatar.jpg"} className="w-10 h-10 rounded-full flex" />
                    <button type="button" className=" text-white bg-neutral-800 hover:bg-blue-800 font-medium rounded-lg text-xs px-3  text-center inline-flex items-center me-2">
                        <svg className="w-5 mr-2 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8" />
                        </svg>
                        Choose File
                    </button>
                </div>
                <div className="flex gap-4  mb-3">
                    <div>
                        <div className="font-montserrat font-semibold ">First Name</div>
                        <input className="p-1 rounded-sm w-full text-black font-montserrat font-medium" placeholder="John"   name="firstName" value={formData.firstName} onChange={handleChange}></input>
                    </div>
                    <div>
                        <div className="font-montserrat font-semibold ">Last Name</div>
                        <input className="p-1 rounded-sm w-full text-black  font-montserrat font-medium" placeholder="Doe"   name="lastName" value={formData.lastName} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="font-montserrat font-semibold ">Username</div>
                <input className="p-1 rounded-sm  mb-3 w-full text-black font-montserrat font-medium" placeholder="JohnDoe"   name="username" value={formData.username} onChange={handleChange}></input>
                <div className="font-montserrat font-semibold ">Password</div>
                <input type="password" placeholder="***********" className="p-1 rounded-sm mb-1 w-full text-black" name="password" value={formData.password} onChange={handleChange}></input>
                <button type="button" onClick={handleSubmit} className=" text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-base mt-4 px-3 py-2.5 w-full text-center block items-center me-2">
                    Save Changes
                </button>
                {error && alert(error)}
            </div>
        </div>
    </div>

}