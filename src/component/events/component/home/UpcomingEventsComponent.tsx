import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TitleBarComponent from './TitleBarComponent'
import EventItem from './EventItem'

const PARTICIPANTS=[
    require('../../../../media/icon/avt_1_icon.png'),
    require('../../../../media/icon/avt_2_icon.png'),
    require('../../../../media/icon/avt_3_icon.png'),
    require('../../../../media/icon/avt_3_icon.png'),


]

const UpcomingEventsComponent = () => {
  return (
    <View style={styles.container}>
      <TitleBarComponent title='Upcoming Events'/>
      <EventItem name='International Band Music' image={require('../../../../media/icon/event_1.png')} participants={PARTICIPANTS} address='36 Guild Street London, UK'/>
    </View>
  )
}

export default UpcomingEventsComponent

const styles = StyleSheet.create({})