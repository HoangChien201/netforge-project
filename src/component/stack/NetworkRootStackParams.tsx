import MessageScreen from "../../screens/message/MessageScreen";
import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"
import MessageStack from "./MessageStack";

enum NetworkRootStackEnum {
    NetworkBottomTab='NetworkBottomTab',
    MessageStack='MessageStack',
    StoryScreen = "StoryScreen"
}

export type NetworkRootStackParams = {
    NetworkBottomTab: undefined;
    MessageStack:undefined;
    StoryScreen:undefined;
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
        name: NetworkRootStackEnum.MessageStack,
        component: MessageStack,
        options: {
            headerShown: false
        }
    },


]