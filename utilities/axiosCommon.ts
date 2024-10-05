import axios from "axios";

const axiosCommon = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export default axiosCommon