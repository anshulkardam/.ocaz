import axios from "axios"
import { defer } from "react-router-dom"


export const apiUrl = import.meta.env.VITE_API_BASE_URL;


export const eventinfoloader = async({request,params}) => {
    console.log(params.id)
    const response = await axios.get(`${apiUrl}/api/v1/post/event/${params.id}`)
    return response.data
}
 export const alleventsloader = async({request,params}) => {
    const query = request.url.split("?")[1]
    const response = await axios.get(`${apiUrl}/api/v1/post/eventslist?${query}`)
    return defer({
        postResponse: response
    })
 }

 export const profilepageloader = async( ) => {
    const response = await axios.get(`${apiUrl}/api/v1/post/eventslist`)
    const chatPromise = await axios.get(`${apiUrl}/api/v1/chat/chats`, {withCredentials:true})
    return defer({
        Eventresponse : response,
        chatResponse: chatPromise
    })
 }