import EventBottomTab from "../bottom-stack/EventBottomTab"
import EventDetail from "../events/Quyetcomponent/EventDetail";
import NotificationScreen from "../events/screens/NotificationScreen"



enum HomeRootStackEnum{
    EventBottomTab='EventBottomTab',
    NotificationScreen='NotificationScreen',
    EventDetailScreen='EventDetailScreen'


}

export type HomeRootStackParams={
    EventBottomTab:undefined;
    NotificationScreen:undefined;
    EventDetailScreen:undefined

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
    {
        id:Math.random()+""+Date,
        name:HomeRootStackEnum.EventDetailScreen,
        component:EventDetail,
        options:{
            headerShown:false
        }
    },

]