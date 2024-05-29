import LoginScreen from "../../screens/LoginScreen"
import SignupScreen from "../../screens/SignInScreen"


export enum UserRootStackEnum{
    LoginScreen='Login',
    SignUp ='SignUp'
}

export type UserRootStackParams={
    LoginScreen : undefined;
    SignUp : undefined;
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
]