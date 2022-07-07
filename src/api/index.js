import axios from "axios";

const BASED_URL =process.env.REACT_APP_BACKEND_URL;
const axiosQuery = axios.create({ baseURL: BASED_URL });
export { axiosQuery };
