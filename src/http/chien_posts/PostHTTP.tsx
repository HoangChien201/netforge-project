import { PostsRequest } from "../../component/events/component/posts/ModalCreatPosts";
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

export async function CreatePostsHTTP(data:PostsRequest){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/posts'
        const response = await axiosInstance.post(url,data);
        return response;
    } catch (error) {
        console.log('tạo bài viết lỗi');
        throw error;
    }
}