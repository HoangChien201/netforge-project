import LoginScreen from "../../screens/LoginScreen"
import SignupScreen from "../../screens/SignInScreen"
import ForgotPassword from "../../screens/ForgotPassword";
import { ResetPassword } from "../../screens/ResetPassword";
import OtpScreen from "../../screens/OtpScreen";

export enum UserRootStackEnum {
    LoginScreen = 'Login',
    SignUp = 'SignUp',
    ForgotPassword ='ForgotPassword',
    OtpScreen = 'otp',
    ResetPassword = 'ResetPassword',
}

export type UserRootStackParams={
    LoginScreen : undefined;
    SignUp : undefined;
    ForgotPassword :undefined;
    OtpScreen : undefined;
    ResetPassword: undefined;
}

export const UserRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: UserRootStackEnum.LoginScreen,
        component: LoginScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: UserRootStackEnum.SignUp,
        component: SignupScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: UserRootStackEnum.ForgotPassword,
        component: ForgotPassword,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: UserRootStackEnum.ResetPassword,
        component: ResetPassword,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: UserRootStackEnum.OtpScreen,
        component: OtpScreen,
        options: {
            headerShown: false
        }
    },
    
]