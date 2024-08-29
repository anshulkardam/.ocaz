import { useContext, useState } from "react";
import { Authcontext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "./UploadWidget";
import { apiUrl } from "../lib/loaders";

export const UpdateProfileCard = () => {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext(Authcontext);
    const [avatar, setAvatar] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {username,firstName,lastName,password} = Object.fromEntries(formData);
        console.log(username)
        console.log(firstName)
        console.log(lastName)
        console.log(password)
        try {
            const response = await axios.put(
                `${apiUrl}/api/v1/user/update/${currentUser.id}`,
                {username,firstName,lastName,password,avatar:avatar[0]}, {withCredentials: true}
            );
            updateUser(response.data);
            navigate('/');
        } catch (e) {
            console.log(e);
            setError("Failed to update profile");
        }
    };

    return (
        <div className="">
            <div className="bg-grid max-w-md w-full p-6 text-white rounded-md">
                <div className="">
                    <div className="flex justify-center">
                        <div className="flex items-center">
                            <img
                                src={avatar[0] || currentUser.avatar || "/default-avatar.jpg"}
                                className="w-20 h-20 rounded-full"
                                alt="avatar"
                            />
                            <div className="font-montserrat font-semibold ml-4 text-lg">
                                <div>
                                    {currentUser.firstName}
                                    <span className="ml-1">{currentUser.lastName}</span>
                                </div>
                                <div className="text-sm text-red-500">
                                    @{currentUser.username}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <div className="font-montserrat font-semibold text-xl">
                            Update Profile
                        </div>
                        <div className="font-montserrat text-xs">
                            Manage your Personal Information
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <div className="font-montserrat font-semibold mb-2">
                            Profile Picture
                        </div>
                        <div className="flex justify-around mb-3">
                            <img
                                src={avatar[0] || currentUser.avatar || "/default-avatar.jpg"}
                                className="w-10 h-10 rounded-full flex"
                                alt="avatar"
                            />
                            <CloudinaryUploadWidget
                                uwConfig={{
                                    cloudName: "du9f90ci8",
                                    uploadPreset: "ocazUPLOAD",
                                    multiple: false,
                                    maxImageFileSize: 2000000,
                                    folder: "avatars",
                                }}
                                setState={setAvatar}
                            />
                        </div>
                        <div className="flex gap-4 mb-3">
                            <div>
                                <div className="font-montserrat font-semibold">
                                    First Name
                                </div>
                                <input
                                    className="p-1 rounded-sm w-full text-black font-montserrat font-medium"
                                    placeholder="John"
                                    name="firstName"
                                    defaultValue={currentUser.firstName}
                                />
                            </div>
                            <div>
                                <div className="font-montserrat font-semibold">
                                    Last Name
                                </div>
                                <input
                                    className="p-1 rounded-sm w-full text-black font-montserrat font-medium"
                                    placeholder="Doe"
                                    name="lastName"
                                    defaultValue={currentUser.lastName}
                                />
                            </div>
                        </div>
                        <div className="font-montserrat font-semibold">Username</div>
                        <input
                            className="p-1 rounded-sm mb-3 w-full text-black font-montserrat font-medium"
                            placeholder="JohnDoe"
                            name="username"
                            defaultValue={currentUser.username}
                        />
                        <div className="font-montserrat font-semibold">Password</div>
                        <input
                            type="password"
                            placeholder="***********"
                            className="p-1 rounded-sm mb-1 w-full text-black"
                            name="password"
                        />
                        <button
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-base mt-4 px-3 py-2.5 w-full text-center block items-center me-2"
                        >
                            Save Changes
                        </button>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};
