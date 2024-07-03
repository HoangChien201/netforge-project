import HomeScreen from "../../screens/HomeScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"

import UserStack from "./UserStack";
import CommentsScreen from "../../screens/CommentsScreen";
import Scanner from "../../screens/Scanner";

import ProfileScreen from "../../screens/ProfileScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import ProfileStack from "./ProfileStack";
import FriendProfile from "../profile/FriendProfile";


export enum HomeRootStackEnum {
    StoryScreen = 'StoryScreen',
    HomeScreen = 'HomeScreen',
    CommentsScreen = 'CommentsScreen',
    Scanner = 'Scanner',
    ProfileScreen = 'ProfileScreen',
    ProfileStack = 'ProfileStack',
    EditProfileScreen = 'EditProfileScreen',
    FriendProfile = 'FriendProfile',

}

export type HomeRootStackParams = {
    StoryScreen: undefined,
    HomeScreen: undefined,
    Scanner:undefined
    ProfileScreen: undefined,
    ProfileStack: undefined,
    EditProfileScreen: undefined,
    FriendProfile: undefined,

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
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.ProfileScreen,
        component: ProfileScreen,
        options: {
            headerShown: true,
            // headerLeft: () => null,
            title:"Trang cá nhân",
            headerTitleAlign:'center'
            
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.FriendProfile,
        component: FriendProfile,
        options: {
            headerShown: true,
            // headerLeft: () => null,
            title:"",
            headerTitleAlign:'center'
            
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.ProfileStack,
        component: ProfileStack,
        options: {
            headerShown: false,
            // headerLeft: () => (
            //     // <CustomBackButton onPress={handleBackPress} />
            // ),
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.EditProfileScreen,
        component: EditProfileScreen,
        options: {
            headerShown: false,
            // headerLeft: () => (
            //     // <CustomBackButton onPress={handleBackPress} />
            // ),
        }
    },

]