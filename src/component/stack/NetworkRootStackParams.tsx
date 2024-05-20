import NetworkBottomTab from "../bottom-stack/NetworkBottomTab"

import UserStack from "./UserStack";



enum NetworkRootStackEnum {
    NetworkBottomTab='NetworkBottomTab'
}

export type NetworkRootStackParams = {
    NetworkBottomTab: undefined;
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
    


]