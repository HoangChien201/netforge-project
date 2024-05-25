import React, { ContextType, ReactNode, createContext, useContext, useState } from "react";

 export interface Todo {
    user: string,
    setUser: React.Dispatch<React.SetStateAction<string>>
}

interface MyContextProviderProps {
    children: ReactNode;
  }

const UserContext = createContext<Todo | undefined>(undefined);

export const UserProvider: React.FC<MyContextProviderProps> = ({ children }) => {

    const [user, setUser] = useState<string>('');
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useMyContext = () => {
    const context = useContext(UserContext);
   
    return context;
  };