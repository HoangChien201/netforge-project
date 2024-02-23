import AxiosInstance from "../AxiosInstance";

export type CommentTypeRequest={
    posts_id:number;
    user:number;
    content:string;
}

export async function GetCommentByPostsHTTP(posts_id:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/comment/get-by-posts/'+posts_id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách comment lỗi');
        throw error;
    }
}

export async function CreateCommentByPostsHTTP(data:CommentTypeRequest){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/comment/';
        const response = await axiosInstance.post(url,data);
        return response;
    } catch (error) {
        console.log('thêm comment lỗi');
        throw error;
    }
}