import { COLOR } from "../../constant/color";
import ListMessageScreen from "../../screens/message/ListMessageScreen";
import MessageScreen from "../../screens/message/MessageScreen";
import { messageType } from "../message/MessageItem";
// @ts-ignore
import { ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, } from '@zegocloud/zego-uikit-prebuilt-call-rn';

enum MessageRootStackEnum {
    MessageScreen = 'MessageScreen',
    ListMessageScreen = 'ListMessageScreen',
    CallManagement = 'CallManagement',
    ZegoUIKitPrebuiltCallWaitingScreen = 'ZegoUIKitPrebuiltCallWaitingScreen',
    ZegoUIKitPrebuiltCallInCallScreen = 'ZegoUIKitPrebuiltCallInCallScreen'
}

export type MessageRootStackParams = {
    ZegoUIKitPrebuiltCallWaitingScreen: undefined;
    ZegoUIKitPrebuiltCallInCallScreen: undefined;
    MessageScreen: {
        group_id?: number,
        fullname: string,
        avatar: string,
        messages?: Array<messageType>,
        members: Array<{
            user: {
                fullname: string,
                avatar: string,
                id: number
            }
        }>,
    };
    ListMessageScreen: undefined;
    CallManagement: undefined;

}

export const MessageRootStackScreens = [
    {
        id: Math.random() + "" + Date,
        name: MessageRootStackEnum.ListMessageScreen,
        component: ListMessageScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: MessageRootStackEnum.MessageScreen,
        component: MessageScreen,
        options: {
            // title: 'Tin nhắn',
            // headerTitleAlign: 'center',
            // headerTransparent: true,
            // headerTintColor: '#fff'
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: MessageRootStackEnum.ZegoUIKitPrebuiltCallWaitingScreen,
        component: ZegoUIKitPrebuiltCallWaitingScreen,
        options: {
            headerShown: false
        },
    },
    {
        id: Math.random() + "" + Date,
        name: MessageRootStackEnum.ZegoUIKitPrebuiltCallInCallScreen,
        component: ZegoUIKitPrebuiltCallInCallScreen,
        options: {
            headerShown: false
        }
    },


]