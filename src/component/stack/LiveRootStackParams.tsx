import UserStack from "./UserStack";
import AudienceScreen from "../../screens/live/AudienceScreen";
import HostScreen from "../../screens/live/HostScreen";
import LiveWithZego from "../../screens/live/LiveWithZego";


enum LiveRootStackEnum {
    LiveWithZego = 'LiveWithZego',
    HostScreen = 'HostScreen',
    AudienceScreen = 'AudienceScreen',
    
}

export type LiveRootStackParams = {
    LiveWithZego: undefined,
    HostScreen: undefined,
    AudienceScreen: undefined
}

export const LiveRootStackScreens = [
    {
        id: Math.random() + "" + Date,
        name: LiveRootStackEnum.LiveWithZego,
        component: LiveWithZego,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: LiveRootStackEnum.HostScreen,
        component: HostScreen,
        options: {
            headerShown: false,
            // headerLeft: () => (
            //     // <CustomBackButton onPress={handleBackPress} />
            // ),
        }
    },
    {
        id: Math.random() + "" + Date,
        name: LiveRootStackEnum.AudienceScreen,
        component: AudienceScreen,
        options: {
            headerShown: false,
            // headerLeft: () => (
            //     // <CustomBackButton onPress={handleBackPress} />
            // ),
        }
    },

]