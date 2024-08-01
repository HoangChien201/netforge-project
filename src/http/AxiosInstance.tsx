import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../constant/url';

// Sử dụng địa chỉ IP của máy chủ thay vì localhost
const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: url,
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                config.headers['Accept'] = 'application/json';
                config.headers['Content-Type'] = contentType;
                return config;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;
