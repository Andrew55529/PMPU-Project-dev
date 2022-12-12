import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export const API_URL = `http://127.0.0.1:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL

})


$api.interceptors.request.use( (config) => {
    // console.log("REQ");
    // console.log(config);
   // console.log(`Bearer ${localStorage.getItem('token')}`);
    config.headers = { ...config.headers };
    // config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    // console.log(config);
    return config;
})

$api.interceptors.response.use( (config) => {
    // console.log(config);
    return config;
},async (error) => {
    // console.log(error);
    const originalRequest = error.config;
    //console.log(error);
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }

    }
    throw error;
})

export default $api;