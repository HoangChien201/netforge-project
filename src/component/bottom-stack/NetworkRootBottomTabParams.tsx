import React from "react"

import Icon from 'react-native-vector-icons/AntDesign'
import ExploreScreen from "../../screens/ExploreScreen"
import HomeScreen from "../../screens/HomeScreen"
import CreatePostScreen from "../../screens/CreatePostScreen"
import NotificationScreen from "../../screens/NotificationScreen"
import ProfileScreen from "../../screens/ProfileScreen"

enum NetworkRootBottomTabEnum{
    HomeScreen='HomeScreen',
    ExploreScreen='ExploreScreen',
    CreatePostScreen='CreatePostScreen',
    NotificationScreen='NotificationScreen',
    ProfileScreen='ProfileScreen'
}

export type NetworkRootBottomTabParams={
    HomeScreen:undefined,
    ExploreScreen:undefined,
    CreatePostScreen:undefined,
    NotificationScreen:undefined,
    ProfileScreen:undefined
}

export const NetworkRootBottomTabScreens=[
    {
        id:Math.random()+""+Date,
        name:NetworkRootBottomTabEnum.HomeScreen,
        component:HomeScreen,
        options:{
            tabBarShowLabel:false,
            tabBarIcon:({color}:{color:string})=>{
                return <Icon name="home" size={24} color={color}/>
            }
        }
    },{
        id:Math.random()+""+Date,
        name:NetworkRootBottomTabEnum.ExploreScreen,
        component:ExploreScreen,
        options:{
            tabBarShowLabel:false,
            tabBarIcon:({color}:{color:string})=>{
                return <Icon name="search1" size={24} color={color}/>
            }
        }
    },{
        id:Math.random()+""+Date,
        name:NetworkRootBottomTabEnum.CreatePostScreen,
        component:CreatePostScreen,
        options:{
            tabBarShowLabel:false,
            tabBarIcon:({color}:{color:string})=>{
                return <Icon name="plus" size={24} color={color}/>
            }
            

        }
    },{
        id:Math.random()+""+Date,
        name:NetworkRootBottomTabEnum.NotificationScreen,
        component:NotificationScreen,
        options:{
            tabBarShowLabel:false,
            tabBarIcon:({color}:{color:string})=>{
                return <Icon name="bells" size={24} color={color}/>
            }
            

        }
    },
    {
        id:Math.random()+""+Date,
        name:NetworkRootBottomTabEnum.ProfileScreen,
        component:ProfileScreen,
        options:{
            tabBarShowLabel:false,
            tabBarIcon:({color}:{color:string})=>{
                return <Icon name="user" size={24} color={color}/>
            }
            

        }
    },
    
]