import { COLOR } from "../../constant/color";
import CallManagement from "../../screens/message/CallManagement";
import ListMessageScreen from "../../screens/message/ListMessageScreen";
import MessageScreen from "../../screens/message/MessageScreen";
import { messageType } from "../message/MessageItem";

enum MessageRootStackEnum {
    MessageScreen = 'MessageScreen',
    ListMessageScreen = 'ListMessageScreen',
    CallManagement = 'CallManagement',


}

export type MessageRootStackParams = {
    MessageScreen: {
        group_id: number,
        fullname: string,
        avatar: string,
        messages: Array<messageType>
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
            title: 'Tin nhắn',
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerTintColor: '#fff'
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


]