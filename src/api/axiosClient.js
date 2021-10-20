import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
    //Handel something here
    return config;
});


axiosClient.interceptors.response.use(async (res) => {
    //Handel something here
    if (res && res.data) return res.data;
}, (error) => {
    //Handle error
    throw error;
})

export default axiosClient;