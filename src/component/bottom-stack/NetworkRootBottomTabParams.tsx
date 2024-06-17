import React from "react"
import { View } from "react-native"

import Icon from 'react-native-vector-icons/AntDesign'
import CreatePostScreen from "../../screens/CreatePostScreen"
import NotificationScreen from "../../screens/NotificationScreen"
import { COLOR } from "../../constant/color"
import HomeStack from "../stack/HomeStack"
import CommentsScreen from "../../screens/CommentsScreen"
import MenuScreen from "../../screens/MenuScreen"
import ProfileStack from "../stack/ProfileStack"
import MessageStack from "../stack/MessageStack"


enum NetworkRootBottomTabEnum {
    HomeStack = 'HomeStack',
    NotificationScreen = 'NotificationScreen',
    CreatePostScreen = 'CreatePostScreen',
    MessageStack = 'MessageStack',
    ProfileStack = 'ProfileStack'
}

export type NetworkRootBottomTabParams = {
    HomeScreen: undefined,
    NotificationScreen: undefined,
    CreatePostScreen: undefined,
    MessageStack: undefined,
    ProfileStack: undefined
}

export const NetworkRootBottomTabScreens = [
    {
        id: Math.random() + "" + Date,
        name: NetworkRootBottomTabEnum.HomeStack,
        component: HomeStack,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return <Icon name="home" size={24} color={focused ? COLOR.PrimaryColor : '#fff'} />
            }
        }
    }, {
        id: Math.random() + "" + Date,
        name: NetworkRootBottomTabEnum.MessageStack,
        component: MessageStack,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return <Icon name="message1" size={24} color={focused ? COLOR.PrimaryColor : '#fff'} />
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
        name: NetworkRootBottomTabEnum.ProfileStack,
        component: ProfileStack,
        options: {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
                return <Icon name="menu-fold" size={24} color={focused ? COLOR.PrimaryColor : '#fff'} />
            }
        }
    },

]