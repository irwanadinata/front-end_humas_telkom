import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default axiosWithConfig;