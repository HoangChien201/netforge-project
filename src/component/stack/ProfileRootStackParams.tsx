import ProfileScreen from "../../screens/ProfileScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import React from "react";
import CustomBackButton from "../profile/CustomHeaderBar";
import Live from "../../screens/Live";

export enum ProfileRootStackEnum {
    ProfileScreen = 'ProfileScreen',
    EditProfileScreen = 'Chỉnh sửa hồ sơ',
    FollowingScreen = 'FollowingScreen',
    Live = 'Live'
}

export type ProfileRootStackParams={
    ProfileScreen : undefined;
    EditProfileScreen: undefined;
    Live : undefined;
}

export const ProfileRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.ProfileScreen,
        component: ProfileScreen,
        options: {
            headerShown: true,
            headerLeft: () => null,
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
        name: ProfileRootStackEnum.Live,
        component: Live,
        options: {
            headerShown: true,
            tabBarShowLabel: false,
        }
    }
    
]
