import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TitleBarComponent from './TitleBarComponent'
import EventItem from './EventItem'

const UpcomingEventsComponent = () => {
  return (
    <View style={styles.container}>
      <TitleBarComponent title='Upcoming Events'/>
      <EventItem/>
    </View>
  )
}

export default UpcomingEventsComponent

const styles = StyleSheet.create({})