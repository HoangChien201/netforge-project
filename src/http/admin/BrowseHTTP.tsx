import AxiosInstance from "../AxiosInstance";

export async function GetBrowseEventHTTP(){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/event/get/browse-event'
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách browse-event');
        throw error;
    }
}

export async function AcceptanceBrowseEventHTTP(id:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/event/browse-acceptance-event/'+id
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('browse-acceptance-event');
        throw error;
    }
}

export async function RejectBrowseEventHTTP(id:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/event/browse-reject-event/'+id
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('browse-acceptance-event');
        throw error;
    }
}

export async function GetBrowsePostsHTTP(){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/posts/get/browse-posts'
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách browse-posts');
        throw error;
    }
}

export async function AcceptanceBrowsePostsHTTP(id:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/posts/browse-acceptance-posts/'+id
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('browse-acceptance-posts');
        throw error;
    }
}

export async function RejectBrowsePostsHTTP(id:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/posts/browse-reject-posts/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('browse-reject-posts');
        throw error;
    }
}