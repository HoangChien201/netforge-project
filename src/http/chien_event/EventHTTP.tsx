import AxiosInstance from "../AxiosInstance";

export async function GetAllEventHTTP(){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/event/'
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách sự kiện lỗi');
        throw error;
    }
}

export async function GetEventDetailHTTP(id:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/event/get-one/'+id;
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy danh sách sự kiện chi tiết lỗi');
        throw error;
    }
}