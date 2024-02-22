import { EventRequest } from "../../component/events/screens/CreateNewEventScreen";
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

export async function CreateEventHTTP(event:EventRequest){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/event/';
        const response = await axiosInstance.post(url,event);
        return response;
    } catch (error) {
        console.log('thêm sự kiện lỗi');
        throw error;
    }
}

export async function DeleteEventHTTP(id:number){
    try {
        const axiosInstance = AxiosInstance();
        const url = '/event/'+id;
        const response = await axiosInstance.delete(url);
        return response;
    } catch (error) {
        console.log('xóa sự kiện lỗi');
        throw error;
    }
}