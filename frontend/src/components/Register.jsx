import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { Acebutton } from "./ui/Acebutton"
import { Authcontext } from "../context/authContext"
import { apiUrl } from "../lib/loaders"

export const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { currentUser } = useContext(Authcontext)

    useEffect(() => {
        if (currentUser) {
            navigate('/profile')
        }
    }, [currentUser])
    // Create a single state object for all form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/v1/auth/register`, formData, { withCredentials: true })
            navigate('/login')
        } catch (e) {
            setError(e.response.data.message)
        }
    };
    return <div className="bg-black min-h-screen">
        <div className="grid grid-cols-12 ">
            <div className="pt-24 col-span-7 flex flex-col items-center ">

                <div className="text-6xl  text-white text-center font-montserrat font-bold ">Sign <span className="text-red-500" >Up</span>

                </div>
                <div className="text-sm mt-2 text-center font-montserrat font-semibold text-slate-300">Already have an account?
                    <Link to={'/login'}> <span className="text-orange-400 underline" >Login</span> </Link>
                </div>
                <div className="mt-4 font-montserrat font-medium text-md text-white flex flex-col w-1/2">
                    <div className="flex flex-wrap -mx-1">
                        <div className="w-1/2 px-1">
                            <div>First Name</div>
                            <input className="rounded-lg mt-1 mb-1 text-black w-full" type="text" placeholder="John" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="w-1/2 px-1">
                            <div>Last Name</div>
                            <input className="rounded-lg mt-1 mb-1 text-black w-full" type="text" placeholder="Doe" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div>Username</div>
                    <input className="rounded-lg w-full mt-1 mb-1 text-black" type="text" placeholder="JohnDoe123" name="username" value={formData.username} onChange={handleChange} />
                    <div>E-mail</div>
                    <input className="rounded-lg w-full mt-1 mb-1 text-black" type="text" placeholder="JohnDoe@example.com" name="email" value={formData.email} onChange={handleChange} />
                    <div>Password</div>
                    <input className="rounded-lg w-full mt-1 mb-1 text-black" type="password" placeholder="********" name="password" value={formData.password} onChange={handleChange} />
                </div>
                {error && <span className="text-neutral-500  font-montserrat font-semibold">{error}</span>}
                <div className="mt-6">
                    <Acebutton label={"Sign Up"} size={8} onClick={handleSubmit} />
                </div>

                <div className="text-white pt-14 text-3xl flex justify-center text-center ">
                    <p className="w-full font-montserrat font-semibold">
                        "Making Every <span className="text-red-600">Event</span> Effortless"
                    </p>
                </div>
            </div>
            <div className="col-span-5 cursor-pointer">
                <div>
                    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./img2.jpg"
                                    alt="techevent.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./img15.jpg"
                                    alt="bonfire.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./im209.jpg"
                                    alt="galaevent.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./image4.jpg"
                                    alt="match.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./im17.jpg"
                                    alt="opera.jpg" />
                            </div>
                            <div>
                                <img className="object-cover object-center h-40 max-w-full rounded-lg md:h-60"
                                    src="./image3.jpg"
                                    alt="carshow.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

