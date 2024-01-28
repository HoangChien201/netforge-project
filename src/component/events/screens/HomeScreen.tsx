import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventBottomTab from '../../bottom-stack/EventBottomTab'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack=createNativeStackNavigator()
const HomeScreen = () => {
  return (
    <>
        <EventBottomTab/>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})