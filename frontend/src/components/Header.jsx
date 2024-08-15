export const Header = () => {

    return <div className="bg-zinc-950 p-[15px] w-full sticky z-50 top-0 flex justify-between">
        <div className='flex gap-2'>
         
            <div className="text-blue-500 font-montserrat font-bold text-2xl cursor-pointer ">EventiFyr</div>
            <div className='text-white flex font-montserrat font-semibold gap-10 pl-10 items-center text-sm'>
                <div className=" hover:font-bold  hover:text-blue-400 cursor-pointer ">
                    Upcoming Events
                </div>
                <div className=" hover:font-bold hover:text-blue-400 cursor-pointer ">
                    Host an Event
                </div>
                <div className=" hover:font-bold hover:text-blue-400 cursor-pointer ">
                    About
                </div>

            </div>
        </div>
        <div className="text-white font-montserrat font-semibold flex justify-end gap-10 pr-10 items-center">
            <div className="text- hover:font-bold hover:text-blue-300 cursor-pointer ">
                Sign In
            </div>
            <div className="text- hover:font-bold hover:text-blue-300 cursor-pointer ">
                Sign Up
            </div>
        </div>

    </div>
}