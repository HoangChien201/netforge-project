import HomeScreen from "../../screens/HomeScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"
import ExploreScreen from "../../screens/ExploreScreen";
import UserStack from "./UserStack";
import CommentsScreen from "../../screens/CommentsScreen";



enum HomeRootStackEnum {
    StoryScreen = 'StoryScreen',
    HomeScreen = 'HomeScreen',
    CommentsScreen = 'CommentsScreen',
    ExploreScreen = 'ExploreScreen',

}

export type HomeRootStackParams = {
    StoryScreen: undefined,
    HomeScreen: undefined
}

export const HomeRootStackScreens = [
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.HomeScreen,
        component: HomeScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.CommentsScreen,
        component: CommentsScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.ExploreScreen,
        component: ExploreScreen,
        options: {
            headerShown: false
        }
    },



]