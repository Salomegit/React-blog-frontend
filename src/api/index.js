import axios from "axios";

const BASED_URL = "http://localhost:5000/backend";
const axiosQuery = axios.create({ baseURL: BASED_URL });
export { axiosQuery };
