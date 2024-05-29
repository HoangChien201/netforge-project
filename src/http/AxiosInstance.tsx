import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sử dụng địa chỉ IP của máy chủ thay vì localhost
const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.1.33:3000/',
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            try {
                const token = await AsyncStorage.getItem('AccessToken');
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
