import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'
import ItemLike from './ItemLike'
import ItemComment from './ItemComment'
const NewNotificationes = () => {
  return (
    <View>
      <Text style={styles.headerText}>Mới</Text>
      <TouchableOpacity style={styles.container}>
        <ItemLike />
      </TouchableOpacity>
    </View>
  )
}

export default NewNotificationes

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: "normal",
    color: 'black',
    marginStart: 5
  }

})