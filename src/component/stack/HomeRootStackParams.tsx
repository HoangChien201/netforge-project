import HomeScreen from "../../screens/HomeScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"

import UserStack from "./UserStack";
import CommentsScreen from "../../screens/CommentsScreen";
import Scanner from "../../screens/Scanner";


export enum HomeRootStackEnum {
    StoryScreen = 'StoryScreen',
    HomeScreen = 'HomeScreen',
    CommentsScreen = 'CommentsScreen',
    Scanner = 'Scanner',
}

export type HomeRootStackParams = {
    StoryScreen: undefined,
    HomeScreen: undefined,
    Scanner:undefined
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
        name: HomeRootStackEnum.Scanner,
        component: Scanner,
        options: {
            headerShown: true
        }
    },



]