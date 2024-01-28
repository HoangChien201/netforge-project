import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemListEvents from '../component/profile/ItemListEvents'

const EventsScreen = () => {
  return (
    <View style={styles.container}>
        <ItemListEvents/>
    </View>
  )
}

export default EventsScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
})