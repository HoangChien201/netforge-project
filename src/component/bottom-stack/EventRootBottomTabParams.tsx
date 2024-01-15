import EventsScreen from "../events/screens/EventsScreen"
import ExploreScreen from "../events/screens/ExploreScreen"
import MapScreen from "../events/screens/MapScreen"
import ProfileScreen from "../events/screens/ProfileScreen"

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
            headerShown:false
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootBottomTabEnum.EventsScreen,
        component:EventsScreen,
        options:{
            
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootBottomTabEnum.MapScreen,
        component:MapScreen,
        options:{
            
        }
    },
    {
        id:Math.random()+""+Date,
        name:EventRootBottomTabEnum.ProfileScreen,
        component:ProfileScreen,
        options:{

            
        }
    },
]