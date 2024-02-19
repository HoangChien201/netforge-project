import EventsScreen from "../events/screens/EventsScreen"
import ExploreScreen from "../events/screens/ExploreScreen"
import MapScreen from "../events/screens/MapScreen"
import ProfileScreen from "../events/screens/ProfileScreen"

import Icon from 'react-native-vector-icons/MaterialIcons'

enum EventRootBottomTabEnum{
    ExploreScreen="ExploreScreen",
    EventsScreen="EventsScreen",
    MapScreen="MapScreen",
    ProfileScreen="ProfileScreen"
}

export type EventRootBottomTabParams={
    ExploreScreen:undefined,
    EventsScreen:undefined,
    MapScreen:undefined,
    ProfileScreen:undefined

}

export const EventRootBottomTabScreens=[
    {
        id:Math.random()+""+Date,
        name:EventRootBottomTabEnum.ExploreScreen,
        component:ExploreScreen,
        options:{
            headerShown:false,
            tabBarIcon:({color})=>{
                return <Icon name='explore' size={24} color={color}/>
            },
            tabBarLabel:'Explore'
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootBottomTabEnum.EventsScreen,
        component:EventsScreen,
        options:{
            tabBarIcon:({color})=>{
                return <Icon name='calendar-month' size={24} color={color}/>
            },
            tabBarLabel:'Events',
            title:'Events'

        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootBottomTabEnum.MapScreen,
        component:MapScreen,
        options:{
            tabBarIcon:({color})=>{
                return <Icon name='map' size={24} color={color}/>
            },
            tabBarLabel:'Map'
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootBottomTabEnum.ProfileScreen,
        component:ProfileScreen,
        options:{
            tabBarIcon:({color})=>{
                return <Icon name='person' size={24} color={color}/>
            },
            tabBarLabel:'Profile',
            headerShown:false
        }
    },
]