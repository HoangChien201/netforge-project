import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../AxiosInstance";
export const getAll = async () => {
    try {
        const axioInstance = AxiosInstance();
        const url = `/posts/get-by-user-request`;
        const token = await AsyncStorage.getItem('token');
        console.log("Lỗi tolem",token);
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        const res = await axioInstance.get(url, headers)
        return res
    } catch (error) {
        console.log("Lỗi get",error);

    }
  
}
export const likePost = async(postId:number,reaction:number) =>{
    try {
        const axioInstance = AxiosInstance();
        const url = `/like-posts`;
        const token = await AsyncStorage.getItem('token');
        console.log("Lỗi tolem",token);
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        const body = {
            posts:postId,
            reaction
        };
        const res = await axioInstance.post(url,body, headers)
        return res
    } catch (error) {
        console.log("Lỗi get",error);

    }
}