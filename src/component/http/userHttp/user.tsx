import AxiosInstance from "../../../http/AxiosInstance"
export const login = async (email: string, password: string) => {
    try {
        
        const axioInstance = AxiosInstance();
        const url = "/auth/sign-in";
        const body = {
            email: email,
            password: password
        }
        const res = await axioInstance.post(url, body)
        return res
    } catch (error) {
        console.log(error);

    }
}

export const regiter = async (email: string, password: string, fullname: string) => {
    try {
        const axioInstance = AxiosInstance();
        const url = "user";
        const body = {
            email: email,
            password: password,
            fullname: fullname
        }
        const res = await axioInstance.post(url, body)
        return res
    } catch (error) {
        console.log(error);

    }
}
