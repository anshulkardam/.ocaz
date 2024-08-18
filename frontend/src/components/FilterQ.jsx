export const FilterQ = () => {
    return <div className="text-white">
        <div className="font-semibold text-xl font-montserrat">Search results for <span className="text-orange-500">Mumbai</span></div>
        <div className="flex flex-col pr-2">
            <div className="font-medium text-lg font-montserrat mt-2  items-center ">Location: </div>
            <input type="text" name="city" id="city" placeholder="Bangalore, Karnataka?" className="rounded-lg py-1 text-black"></input>
           
        </div>
    </div>
}