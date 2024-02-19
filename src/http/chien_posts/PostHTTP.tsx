import AxiosInstance from "../AxiosInstance";


export async function GetAllPosts(){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/posts/get-all'
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách bài viết lỗi');
        throw error;
    }
}
