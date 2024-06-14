import HomeScreen from "../../screens/HomeScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"

import UserStack from "./UserStack";



enum HomeRootStackEnum {
    StoryScreen = 'StoryScreen',
    HomeScreen = 'HomeScreen'
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
    // {
    //     id: Math.random() + "" + Date,
    //     name: HomeRootStackEnum.StoryScreen,
    //     component: StoryScreen,
    //     options: {
    //         headerShown: false
    //     }
    // },



]