import ExploreScreen from "../../screens/ExploreScreen";
import CommentsScreen from "../../screens/CommentsScreen";


export enum NavigateRootStackEnum{
    ExploreScreen='ExploreScreen',
    CommentsScreen ='CommentsScreen'
}

export type NavigateRootStackParams={
    ExploreScreen : undefined;
    CommentsScreen : undefined;
}

export const NavigateRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: NavigateRootStackEnum.ExploreScreen,
        component: ExploreScreen,
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