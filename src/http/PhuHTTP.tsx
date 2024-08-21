import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "./AxiosInstance";
import { url } from "../constant/url";
import axios from "axios";

//gửi email quên mật khẩu
export const sendMail = async (email: string) =>{
    try {
        const url = '/password/send-mail';
        const body = {
            to : email,
        }
        return await AxiosInstance().post(url,body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Kiểm tra OTP
export const checkOTP = async (code: number) => {
    try {
        const tokenOTP = await AsyncStorage.getItem('TokenForgot');
        if (!tokenOTP) {
            throw new Error("No access token found");
        }
        const urlVerifyCode = `${url}password/verify-code`;
        const body = { code: code };
        const response = await axios.post(urlVerifyCode, body, {
            headers: {
                Authorization: `Bearer ${tokenOTP}`,
            },
        });
        return response;
        
    } catch (error) {
        console.log(error);
        console.error('Error during OTP verification:', error); 
        throw error;
    }
}

// reset pass
export const resetPassword = async (password: string, email:string ) => {
    try {
        
        const url = `/password/reset-password`;
        const body = {password, email};
        return await AxiosInstance().post(url, body,{
    });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// change password
export const changePassword = async (passwordOld: string, passwordNew:string, token:any ) => {
    try {
        
        const url = `/password/change-password`;
        const body = {passwordOld, passwordNew};
        return await AxiosInstance().post(url, body,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
    });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//update profile
export const updateProfile = async (id:any, email: string, fullname: string, 
    dateOfBirth: Date, phone: number|null,
        address: string|null , gender: string|null) => {
    try {
        const url = `/user/update/${id}`;
        const body = { email, fullname, dateOfBirth, phone, address, gender };
        return await AxiosInstance().patch(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//get user by ID
export const getUSerByID = async (id:any, token:any) => {
    try {
        const url = `/user/get-one/${id}`;
        return await AxiosInstance().get(url, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//update avatar
export const updateAvatar = async (id:any, avatar: string) => {
    try {
        const url = `/user/update/${id}`;
        const body = { avatar};
        return await AxiosInstance().patch(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//update background
export const updateBackground = async (id:any, background: string) => {
    try {
        const url = `/user/update/${id}`;
        const body = { background};
        return await AxiosInstance().patch(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// get post by user
export const getPostByUser = async (id:any) => {
    try {
        const url = `posts/get-by-user/${id}`;
        const token = await AsyncStorage.getItem('token');
        return AxiosInstance().get(url, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    } catch (error) {
        console.log("Lỗi lấy ds bài viết của user: ",error);

    }
  
}

//share post
export const sharePost = async (share: any, content: string|null, permission:any, type: any) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const url = '/posts';
        const body = {share, content, permission, type}
        return await AxiosInstance().post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};