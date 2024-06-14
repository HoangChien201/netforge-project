import StoryScreen from "../../screens/StoryScreen";
import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"

import UserStack from "./UserStack";



enum NetworkRootStackEnum {
    NetworkBottomTab='NetworkBottomTab',
    StoryScreen = "StoryScreen"
}

export type NetworkRootStackParams = {
    NetworkBottomTab: undefined;
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
    


]