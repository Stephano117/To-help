
import axios from "axios";

const API_URL = 'http://localhost/api'

const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// apiClient.interceptors.request.use(async (config) => {
//     const token = await getToken()
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config;
// })

export default apiClient;