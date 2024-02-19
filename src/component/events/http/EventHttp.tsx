import  AxiosInstance  from "./AxiosInstance";

export const getAllEvents = async () => {
    try {

        const url = '';
        const response = await AxiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getMyEvents = async () => {
    try {

        const url = '';
        const response = await AxiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getEventDetail  = async (id: any)=>{
    try {

        const url = `/${id}`;
        const response = await AxiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getEventByTopic  = async (id: any)=>{
    try {

        const url = `/event/get-by-topic/${id}`;
        const response = await AxiosInstance.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const upLoadImage = async (form: any) =>{
    try {

        const url = '/v1/media/upload';
        const result = await AxiosInstance.post(url,form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const createNewEvent = async (name: any, about: any,price: any,imagePath: any) =>{
    try {
        const url = '';
        const body = {
            name: name,
            about: about,
            price:price,
            path:imagePath
        }
        return await AxiosInstance.post(url,body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//http://localhost:8000/v1/dishes/find/search?about=bánh
export const searchEvent = async (keyword: any) => {
    try {

        const url = `/search?keyword=${keyword}`;
        const result = await AxiosInstance.get(url);
        return result;
    } catch (error) {
        console.log('>>>>>>>> search news', error);
        throw error;
    }
}
export const deleteEvent = async (_id: any) =>{
    try {
        const url = `/event/delete/${_id}`;
        return await AxiosInstance.delete(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}