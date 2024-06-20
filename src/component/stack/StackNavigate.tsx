import FriendScreen from "../../screens/profile/FriendScreen"
import CommentsScreen from "../../screens/CommentsScreen";


export enum NavigateRootStackEnum{
    FriendScreen='FriendScreen',
    CommentsScreen ='CommentsScreen'
}

export type NavigateRootStackParams={
    FriendScreen : undefined;
    CommentsScreen : undefined;
}

export const NavigateRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: NavigateRootStackEnum.FriendScreen,
        component: FriendScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: NavigateRootStackEnum.CommentsScreen,
        component: CommentsScreen,
        options: {
            headerShown: false,
        }
    },
]