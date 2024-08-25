import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"
import { Authcontext } from "./authContext";

export const Socketcontext = createContext();

export const SocketContextProvider = ({ children }) => {
   const [socket,setSocket] = useState(null)
   const {currentUser} = useContext(Authcontext)

    useEffect(() => {

      setSocket(io("http://localhost:4000"))

    }, [])

    useEffect(()=> {
        
        currentUser && socket?.emit("newUser", currentUser.id)
    },[currentUser,socket])

    return <Socketcontext.Provider value={{ socket }}>
        {children}
    </Socketcontext.Provider>
}