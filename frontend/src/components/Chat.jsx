import { useContext, useEffect, useRef, useState } from "react";
import { Authcontext } from "../context/authContext";
import axios from "axios";
import { format } from 'timeago.js'
import { Socketcontext } from "../context/Socketcontext";
import { useNotifStore } from "../lib/noti";

export const Chat = ({ chats }) => {

    const { currentUser } = useContext(Authcontext)
    const [chatwindow, Setchatwindow] = useState(null)

    const { socket } = useContext(Socketcontext)

    const windowclick = async (id, receiver) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/chat/${id}`, { withCredentials: true })
            if(!res.data.seenBy.includes(currentUser.id)){
                decrease();
            }
            Setchatwindow({ ...res.data, receiver });
        } catch (e) {
            console.log(e)
        }

    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const text = formdata.get("text")
        if (!text) return;
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/message/newmsg/${chatwindow.id}`, { text }, { withCredentials: true })
            Setchatwindow(prev => ({ ...prev, Message: [...prev.Message, res.data] }))
            e.target.reset()
            socket.emit("sendMessage", {
                receiverId: chatwindow.receiver.id,
                data: res.data
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const read = async () => {
            try {
                await axios.put(`http://localhost:3000/api/v1/chat/readChat${chatwindow.id}`)
            } catch (e) {
                console.log(e)
            }
        }
        console.log("OUTTTTT", chatwindow, socket)
        if (chatwindow && socket) {
            console.log("INNNNNNNNN")
            socket.on("getMessage", (data) => {
                console.log("whsssat", chatwindow.id, data.chatId)
                if (chatwindow.id === data.chatId)
                    Setchatwindow(prev => ({ ...prev, messages: [...prev.messages, data] }))
                read();
            })
        }
    }, [chatwindow, socket])
    const MessageEndRef = useRef()

    useEffect(() => {

        MessageEndRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [chatwindow])

    const decrease = useNotifStore((state)=> state.decrease)

    return (<div>
        {chatwindow && (
            <div className="bg-white mt-4 fixed bottom-0 left-[55%] mx-auto w-2/5 rounded-t-lg">
                <div className="flex justify-between bg-blue-400 rounded-t-md">
                    <div className="flex items-center gap-3">
                        <img
                            src={chatwindow.receiver.avatar || "/default-avatar.jpg"}
                            alt="pfp.jpg"
                            className="w-7 h-7 ml-2 rounded-full"
                        />
                        <div className="text-white font-montserrat font-semibold">
                            {chatwindow.receiver.username}
                        </div>
                    </div>
                    <div
                        className="text-xl font-bold font-montserrat cursor-pointer mr-3 mb-2 mt-1"
                        onClick={() => Setchatwindow(null)}
                    >
                        X
                    </div>
                </div>
                <div className="h-[250px] bg-slate-100 text-black p-1 overflow-y-scroll">
                    {chatwindow.Message.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex mb-2 gap-1 w-full ${msg.userId === currentUser.id ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div className={`flex items-end gap-1 w-1/2 ${msg.userId === currentUser.id ? "flex-row-reverse" : "flex-row"}`}>

                                <div className="flex flex-col items-start">
                                    <p
                                        className={`border border-black p-1.5 rounded-md ${msg.userId === currentUser.id ? "bg-blue-200 text-right" : "bg-green-200 text-left"
                                            }`}
                                    >
                                        {msg.text}
                                    </p>
                                    <p className="text-xs text-slate-600 ml-2">
                                        {format(msg.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={MessageEndRef}></div>
                </div>
                <form onSubmit={handlesubmit} className="w-full flex">
                    <input
                        type="text"
                        name="text"
                        placeholder="Type your message..."
                        className="w-full text-black bg-slate-300"
                    />
                    <button className="p-2 bg-blue-600 font-poppins">Send</button>
                </form>
            </div>
        )}

        <div className="flex flex-col p-6 cursor-pointer">
            {
                chats?.map((c) => (
                    <div key={c.id} className="flex mb-4 gap-2  border border-white p-3 rounded-md" onClick={() => windowclick(c.id, c.receiver)} style={{ backgroundColor: c.seenBy.includes(currentUser.id) ? "" : "gray" }}>
                        <img src={c.receiver.avatar || "/default-avatar.jpg"} className="rounded-full h-6 w-6" alt="John Doe" />
                        <div >
                            <p>{c.receiver.username}
                                <span className="ml-2">{c.lastMessage}</span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    );
}
