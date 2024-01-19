import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Body from '../component/event_Upcomin_Passed/Body'

const EventUpcommingPassed = () => {
  return (
    <View style={styles.container}>
      <Body/>
    </View>
  )
}

export default EventUpcommingPassed

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  content:{
    paddingHorizontal:24,
  }
})