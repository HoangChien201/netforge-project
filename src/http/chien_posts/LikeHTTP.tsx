import AxiosInstance from "../AxiosInstance";


export async function Like(user:number,posts:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = `/like?posts_id=${posts}&user_id=${user}`
        const response = await axiosInstance.post(url);
        return response;
    } catch (error) {
        console.log('like lỗi');
        throw error;
    }
}

export async function Unlike(user:number,posts:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = `/like/delete?posts_id=${posts}&user_id=${user}`
        const response = await axiosInstance.delete(url);
        return response;
    } catch (error) {
        console.log('unlike lỗi');
        throw error;
    }
}