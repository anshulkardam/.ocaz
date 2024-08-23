import axios from "axios"

export const eventinfoloader = async({request,params}) => {
    console.log(params.id)
    const response = await axios.get(`http://localhost:3000/api/v1/post/event/${params.id}`)
    return response.data
}
 export const alleventsloader = async({request,params}) => {
    const query = request.url.split("?")[1]
    const response = await axios.get(`http://localhost:3000/api/v1/post/eventslist?${query}`)
    return response.data
 }