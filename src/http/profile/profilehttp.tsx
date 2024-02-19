import AxiosInstance from "../AxiosInstance";

export const GetPostsByUserHTTP = async (id:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/posts/get-by-user/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách bài viết của user lỗi');
        throw error;
    }
}