import AxiosInstance from "../../../http/AxiosInstance"
export const login = async (email: string, password: string) => {
    try {
        const axioInstance = AxiosInstance();
        const url = "/v1/auth/login";
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
export const loginWithTouchId = async (email) => {
    try {
        const axioInstance = AxiosInstance();
        const url = "/v1/auth/login/touchid";
        const body = { email };
        const res = await axioInstance.post(url, body);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
