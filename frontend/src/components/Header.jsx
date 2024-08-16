import { Link } from "react-router-dom"

export const Header = () => {

    return <div className="bg-zinc-950 p-[15px] w-full sticky z-50 top-0 flex justify-between">
        <div className='flex gap-2'>
            <img src="./123.png" alt="logo.png" width="40px" height="20px" />
            <div className="text-white font-montserrat font-bold text-2xl cursor-pointer ">.ocaz</div>
            <div className='text-silver flex font-montserrat font-semibold gap-10 pl-10 items-center text-sm'>
                <div className=" hover:font-bold  hover:text-coral cursor-pointer ">
                    Upcoming Events
                </div>
                <div className=" hover:font-bold hover:text-coral cursor-pointer ">
                    About
                </div>

            </div>
        </div>
        <div className="text-white font-montserrat font-semibold flex justify-end gap-10 pr-10 items-center">
            <Link to={'/login'} >
            <div className="text-silver hover:font-bold hover:text-blue-300 cursor-pointer ">
                Sign In
            </div>
            </Link>
            <Link to={'/signup'} >
            <div className="text-red-600 hover:font-bold hover:text-blue-300 cursor-pointer ">
                Sign Up
            </div>
            </Link>
        </div>

    </div>
}
