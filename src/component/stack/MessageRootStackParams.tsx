import { COLOR } from "../../constant/color";
import CallManagement from "../../screens/message/CallManagement";
import ListMessageScreen from "../../screens/message/ListMessageScreen";
import MessageScreen from "../../screens/message/MessageScreen";

enum MessageRootStackEnum {
    MessageScreen='MessageScreen',
    ListMessageScreen='ListMessageScreen',
    CallManament='CallManament',


}

export type MessageRootStackParams = {
    MessageScreen:undefined;
    ListMessageScreen:undefined;
    CallManament:undefined;
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
        name: MessageRootStackEnum.CallManament,
        component: CallManagement,
        options: {
            headerShown: false
        }
    },


]