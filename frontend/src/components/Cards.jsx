import { Link } from "react-router-dom"

export const Cards = ({ item }) => {
    console.log("AS", item)
    const dateString = item.date
    
    const fixeddate = new Date(dateString);
    const options = {
                month: 'long',
        day: 'numeric',
              };
      
      const formattedDate = fixeddate.toLocaleDateString(undefined, options);
      
      console.log(formattedDate);  
       
      
    return <div>
        <Link to={`/eventinfo/${item.id}`} >
            <div className="relative h-full flex" >
                <img src={item.images[0]} className="object-cover aspect-video h-[150px] w-[160px] rounded-md " />
                <div className="w-full ml-2 font-sans ">
                    <div className="text-xl font-semibold p-2">
                        {item.title} | <span className="text-slate-200">{item.city}</span>
                    </div>
                    <div className="flex text-sm font-medium font-poppins mt-2">
                        <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd" />
                        </svg>
                        <div>{formattedDate} </div>

                    </div>
                    <div className="flex text-sm mt-1 "><svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                    </svg>
                        {item.address}
                    </div>
                    <div className="flex text-base font-semibold font-poppins text-slate-300 mt-5">
                        <p className="">₹{item.price} ONWARDS</p>
                        <div className="flex justify-between ">
                        </div>
                        <div className="  hover:text-white text-black hover:font-bold ml-4">
                            | BUY NOW
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
}