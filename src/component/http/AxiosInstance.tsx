import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json'): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        baseURL: 'https://event-server-m0s3.onrender.com/',
    });

    instance.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    config.headers = {
                        ...config.headers,
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': contentType
                    };
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
            return config;
        },
        err => Promise.reject(err)
    );

    instance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );

    return instance;
};

export default AxiosInstance;