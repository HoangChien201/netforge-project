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
export const getPostById = async(id: number) => {
    try {
      const token = await AsyncStorage.getItem('token')
      const axios = await AxiosInstance();
      const url = `/posts/find-one/${id}`
      const result = axios.get(url,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      return result;
    } catch (error) {
      console.log('get-post-byId', error)
      throw error;
    }
  }