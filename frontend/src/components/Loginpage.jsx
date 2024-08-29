import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Acebutton } from "./ui/Acebutton"
import { Authcontext } from "../context/authContext"
import { apiUrl } from "../lib/loaders"


export const Loginpage = () => {
    const {currentUser,updateUser} = useContext(Authcontext)
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    useEffect(()=>{
        if(currentUser){
            navigate('/profile')
        }
    },[currentUser])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    async function handleSubmit() {
        try{
        const response = await axios.post(`${apiUrl}/api/v1/auth/login`, formData, {withCredentials: true})
       
        updateUser(response.data)
        navigate('/listpage')
        } catch(e){
            setError(e.response.data.message)
        }
    }
    return (!currentUser && (<div className="bg-black min-h-screen">
        <div className="grid grid-cols-12 ">
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
            <div className="pt-28 col-span-7 flex flex-col items-center w-full ">

                <div className="text-6xl  text-white text-center font-montserrat font-bold">Login

                </div>
                <div className="text-sm mt-2 text-center font-montserrat font-semibold text-slate-300">Don't have an account?
                    <Link to={'/signup'}> <span className="text-orange-400 underline" >Sign up</span> </Link>
                </div>
                <div className="mt-4 font-montserrat font-medium text-md text-white w-1/2 flex flex-col">
                    <div>Username</div>
                    <input className="rounded-lg  mt-1 mb-1 text-black" type="text" name="username" value={formData.username} placeholder="username" onChange={handleChange}/>
                    <div>Password</div>
                    <input className="rounded-lg mt-1 mb-1 text-black" type="password" name="password" value={formData.password} placeholder="********" onChange={handleChange}/>
                </div>
                {error && <span className="text-neutral-500  font-montserrat font-semibold mt-2">{error}</span>}
                <div className="mt-6">
                    <Acebutton label={"Sign In"} size={8} onClick={handleSubmit} />
                </div>
                <div className="text-white pt-20 text-3xl flex justify-center text-center ">
                    <p className="w-full font-montserrat font-semibold">
                        "Where Every <span className="text-red-600">Event</span> Finds Its Place"
                    </p>
                </div>
            </div>
        </div>
    </div>))

}

