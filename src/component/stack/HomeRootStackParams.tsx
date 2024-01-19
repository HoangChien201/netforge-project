import EventBottomTab from "../bottom-stack/EventBottomTab"
import NotificationScreen from "../events/screens/NotificationScreen"
import modalshare from "../events/component/modal/modalshare";



enum HomeRootStackEnum{
    EventBottomTab='EventBottomTab',
    NotificationScreen='NotificationScreen',
    modalshare = 'modalshare',


}

export type HomeRootStackParams={
    EventBottomTab:undefined;
    NotificationScreen:undefined;
    modalshare:undefined;


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
        name:HomeRootStackEnum.modalshare,
        component:modalshare,
        options:{
            title:'modalshare'
        }
    },
]