import { COLOR } from "../../constant/color";
import CallManagement from "../../screens/message/CallManagement";
import ListMessageScreen from "../../screens/message/ListMessageScreen";
import MessageScreen from "../../screens/message/MessageScreen";
// @ts-ignore
import {ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen,} from '@zegocloud/zego-uikit-prebuilt-call-rn';

enum MessageRootStackEnum {
    MessageScreen='MessageScreen',
    ListMessageScreen='ListMessageScreen',
    CallManagement='CallManagement',
    ZegoUIKitPrebuiltCallWaitingScreen = 'ZegoUIKitPrebuiltCallWaitingScreen',
    ZegoUIKitPrebuiltCallInCallScreen = 'ZegoUIKitPrebuiltCallInCallScreen'

}

export type MessageRootStackParams = {
    MessageScreen:undefined;
    ListMessageScreen:undefined;
    CallManagement:undefined;
    ZegoUIKitPrebuiltCallWaitingScreen: undefined;
    ZegoUIKitPrebuiltCallInCallScreen: undefined;
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
            title:'Tin nhắn',
            headerTitleAlign:'center',
            headerTransparent:true,
            headerTintColor:'#fff'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: MessageRootStackEnum.CallManagement,
        component: CallManagement,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: MessageRootStackEnum.ZegoUIKitPrebuiltCallWaitingScreen,
        component: ZegoUIKitPrebuiltCallWaitingScreen,
        options: {
            headerShown: false
        }
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