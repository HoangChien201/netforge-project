import EventBottomTab from "../bottom-stack/EventBottomTab"
import BookmarkScreen from "../events/screens/BookmarkScreen"
import CalenderScreen from "../events/screens/CalenderScreen"
import ContactScreen from "../events/screens/ContactScreen"
import HelpScreen from "../events/screens/HelpScreen"
import HomeScreen from "../events/screens/HomeScreen"
import MessageScreen from "../events/screens/MessageScreen"
import SettingsScreen from "../events/screens/SettingsScreen"
import HomeStack from "./HomeStack"



enum EventRootStackEnum{
    HomeStack="Home",
    MessageScreen="MessageScreen",
    CalendarScreen="CalendarScreen",
    BookmarkScreen="BookmarkScreen",
    ContactScreen="ContactScreen",
    SettingScreen="SettingScreen",
    HelpScreen="HelpScreen",

}

export type EventRootStackParams={
    HomeStack:undefined,
    HomeScreen:undefined,
    MessageScreen:undefined,
    CalendarScreen:undefined,
    BookmarkScreen:undefined,
    ContactScreen:undefined,
    SettingScreen:undefined,
    HelpScreen:undefined,

}

export const EventRootStackScreens=[
    {
        id:Math.random()+""+Date,
        name:EventRootStackEnum.HomeStack,
        component:HomeStack,
        options:{
            headerShown:false
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootStackEnum.MessageScreen,
        component:MessageScreen,
        options:{
            title:'Message'
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootStackEnum.CalendarScreen,
        component:CalenderScreen,
        options:{
            title:'Calender'
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootStackEnum.BookmarkScreen,
        component:BookmarkScreen,
        options:{
            title:'Bookmark',
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootStackEnum.ContactScreen,
        component:ContactScreen,
        options:{
            title:'Contact',
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootStackEnum.SettingScreen,
        component:SettingsScreen,
        options:{
            title:'Setting',
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootStackEnum.HelpScreen,
        component:HelpScreen,
        options:{
            title:'Help',
        }
    },
]