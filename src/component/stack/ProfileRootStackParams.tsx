import React from "react";

import ProfileScreen from "../../screens/ProfileScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import CustomBackButton from "../profile/CustomHeaderBar";
import Live from "../../screens/Live";
import SettingScreen from "../../screens/profile/SettingScreen";
import HistoryActivityScreen from "../../screens/profile/HistoryActivityScreen";
import HelpScreen from "../../screens/profile/HelpScreen";
import FriendScreen from "../../screens/profile/FriendScreen";
import MenuScreen from "../../screens/MenuScreen";
import NaviStack from "../../component/stack/NaviStack"
import ChangePassword from "../../screens/ChangePassword";
import QRcodeScreen from "../../screens/QRcodeScreen";
import Scanner from "../../screens/Scanner";
import HistoryStack from "./HistoryStack";
export enum ProfileRootStackEnum {
    ProfileScreen = 'ProfileScreen',
    EditProfileScreen = 'EditProfileScreen',
    FollowingScreen = 'FollowingScreen',
    Live = 'Live',
    SettingScreen = 'SettingScreen',
    HistoryActivityScreen = 'HistoryActivityScreen',
    HelpScreen = 'HelpScreen',
    NaviStack = 'NaviStack',
    MenuScreen = 'MenuScreen',
    ChangePassword = 'ChangePassword',
    QRcodeScreen = 'QRcodeScreen',
    Scanner = 'Scanner',
    FriendScreen = 'FriendScreen',
    HistoryStack = 'HistoryStack'
}

export type ProfileRootStackParams={
    ProfileScreen : undefined;
    EditProfileScreen: undefined;
    Live : undefined;
    SettingScreen : undefined;
    HistoryActivityScreen : undefined;
    HelpScreen : undefined;
    NaviStack :undefined,
    MenuScreen:undefined;
    ChangePassword: undefined;
    QRcodeScreen: undefined;
    Scanner: undefined;
    FriendScreen: undefined;
    HistoryStack:undefined;
}

export const ProfileRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.MenuScreen,
        component: MenuScreen,
        options: {
            headerShown: false,
            // headerLeft: () => null,
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.ProfileScreen,
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
        name: ProfileRootStackEnum.EditProfileScreen,
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
        name: ProfileRootStackEnum.SettingScreen,
        component: SettingScreen,
        options: {
            title:"Cài đặt",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.HistoryStack,
        component: HistoryStack,
        options: {
            title:"Lịch sử hoạt động",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.HelpScreen,
        component: HelpScreen,
        options: {
            title:"Giúp đỡ",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.FriendScreen,
        component: FriendScreen,
        options: {
            title:"Bạn bè",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.ChangePassword,
        component: ChangePassword,
        options: {
            title:"Đổi mật khẩu",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.QRcodeScreen,
        component: QRcodeScreen,
        options: {
            title:"Mã QR của tôi",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.Scanner,
        component: Scanner,
        options: {
            title:"Scanner",
            headerTitleAlign:'center'
        }
    }
    // {
    //     id: Math.random() + "" + Date,
    //     name: ProfileRootStackEnum.Live,
    //     component: Live,
    //     options: {
    //         headerShown: true,
    //         tabBarShowLabel: false,
    //     }
    // }
    
]
