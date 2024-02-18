import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Tạo một Axios Instance
const AxiosInstance = axios.create({
    baseURL: 'https://api.example.com', // URL gốc của API
    //timeout: 10000, // Thời gian chờ tối đa (milliseconds) cho mỗi yêu cầu
    headers: {
        'Content-Type': 'application/json', // Loại nội dung yêu cầu
        'Accept': 'application/json', // Loại nội dung bạn muốn nhận từ máy chủ
    },
});

// Interceptor cho mỗi yêu cầu trước khi nó được gửi đi
AxiosInstance.interceptors.request.use(
    // Hàm xử lý khi yêu cầu thành công
    async (config) => {
        // Lấy token từ AsyncStorage (được lưu trữ trước đó khi người dùng đăng nhập)
        const token = await AsyncStorage.getItem('token');
        // Nếu token tồn tại, thêm token vào header của yêu cầu với key 'Authorization'
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Trả về cấu hình yêu cầu mới với token được thêm vào (hoặc không)
        return config;
    },
    // Hàm xử lý khi xảy ra lỗi trong quá trình xử lý yêu cầu
    (error) => {
        // Trả về một Promise bị reject với lỗi tương ứng
        return Promise.reject(error);
    }
);

// Xuất instance Axios đã tạo để có thể sử dụng nó trong ứng dụng
export default AxiosInstance;
