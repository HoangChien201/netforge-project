

import Icon from 'react-native-vector-icons/MaterialIcons'

enum AdminRootBottomTabEnum{
    ExploreScreen="ExploreScreen",
    EventsScreen="EventsScreen",
    MapScreen="MapScreen",
    ProfileScreen="ProfileScreen"
}

export type AdminRootBottomTabParams={
    ExploreScreen:undefined,
    EventsScreen:undefined,
    MapScreen:undefined,
    ProfileScreen:undefined

}

export const AdminRootBottomTabScreens=[
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
    
]