import EventBottomTab from "../bottom-stack/EventBottomTab"
import NotificationScreen from "../events/screens/NotificationScreen"



enum HomeRootStackEnum{
    EventBottomTab='EventBottomTab',
    NotificationScreen='NotificationScreen',


}

export type HomeRootStackParams={
    EventBottomTab:undefined;
    NotificationScreen:undefined;
}

export const HomeRootStackScreens=[
    {
        id:Math.random()+""+Date,
        name:HomeRootStackEnum.EventBottomTab,
        component:EventBottomTab,
        options:{
            headerShown:false
        }
    },
    {
        id:Math.random()+""+Date,
        name:HomeRootStackEnum.NotificationScreen,
        component:NotificationScreen,
        options:{
            title:'Notification'
        }
    },
]