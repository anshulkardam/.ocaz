import { Link } from "react-router-dom"

export const Header = () => {
    const user = true;

    return <div className="bg-zinc-950 p-[15px] w-full sticky z-50 top-0 flex justify-between">
        <div className='flex gap-2'>
            <img src="../../123.png" alt="logo.png" width="40px" height="20px" />
            <Link to={'/'}>
                <div className="text-white font-montserrat font-bold text-2xl cursor-pointer ">.ocaz</div>
            </Link>
            <div className='text-silver flex font-montserrat font-semibold gap-10 pl-10 items-center text-sm'>
                <Link to={'/listpage'} >
                <div className=" hover:font-bold  hover:text-coral cursor-pointer ">
                    Upcoming Events
                </div>
                </Link>
                <div className=" hover:font-bold hover:text-coral cursor-pointer ">
                    About
                </div>
            </div>
        </div>
        <div className="text-white font-montserrat font-semibold flex justify-end gap-10 pr-10 items-center">
            {user ? <><div>
                <Link to={'/profile'} >
                <p className="text-blue-300">John Doe</p>
                </Link>
            </div>
                <div className="flex justify-center relative">
                <Link to={'/profile'} >
                    <img src="../../public/im18.jpg" className="w-8 h-8 rounded-full" />
                    <span className="bg-red-700 absolute top-[-5px] right-[-5px]  text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                    </Link>
                </div> </>
                : <><Link to={'/login'} >
                    <div className="text-silver hover:font-bold hover:text-blue-300 cursor-pointer ">
                        Sign In
                    </div>
                </Link>
                    <Link to={'/signup'} >
                        <div className="text-red-600 hover:font-bold hover:text-blue-300 cursor-pointer ">
                            Sign Up
                        </div>
                    </Link></>}

        </div>

    </div>
}
