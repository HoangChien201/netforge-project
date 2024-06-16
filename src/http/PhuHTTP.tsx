
import AxiosInstance from "./AxiosInstance";

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
export const checkOTP = async (code: number, token:string|null ) => {
    try {
        const url = '/password/verify-code';
        const body = { code };
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

// reset pass
export const resetPassword = async (password: string,token:string|null) => {
    try {
        
        const url = `/password/reset-password`;
        const body = {password};
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
export const updateProfile = async (id:number, email: string, fullname: string, 
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
export const getUSerByID = async (id:number, token:string) => {
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
