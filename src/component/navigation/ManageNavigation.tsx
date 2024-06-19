import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useMyContext } from './UserContext'
import NetworkStack from '../stack/NetworkStack'
import LoginScreen from '../../screens/LoginScreen'
import SignupScreen from '../../screens/SignInScreen'
import ModalPoup from '../Modal/ModalPoup'
import UserStack from '../stack/UserStack'
import SplashScreen from '../../screens/SplashScreen'
import AxiosInstance from '../../http/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {login} from '../../http/userHttp/user'

export type navigationType = StackNavigationProp<RootStackParamList>
type routeType = RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {

};
const ManageNavigation: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);
    const { user, setUser } = useMyContext();
    const handleAutoLogin = async () => {
        try {
            const keepLoggedIn = await AsyncStorage.getItem('keep');
            if (keepLoggedIn === 'true') {

                const stEmail = await AsyncStorage.getItem('email');
                const stPassword = await AsyncStorage.getItem('password');
                if (stEmail !== null && stPassword !== null) {
                    const email = String(stEmail);
                    const password = String(stPassword);
                    try {
                        const result = await login(email, password);
                        setUser(result.data)
                    } catch (error) {
                        console.log(error);
                        
                    }
                } 
            }else{
                console.log('User chose not to stay logged in');
                return;
            }

        } catch (error) {
            console.log("Auto login error", error);
        }
    };
    useEffect(() => {
        handleAutoLogin();
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1500);

        return () => clearTimeout(timer); 
    }, []);
    if (showSplash) {
        return <SplashScreen />;
    }
    return (
        <NavigationContainer>
            {user ? <NetworkStack /> : <UserStack />}
        </NavigationContainer>
    )
}

export default ManageNavigation