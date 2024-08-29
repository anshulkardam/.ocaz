import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/loaders";

export function ChatModal({ userID }) {
    const inputRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    const [Id,setID] = useState("")
    const [msg,setmsg] = useState("")
    const navigate = useNavigate()
    console.log("milgya", userID)
    const handleClick = async () => {
        console.log(" hi from handleclick")
        setOpenModal(true);
        Checkx()
    };
    async function Checkx() {
        console.log("hi from checkx")
        const res = await axios.post(`${apiUrl}/api/v1/chat/addchat`, { receiverId: userID }, { withCredentials: true })
        console.log("checkdata:",res.data)
        setID(res.data.id)
    }
    async function chatmsg(message) {
        console.log("hi from chatmsg",msg)
        await axios.post(`${apiUrl}/api/v1/message/newmsg/${Id}`,{text: message }, {withCredentials:true})
        navigate('/profile')
    }
     
    async function handleSEND() {
        console.log(" hi from handleSEND")
        const message = inputRef.current.value;
        console.log("Message to send:", message);
        chatmsg(message);
    }
    
    return (
        <>
            <Button onClick={handleClick} className="w-full flex items-center justify-center text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16"    >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                    Message
                </div>
            </Button>


            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <div>Send Message
                        <div className="text-sm font-normal">Enter your message to the recipient below.</div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 font-semibold flex items-center gap-4 justify-center">
                        <p className="items-center flex flex-col">Message </p>
                        <textarea ref={inputRef}   className="h-[150px] w-[500px] rounded-md font-normal" placeholder="Type your message..." required></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={handleSEND}>Send Message</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
