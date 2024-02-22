import 'react-native-gesture-handler';
import React from "react";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BrowsePosts from './screen/BrowsePosts';
import BrowseEvent from './screen/BrowseEvent';

const Tab = createMaterialTopTabNavigator();

export default function AdminBrowse(): React.JSX.Element {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="PostsScreen" 
                component={BrowsePosts} 
                options={
                    {
                        title:'Bài viết',
                        tabBarLabelStyle:{
                            fontSize:18,
                            textTransform:'capitalize'
                        },                     
                    }
                }
                />
            <Tab.Screen 
                name="EventScreen" 
                component={BrowseEvent} 
                options={
                    {
                        title:'Sự kiện',
                        tabBarLabelStyle:{
                            fontSize:18,
                            textTransform:'capitalize'
                        }
                    }
                }
                />
        </Tab.Navigator>
    )
}