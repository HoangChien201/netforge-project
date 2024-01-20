import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Body from '../component/map_Event/Body'
import MapView from '../component/map_Event/MapView'
import MapEventItem from '../component/map_Event/MapEventItem'
const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView />
      <View style={styles.absolute}>
        <Body />
      </View>
      <View style={styles.listevents}>
        <MapEventItem />
      </View>

    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
  },
  absolute: {
    position: 'absolute',
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  listevents: {
    position: 'absolute',
    bottom:25,
    height:106,
    alignItems:'center',
    justifyContent:'center'
  }
})