import MessageScreen from "../../screens/message/MessageScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"
import MessageStack from "./MessageStack";

enum NetworkRootStackEnum {
    NetworkBottomTab='NetworkBottomTab',
    MessageStack='MessageStack'

}

export type NetworkRootStackParams = {
    NetworkBottomTab: undefined;
    MessageStack:undefined;
}

export const NetworkRootStackScreens = [
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.NetworkBottomTab,
        component: NetworkBottomTab,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootStackEnum.MessageScreen,
        component: MessageStack,
        options: {
            headerShown: false
        }
    },


]