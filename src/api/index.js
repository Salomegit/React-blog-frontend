import axios from "axios";

const config = {
    BASED_URL: process.env.REACT_APP_BACKEND_URL,
}
const axiosQuery = axios.create({ baseURL: config.BASED_URL + "/backend" });
export { axiosQuery, config as reactConfig };
