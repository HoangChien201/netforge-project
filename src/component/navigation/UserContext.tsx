import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../http/AxiosInstance";

export interface Todo {
    user: string,
    setUser: React.Dispatch<React.SetStateAction<string>>
}

interface MyContextProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<Todo | undefined>(undefined);

export const UserProvider: React.FC<MyContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useMyContext = () => {
    const { user, setUser } = useContext(UserContext);

    // const handleAutoLogin = async () => {
    //     try {
    //         const axioInstance = AxiosInstance();
    //         const token = await AsyncStorage.getItem('userToken');
    //         if (!token) {
    //             console.log('Không có token');
    //             return;
    //         }

    //         const url = "/v1/user/profile";
    //         const res = await axioInstance.get(url, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         if (res.data) {
    //             setUser(res.data);
    //             await AsyncStorage.setItem('token', token);
    //         }
    //     } catch (error) {
    //         console.log("Lỗi đăng nhập tự động", error);
    //     }
    // };

    // useEffect(() => {
    //     handleAutoLogin();
    // }, []);

    return { user, setUser };
};
