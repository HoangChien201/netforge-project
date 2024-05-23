import AxiosInstance from "./AxiosInstance";

// Upload image
export const upLoadImage = async (form) => {
    try {
        const axiosInstance = AxiosInstance('multipart/form-data');
        const url = '/v1/media/upload';
        const result = await axiosInstance.post(url, form);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Create new post
export const createNew = async (creator, type, text, imagePath) => {
    try {
        const url = '/v1/post/createNew';
        const body = {
            creator: creator,
            type:type,
            text: text,
            path: imagePath
        };
        return await AxiosInstance().post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Update post
export const updatePost = async (postId, type, text, imagePath) => {
    try {
        const url = `/v1/post/update/${postId}`;
        const body = {
            text: text,
            type:type,
            path: imagePath
        };
        return await AxiosInstance().put(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Delete post
export const deletePost = async (postId) => {
    try {
        const url = `/v1/post/delete/${postId}`;
        return await AxiosInstance().delete(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
