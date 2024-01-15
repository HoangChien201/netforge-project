import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { EventRootBottomTabParams,EventRootBottomTabScreens } from "./EventRootBottomTabParams";

const Tab=createBottomTabNavigator<EventRootBottomTabParams>();

export default function EventBottomTab():React.JSX.Element{
    return (
        <Tab.Navigator>
            {
                EventRootBottomTabScreens.map((item,index)=>{
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