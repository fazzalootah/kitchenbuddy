import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://api.openai.com/v1/`,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    }
});
export default axiosInstance