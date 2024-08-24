import axios from "axios"
import { defer } from "react-router-dom"

export const eventinfoloader = async({request,params}) => {
    console.log(params.id)
    const response = await axios.get(`http://localhost:3000/api/v1/post/event/${params.id}`)
    return response.data
}
 export const alleventsloader = async({request,params}) => {
    const query = request.url.split("?")[1]
    const response =  axios.get(`http://localhost:3000/api/v1/post/eventslist?${query}`)
    return defer({
        postResponse: response
    })
 }