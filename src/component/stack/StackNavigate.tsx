import HomeScreen from "../../screens/HomeScreen"
import CommentsScreen from "../../screens/CommentsScreen";
import ActionBar from "../listpost/ActionBar";


export enum NavigateRootStackEnum{
    ActionBar='ActionBar',
    CommentsScreen ='CommentsScreen'
}

export type NavigateRootStackParams={
    ActionBar : undefined;
    CommentsScreen : undefined;
}

export const NavigateRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: NavigateRootStackEnum.ActionBar,
        component: ActionBar,
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