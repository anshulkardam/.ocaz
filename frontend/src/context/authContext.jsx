import { createContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, SetcurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const updateUser = (data) => {
        SetcurrentUser(data)
    }
    
    useEffect(()=>{

        localStorage.setItem("user", JSON.stringify(currentUser))

    },[currentUser])
    return <Authcontext.Provider value={{currentUser,updateUser}}>
        {children}
    </Authcontext.Provider>
}