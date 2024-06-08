import AxiosInstance from "./AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
//getOnePost
export const getPostById = async (postId) => {
    try {
        const url = `/v1/post/posts/${postId}`;
        const result = await AxiosInstance().get(url);
        console.log('Server response:', result); // Logging toàn bộ phản hồi từ server
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Upload image
export const upLoadMedia = async (formData) => {
    try {
        const axiosInstance = AxiosInstance('multipart/form-data');
        const url = '/v1/image/upload';
        const result = await axiosInstance.post(url, formData);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// Create new post
export const createNewPost = async (postDetails) => {
    try {
        const url = '/v1/post/posts';
        const body = {
            ...postDetails
        };
        return await AxiosInstance().post(url, body);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Update post
export const updatePost = async (postId, type, text, images) => {
    try {
        const url = `/v1/post/posts/${postId}`;
        const body = {
            text: text,
            type: type,
            images: images
        };
        return await AxiosInstance().put(url, body);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete post
export const deletePost = async (postId) => {
    try {

        const url = `/v1/post/delete/${postId}`;
        return await AxiosInstance().delete(url);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// lấy danh sách gợi ý
//http://localhost:8080/v1/user/suggested
export const getSuggest = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error('No access token found'); // Xử lý trường hợp không có token
        }
        const url = '/v1/user/suggested'
        const result = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.suggestedFriends;;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// lấy danh sách lời mời
//http://localhost:8080/v1/user/requested
export const getRequest = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = '/v1/user/requested'
        const result = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return result.reqFriends
    } catch (error) {
        console.log(error);

        throw error;
    }
}

// lấy danh sách yêu cầu
//http://localhost:8080/v1/user/waitaccept
export const getWaitAccept = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = '/v1/user/waitaccept'
        const result = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return result.reqFriends
    } catch (error) {
        console.log(error);

        throw error;
    }
}
// gửi yêu cầu kết bạn
// http://localhost:8080/v1/user/send-request/:id
export const sendRequest = async (friendId) => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = `/v1/user/send-request/${friendId}`
        const result = AxiosInstance().post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result
    } catch (error) {

    }
}
// chấp nhận yêu cầu kết bạn
//http://localhost:8080/v1/user/accept-request/:id
export const acceptRequest = async (friendId) => {

    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = `/v1/user/accept-request/${friendId}`
        const result = await AxiosInstance().post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result
    } catch (error) {
        console.log(error);
        throw error;

    }
}
// hủy lời mời
export const cancelRequest = async (friendId) => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = `/v1/user/cancel-request/${friendId}`
        const result = await AxiosInstance().post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// hủy yêu cầu
export const cancelWaitAccept = async (friendId) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const url = `/v1/user/cancel-waitaccept/${friendId}`
        const result = await AxiosInstance().post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// getFriends
export const getFriends = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        const url = '/v1/user/friends'
        const response = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.reqFriends;
    } catch (error) {
        console.log(error);
        throw error;
    }
}