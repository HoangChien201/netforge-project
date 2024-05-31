import AxiosInstance from "./AxiosInstance";
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
