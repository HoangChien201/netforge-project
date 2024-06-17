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

export enum ProfileRootStackEnum {
    ProfileScreen = 'ProfileScreen',
    EditProfileScreen = 'Chỉnh sửa hồ sơ',
    FollowingScreen = 'FollowingScreen',
    Live = 'Live',
    SettingScreen = 'SettingScreen',
    HistoryActivityScreen = 'HistoryActivityScreen',
    HelpScreen = 'HelpScreen',
    FriendScreen = 'FriendScreen',
    MenuScreen = 'MenuScreen',


}

export type ProfileRootStackParams={
    ProfileScreen : undefined;
    EditProfileScreen: undefined;
    Live : undefined;
    SettingScreen : undefined;
    HistoryActivityScreen : undefined;
    HelpScreen : undefined;
    FriendScreen :undefined,
    MenuScreen:undefined;
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
        name: ProfileRootStackEnum.HistoryActivityScreen,
        component: HistoryActivityScreen,
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
