import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ItemListReviews from '../component/profile/ItemListReviews'



const ReviewScreen = () => {
  return (
    <View style={styles.container}>
      <ItemListReviews/>
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  }
})