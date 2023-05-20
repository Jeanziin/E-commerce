import axios from "axios";



const api = axios.create({
    baseURL: "https://swap-backend.onrender.com"
})

export default api