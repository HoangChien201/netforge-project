
import OtpScreen from "../events/screens/OtpScreen"
import ResetPassword from "../events/screens/ResetPassword"
import SignUpScreen from "../events/screens/SignUpScreen"
import LoginScreen from "../events/screens/LoginScreen"


export enum UserRootStackEnum{
    LoginScreen='LoginScreen',
    SignUpScreen='SignUpScreen',
    ResetPassword='ResetPassword',
    OtpScreen='OtpScreen',
    
}

export type UserRootStackParams={
    LoginScreen:undefined,
    SignUpScreen:undefined,
    OtpScreen:undefined,
    ResetPassword:undefined,

}

export const UserRootStackScreens=[
    {
        id:Math.random()+""+Date,
        name:UserRootStackEnum.LoginScreen,
        component:LoginScreen,
        options:{
            headerShown:false,
        }
    },
    {
        id:Math.random()+""+Date,
        name:UserRootStackEnum.SignUpScreen,
        component:SignUpScreen,
        options:{
            title:''
        }
    },
    {
        id:Math.random()+""+Date,
        name:UserRootStackEnum.OtpScreen,
        component:OtpScreen,
        options:{
            title:''
        }
    },
    {
        id:Math.random()+""+Date,
        name:UserRootStackEnum.ResetPassword,
        component:ResetPassword,
        options:{
            title:''
        }
    },
]