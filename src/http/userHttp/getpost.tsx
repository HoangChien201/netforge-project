import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../AxiosInstance";
export const getAll = async (token:any,id?:number) => {
    try {
        const axioInstance = AxiosInstance();
        const url1 = `/posts/get-by-user/${id}`;
        const url = `/posts/get-by-user-request`;
       
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        const res = await axioInstance.get(url, headers)
        //console.log("ddfsd",res);
        
        return res
    } catch (error) {
        console.log("Lỗi get",error);

    }
  
}
export const SharePost = async (idShare:number) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = `/posts/find-one/${idShare}`;
        const result = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log('Server response:', result); // Logging toàn bộ phản hồi từ server

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
  
}

export const likePost = async(postId:number,reaction:number) =>{
    try {
        const axioInstance = AxiosInstance();
        const url = `/like-posts`;
        const token = await AsyncStorage.getItem('token');
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
export const deleteLikePost = async (postId:number, userId:number) => {
    try {
        const axioInstance = AxiosInstance();
        const url = `/like-posts/delete?posts_id=${postId}&user_id=${userId}`;
        const response = await axioInstance.delete(url);
        console.log('Response:', response);
    } catch (error) {
        console.log("Lỗi get",error);
    }
};
export const updateLikePost = async (postId:number, userId:number,reaction:number) => {
    try {
        const axioInstance = AxiosInstance();
        const url = `/like-posts/update?posts_id=${postId}&user_id=${userId}`;
        const body = {
            reaction
        };
        const response = await axioInstance.patch(url,body);
        console.log('Response:', response);
    } catch (error) {
        console.log("Lỗi get",error);
    }
};
export const deletePost = async (postId: number) => {
    try {
        const axioInstance = AxiosInstance();
        const url = `/posts/delete/${postId}`;
        const response = await axioInstance.delete(url);
        console.log('Response:', response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};