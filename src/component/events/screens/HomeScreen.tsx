import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventBottomTab from '../../bottom-stack/EventBottomTab'
import { navigationType } from '../../navigation/ManageNavigation'

const HomeScreen = (navigation : {navigation:navigationType}) => {
  return (
    <>
        <EventBottomTab/>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})