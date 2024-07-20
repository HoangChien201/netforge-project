import { StackNavigationProp } from "@react-navigation/stack";
import CameraStory from "../../screens/CameraStory";
import CreateStoris from "../../screens/CreateStoris";
import MessageScreen from "../../screens/message/MessageScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"
import ListImageDetail from "../listpost/ListImageDetail";
import StoryDetail from "../storys/StoryDetail";
import StoryText from "../storys/StoryText";
import MessageStack from "./MessageStack";
export type NetworkStackNavigationProp = StackNavigationProp<
  NetworkRootStackParams,
  'MessageStack'
>;
export enum NetworkRootStackEnum {
    NetworkBottomTab = 'NetworkBottomTab',
    MessageStack = 'MessageStack',
    StoryScreen = "StoryScreen",
    CreateStoris = "Tạo Tin",
    StoryDetail = "StoryDetail",
    StoryText = "StoryText",
    CameraStory = "CameraStory",
    ListImageDetail = "ListImageDetail",
}

export type NetworkRootStackParams = {
    NetworkBottomTab: undefined;
    MessageStack: {
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
    };
    StoryScreen: undefined;
    CreateStoris: undefined;
    StoryDetail: undefined;
    CameraStory: undefined;
    ListImageDetail: undefined;
    StoryText: undefined;
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
        name: NetworkRootStackEnum.MessageStack,
        component: MessageStack,
        options: {
            headerShown: false
        }
    },


]