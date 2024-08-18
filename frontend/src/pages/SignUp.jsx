import { Link } from "react-router-dom"
import { Acebutton } from "../components/ui/acebutton"


export const SignUp = () => {

    return <div className="bg-black min-h-screen">
        <div className="grid grid-cols-12 ">
            <div className="pt-24 col-span-7 flex flex-col items-center w-full ">

                <div className="text-6xl  text-white text-center font-montserrat font-bold">Sign <span className="text-red-500" >Up</span>

                </div>
                <div className="text-sm mt-2 text-center font-montserrat font-semibold text-slate-300">Already have an account?
                <Link to={'/login'}> <span className="text-orange-400 underline" >Login</span> </Link>
                </div>
                <div className="mt-4 font-montserrat font-medium text-md text-white w-1/2 flex flex-col">
                    
                    <div>First Name</div>
                    <input className="rounded-lg mt-1 mb-1 text-black" type="text"   placeholder="John " />
                    <div>Last Name</div>
                    <input className="rounded-lg  mt-1 mb-1 text-black" type="text"   placeholder=" Doe" />
                    <div>E-mail</div>
                    <input className="rounded-lg  mt-1 mb-1 text-black" type="text"  placeholder="JohnDoe@example.com" />
                    <div>Password</div>
                    <input className="rounded-lg mt-1 mb-1 text-black" type="password"  placeholder="********" />
                </div>
                <div className="mt-6">
                    <Link to={'/profile'} >
                        <Acebutton label={"Sign Up"} size={10} />
                    </Link>
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

