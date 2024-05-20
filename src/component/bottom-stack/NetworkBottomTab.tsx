import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NetworkRootBottomTabParams,NetworkRootBottomTabScreens } from "./NetworkRootBottomTabParams";

const Tab=createBottomTabNavigator<NetworkRootBottomTabParams>();

export default function NetworkBottomTab():React.JSX.Element{
    return (
        <Tab.Navigator
            screenOptions={{
                
            }}
            >
            {
                NetworkRootBottomTabScreens.map((item,index)=>{
                    return <Tab.Screen
                        key={item.id}
                        component={item.component}
                        name={item.name}
                        options={item.options}
                        
                    />
                })
            }
        </Tab.Navigator>
    )
}