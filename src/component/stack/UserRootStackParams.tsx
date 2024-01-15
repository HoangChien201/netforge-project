import ChangePasswordSceen from "../../screen/user/ChangePasswordScreen"
import LoginScreen from "../../screen/user/LoginScreen"
import SendMailScreen from "../../screen/user/SendMailScreen"
import SendOTPScreen from "../../screen/user/SendOTPScreen"
import SignUpScreen from "../../screen/user/SignUpScreen"

enum UserRootStackEnum{
    LoginScreen='LoginScreen',
    SignUpScreen='SignUpScreen',
    SendMailScreen='SendMailScreen',
    SendOTPScreen='SendOTPScreen',
    ChangePasswordScreen='ChangePasswordScreen',
}

export type UserRootStackParams={
    LoginScreen:undefined,
    SendMailScreen:undefined,
    SendOTPScreen:undefined,
    ChangePasswordScreen:undefined,

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
        name:UserRootStackEnum.SendMailScreen,
        component:SendMailScreen,
        options:{
            title:''
        }
    },
    {
        id:Math.random()+""+Date,
        name:UserRootStackEnum.SendOTPScreen,
        component:SendOTPScreen,
        options:{
            title:''
        }
    },
    {
        id:Math.random()+""+Date,
        name:UserRootStackEnum.ChangePasswordScreen,
        component:ChangePasswordSceen,
        options:{
            title:''
        }
    },
]