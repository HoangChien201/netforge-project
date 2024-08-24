import axios from "axios";
import AxiosInstance from "./AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../constant/url";
import { FriendType } from "../component/message/ModalNewMessage";

//getOnePost
//
// https://network-social-sever.onrender.com
export const getPostById = async (postId: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = `/posts/find-one/${postId}`;
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
};

// Upload image

// https://network-social-sever.onrender.com
export const upLoadMedia = async (formData: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
<<<<<<< Updated upstream
        const response =  await axios.post(
            `https://network-sever-1.onrender.com/image/uploads/`,
=======
        const response = await axios.post(
            `${url}image/uploads/`,
>>>>>>> Stashed changes
            formData,
            { headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data" } }
        );

        // Check if response data is an array
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error('Upload result is not an array');
        }
    } catch (error) {
        console.error('Error uploading media:', error);
        throw error;
    }

};
// Create new post

// https://network-social-sever.onrender.com
export const createNewPost = async (postDetails: any) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const url = '/posts';
        const response = await AxiosInstance().post(url, postDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// Update post 
//
// https://network-social-sever.onrender.com
export const updatePost = async (postId: number, postDetails: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = `/posts/update/${postId}`;
        const body = {
            ...postDetails
        };
        return await AxiosInstance().put(url, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete post
//Delete
//https://network-social-sever.onrender.com/posts/delete/:id
export const deletePost = async (postId: number) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = `/posts/delete/${postId}`;
        return await AxiosInstance().delete(url,
            { headers: {
                Authorization: `Bearer ${token}`}}
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// lấy danh sách gợi ý
//GET
// https://network-social-sever.onrender.com/friendship/recommend
export const getSuggest = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error('No access token found'); // Xử lý trường hợp không có token
        }
        const url = '/friendship/recommend'
        const result = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// lấy danh sách lời mời
//GET
// https://network-social-sever.onrender.com/friendship/receive-request
export const getRequest = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = '/friendship/receive-request'
        const result = await AxiosInstance().get(url, {
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

        return result
    } catch (error) {
        console.log(error);

        throw error;
    }
}
// gửi yêu cầu kết bạn
//POST
// https://network-social-sever.onrender.com/friendship
export const sendRequest = async (user2: number, status: number,) => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = '/friendship'
        const result = AxiosInstance().post(url, {
            status: status,
            user2: user2
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result
    } catch (error) {

    }
}
// chấp nhận yêu cầu kết bạn
//POST
// https://network-social-sever.onrender.com/friendship/accept-request
export const acceptRequest = async (friendId: number) => {

    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = '/friendship/accept-request'
        const result = await AxiosInstance().post(url, {
            user1: friendId
        }, {
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
//POST
//https://network-social-sever.onrender.com/friendship/cancle-request
export const cancelRequest = async (friendId: number) => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new Error("No access token found");
        }
        const url = '/friendship/cancle-request'
        const result = await AxiosInstance().post(url, {
            user2: friendId
        }, {
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
// từ chối yêu cầu
//POST
// https://network-social-sever.onrender.com/friendship/reject-request
export const cancelWaitAccept = async (friendId: number) => {
    try {
        const token = await AsyncStorage.getItem('token')
        const url = '/friendship/reject-request'
        const result = await AxiosInstance().post(url, {
            user1: friendId
        }, {
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
// POST
// https://network-social-sever.onrender.com/friendship/get-all
// status 1 = request
// status 2 = friends
export const getFriends = async (num: number) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = '/friendship/get-all';
        const response:Array<FriendType> = await AxiosInstance().post(url, {
            status: num
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response; // Nếu bạn muốn lấy dữ liệu từ response
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//GET
//https://network-social-sever.onrender.com/user/history-activity
export const getUserHistories = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = '/user/history-activity'
        const response = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//GET
//https://network-social-sever.onrender.com/friendshipun-friendship?

export const deleteFriend = async (user1: number, user2: number) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = '/friendship/un-friendship'
        const response = await AxiosInstance().delete(url, {
            data: {
                user1: user1,
                user2: user2,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
}
//GET
//https://network-social-sever.onrender.com/user/get-one/id
export const getUserById = async (id: number) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = `/user/get-one/${id}`
        const response = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//GET
//https://network-social-sever.onrender.com/user/get-one/id
export const getAllUser = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const url = '/user'
        const response = await AxiosInstance().get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}