import HomeScreen from "../../screens/HomeScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"
import ExploreScreen from "../../screens/ExploreScreen";
import UserStack from "./UserStack";
import CommentsScreen from "../../screens/CommentsScreen";
import Scanner from "../../screens/Scanner";

import ProfileScreen from "../../screens/ProfileScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import ProfileStack from "./ProfileStack";
import FriendProfile from "../profile/FriendProfile";

import Birtday from "../../birtday/Birtday";
import QRcodeScreen from "../../screens/QRcodeScreen";
import LiveStack from "./LiveStack";
import AudienceScreen from "../../screens/live/AudienceScreen";
import HostScreen from "../../screens/live/HostScreen";
import Friends from "../../screens/profile/friendScreen/Friends";

export enum HomeRootStackEnum {
    StoryScreen = 'StoryScreen',
    HomeScreen = 'HomeScreen',
    CommentsScreen = 'CommentsScreen',
    ExploreScreen = 'ExploreScreen',
    Scanner = 'Scanner',
    ProfileScreen = 'ProfileScreen',
    ProfileStack = 'ProfileStack',
    EditProfileScreen = 'EditProfileScreen',
    FriendProfile = 'FriendProfile',
    Birtday = 'Birtday',
    QRcodeScreen = 'QRcodeScreen',
    LiveStack = 'LiveStack',
    HostScreen = 'HostScreen',
    Friends = 'Friends',

}

export type HomeRootStackParams = {
    StoryScreen: undefined,
    HomeScreen: undefined,
    Scanner:undefined
    ProfileScreen: undefined,
    ProfileStack: undefined,
    EditProfileScreen: undefined,
    FriendProfile: undefined,
    Birtday: undefined
    QRcodeScreen:undefined
    LiveStack:undefined
    HostScreen:undefined,
    Friends: undefined

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
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.Scanner,
        component: Scanner,
        options: {
            headerShown: true,
            title:"Quét mã QR",
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.QRcodeScreen,
        component: QRcodeScreen,
        options: {
            headerShown: true,
            title:''
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
        name: HomeRootStackEnum.LiveStack,
        component: AudienceScreen,
        options: {
            headerShown: true,
            // headerLeft: () => null,
            title:"Phát trực tiếp",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: "HostScreen",
        component: HostScreen,
        options: {
            headerShown: true,
            // headerLeft: () => null,
            title:"Phát trực tiếp",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HomeRootStackEnum.Friends,
        component: Friends,
        options: {
            headerShown: true,
            tabBarShowLabel: false,
            title:"Bạn bè",
            headerTitleAlign:'center'
        }
    },

]