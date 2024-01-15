import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderExplore from '../component/home/HeaderExplore'
import UpcomingEventsComponent from '../component/home/UpcomingEventsComponent'

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderExplore/>
      <ScrollView style={styles.content}>
        <UpcomingEventsComponent/>
      </ScrollView>
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container:{

  },
  content:{
    paddingHorizontal:24
  }
})