import React from "react"

import Icon from 'react-native-vector-icons/AntDesign'
import ExploreScreen from "../../screens/ExploreScreen"
import HomeScreen from "../../screens/HomeScreen"
import CreatePostScreen from "../../screens/CreatePostScreen"
import NotificationScreen from "../../screens/NotificationScreen"
import ProfileScreen from "../../screens/ProfileScreen"
import { View } from "react-native"
import { COLOR } from "../../constant/color"
import CommentsScreen from "../../screens/CommentsScreen"

enum NetworkRootBottomTabEnum {
    HomeScreen = 'HomeScreen',
    ExploreScreen = 'ExploreScreen',
    CreatePostScreen = 'CreatePostScreen',
    NotificationScreen = 'NotificationScreen',
    ProfileScreen = 'ProfileScreen',
    CommentsScreen = 'CommentsScreen'
}

export type NetworkRootBottomTabParams = {
    HomeScreen: undefined,
    ExploreScreen: undefined,
    CreatePostScreen: undefined,
    NotificationScreen: undefined,
    ProfileScreen: undefined,
    CommentsScreen: undefined
}

export const NetworkRootBottomTabScreens = [
    {
        id: Math.random() + "" + Date,
        name: NetworkRootBottomTabEnum.HomeScreen,
        component: HomeScreen,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return <Icon name="home" size={24} color={focused ? COLOR.PrimaryColor : '#fff'} />
            }
        }
    }, {
        id: Math.random() + "" + Date,
        name: NetworkRootBottomTabEnum.ExploreScreen,
        component: ExploreScreen,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return <Icon name="search1" size={24} color={focused ? COLOR.PrimaryColor : '#fff'} />
            }
        }
    }, {
        id: Math.random() + "" + Date,
        name: NetworkRootBottomTabEnum.CreatePostScreen,
        component: CreatePostScreen,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return (
                    <View style={
                        {
                            width:50,
                            height:35,
                            backgroundColor:COLOR.PrimaryColor,
                            alignItems:'center',
                            justifyContent:"center",
                            borderRadius:13

                        }}>
                        <Icon name="plus" size={20} color='#fff' />
                    </View>
                )
            }


        }
    }, {
        id: Math.random() + "" + Date,
        name: NetworkRootBottomTabEnum.NotificationScreen,
        component: NotificationScreen,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return <Icon name="bells" size={24} color={focused ? COLOR.PrimaryColor : '#fff'} />
            }


        }
    },
    {
        id: Math.random() + "" + Date,
        name: NetworkRootBottomTabEnum.ProfileScreen,
        component: ProfileScreen,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return <Icon name="user" size={24} color={focused ? COLOR.PrimaryColor : '#fff'} />
            }


        }
    },
    

]