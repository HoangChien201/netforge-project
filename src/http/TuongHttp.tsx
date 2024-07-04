import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "./AxiosInstance";
import { login } from "./userHttp/user";
// tìm kiếm
export const searchUser = async(keyword:string,) => {
    try {
      const token = await AsyncStorage.getItem('token')
      const  axios = await AxiosInstance();
      const url = `/user/search?keyword=${keyword}`
      const result =  axios.get(url,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      return result
    } catch (error) {
      console.log('searchUser', error)
      throw error;
    }
}
// lấy danh sách bình luận
export const getComments = async (id:number) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const axios = await AxiosInstance();
    const url = `/comment/get-by-posts/${id}`
    const result = axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return result;
  } catch (error) {
    console.log('comments', error)
    throw error;
  }
}
// thêm bình luận
export const addComments = async (posts: number, content: string, image: string, parent: number) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const axioss = await AxiosInstance();
    const url = '/comment/'
    
    
    const body = {
      posts: posts,
      content: content,
      image: image,
      parent: parent
    }
    const result = axioss.post(url, body,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );
    return result


  } catch (error) {
    console.log('addComments', error); // Xuất lỗi
    throw error;
    
  }
}
// upload image
export const uploadImage = async (files) => {
  try {
    const axiosInstance = AxiosInstance("multipart/form-data");
    const url = '/image/uploads';
    const result = await axiosInstance.post(url, files,
    );
    return result;
  } catch (error) {
    console.log('>>>>>upload Image: ', error);
    throw error
  }
}
// lấy danh sách trả lời bình luận
export const getReplyComments = async(parent: number) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const axios = await AxiosInstance();
    const url = `/comment/get-by-comment/${parent}`
    const result = axios.get(url,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
    return result;
  } catch (error) {
    console.log('comments', error)
    throw error;
  }
}
// delete comment nè
export const deleteComments = async(id: number) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const axios = await AxiosInstance();
    const url = `/comment/delete/${id}`
    const result = axios.delete(url)
    return result;
  } catch (error) {
    console.log('delete-comments', error)
    throw error;
  }
}
// lấy danh sách bài viết chi tiết 
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
// like commentsne
export const addLikeComments = async (comment: number, reaction: number) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const axioss = await AxiosInstance();
    const url = '/like-comment'
    const body = {
      comment: comment,
      reaction: reaction,
    }
    const result = axioss.post(url, body,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );
    console.log("tokenne", token);
    return result


  } catch (error) {
    console.log('addComments', error); // Xuất lỗi
    throw error;
    
  }
}
// delete likecomment nè
export const deleteLikeComments = async(comment_id: number, user_id:number) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const axios = await AxiosInstance();
    const url = `/like-comment/delete?comment_id=${comment_id}&user_id=${user_id}`
    const result = axios.delete(url)
    return result;
  } catch (error) {
    console.log('delete-like-comments', error)
    throw error;
  }
}
// get like posts
// lấy danh sách bài viết chi tiết 
export const getLikePostById = async(id: number) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const axios = await AxiosInstance();
    const url = `/like-posts/get-by-posts/${id}`
    const result = axios.get(url,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
    return result;
  } catch (error) {
    console.log('get-like-post-byId', error)
    throw error;
  }
}