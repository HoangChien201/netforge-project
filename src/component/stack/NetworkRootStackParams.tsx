import { StackNavigationProp } from "@react-navigation/stack";
import CameraStory from "../../screens/CameraStory";
import CreateStoris from "../../screens/CreateStoris";
import MessageScreen from "../../screens/message/MessageScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"
import ListImageDetail from "../listpost/ListImageDetail";
import StoryDetail from "../storys/StoryDetail";
import StoryText from "../storys/StoryText";
import MessageManagementScreen from "../../screens/message/MessageManagementScreen";
import FriendScreen from "../../screens/profile/FriendScreen";
import FriendProfile from "../profile/FriendProfile";
import CommentsScreen from "../../screens/CommentsScreen";


// @ts-ignore
import {ZegoUIKitPrebuiltCallWaitingScreen,ZegoUIKitPrebuiltCallInCallScreen,} from '@zegocloud/zego-uikit-prebuilt-call-rn';

export type NetworkStackNavigationProp = StackNavigationProp<
    NetworkRootStackParams,
    'MessageManagementScreen'
>;
export type FriendScreenNavigationProp = StackNavigationProp<NetworkRootStackParams,'FriendScreen'>;
export type FriendProfileNavigationProp = StackNavigationProp<NetworkRootStackParams,'FriendProfile'>;
export type CommentsScreenNavigationProp = StackNavigationProp<NetworkRootStackParams,'CommentsScreen'>;
export enum NetworkRootStackEnum {
    NetworkBottomTab = 'NetworkBottomTab',
    MessageManagementScreen = 'MessageManagementScreen',
    StoryScreen = "StoryScreen",
    CreateStoris = "Tạo Tin",
    StoryDetail = "StoryDetail",
    StoryText = "StoryText",
    CameraStory = "CameraStory",
    ListImageDetail = "ListImageDetail",
    FriendScreen ='FriendScreen',
    FriendProfile = 'FriendProfile',
    CommentsScreen='CommentsScreen'

}

export type NetworkRootStackParams = {
    NetworkBottomTab: undefined;
    MessageManagementScreen: {
        screen?: string,
        params: {

            screen?: string,
            params?: {
                fullname: string,
                avatar: string,
                members: Array<{
                    user: {
                        fullname: string,
                        avatar: string,
                        id: number
                    }
                }>,
            }


        }
    };
    StoryScreen: undefined;
    CreateStoris: undefined;
    StoryDetail: undefined;
    CameraStory: undefined;
    ListImageDetail: undefined;
    StoryText: undefined;
    FriendScreen:undefined;
    FriendProfile:undefined;
    CommentsScreen:undefined;

}

export const NetworkRootStackScreens = [
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.NetworkBottomTab,
        component: NetworkBottomTab,
        options: {
            headerShown: false
        },

    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.StoryScreen,
        component: StoryScreen,
        options: {
            headerShown: false
        },

    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.CameraStory,
        component: CameraStory,
        options: {
            headerShown: false
        },

    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.ListImageDetail,
        component: ListImageDetail,
        options: {
            headerShown: false
        },

    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.CreateStoris,
        component: CreateStoris,
        options: {
            headerShown: true
        },

    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.StoryDetail,
        component: StoryDetail,
        options: {
            headerShown: false
        },

    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.StoryText,
        component: StoryText,
        options: {
            headerShown: false
        },

    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.MessageManagementScreen,
        component: MessageManagementScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.FriendScreen,
        component: FriendScreen,
        options: {
            headerShown: true,
            title: 'Bạn bè'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.FriendProfile,
        component: FriendProfile,
        options: {
            headerShown: false,
        }
    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.CommentsScreen,
        component: CommentsScreen,
        options: {
            headerShown: false,
        }
    },


]