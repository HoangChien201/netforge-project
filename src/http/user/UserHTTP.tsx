import AxiosInstance from "../AxiosInstance";

export type UserRespone={
    email:string,
    password:string,
    role:number,
    phone:number,
    avatar:string,
    address:string,
    fullname:string,
    gender:string,
    token:string
}

export const SignIn = async (email:string,password:string) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/auth/sign-in';
        const body={
            email:email,
            password:password
        }
        const response:UserRespone = await axiosInstance.post(url,body);
        return response;
    } catch (error) {
        console.log('dang nhap lỗi');
        throw error;
    }
}