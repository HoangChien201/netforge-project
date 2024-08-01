import AudienceScreen from "../../screens/live/AudienceScreen";
import HostScreen from "../../screens/live/HostScreen";

enum LiveRootStackEnum {
    HostScreen = 'HostScreen',
    AudienceScreen = 'AudienceScreen',
}

export type LiveRootStackParams = {
    HostScreen: undefined,
    AudienceScreen: undefined
}

export const LiveRootStackScreens = [
    {
        id: Math.random() + "" + Date,
        name: LiveRootStackEnum.HostScreen,
        component: HostScreen,
        options: {
            headerShown: false,
        }
    },
    {
        id: Math.random() + "" + Date,
        name: LiveRootStackEnum.AudienceScreen,
        component: AudienceScreen,
        options: {
            headerShown: false,
        }
    },

]