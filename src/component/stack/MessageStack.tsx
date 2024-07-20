import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MessageRootStackParams, MessageRootStackScreens } from './MessageRootStackParams'

const Stack = createStackNavigator<MessageRootStackParams>()
const MessageStack = () => {
    
  return (
    <Stack.Navigator
      initialRouteName='ListMessageScreen'
    >
        {
            MessageRootStackScreens.map((screens)=>{
                return (
                    <Stack.Screen name={screens.name} key={screens.id} component={screens.component} options={screens.options}/>
                )
            })
        }
    </Stack.Navigator>
  )
}

export default MessageStack

const styles = StyleSheet.create({})