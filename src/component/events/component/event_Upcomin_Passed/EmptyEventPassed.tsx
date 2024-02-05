import { View, ScrollView, Animated, StyleSheet, Image, Text, ImageProps, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

const EmptyEventPassed = () => {
  return (
    <View style={styles.emptyEvent}>
      <View style={styles.imgaeEmpty}>
        <Image style={styles.iconEmpty} source={require('../../../../media/quyet_icon/schedule.png')} />
      </View>
      <View style={styles.emptyEventText}>
        <Text style={styles.emptyEventText1}>No Passed Event</Text>
        <Text style={styles.emptyEventText2}>Lorem ipsum dolor sit amet, consectetur </Text>
      </View>
    </View>
  )
}

export default EmptyEventPassed

const styles = StyleSheet.create({

  iconEmpty: {
    height: 168,
    width: 168,
    zIndex: 1,
    marginTop: 30,
    marginStart: 15,
    resizeMode: 'cover',
  },
  imgaeEmpty: {
    width: 202,
    height: 202,
    backgroundColor: '#DADADA',
    borderRadius: 202,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  emptyEvent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyEventText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  emptyEventText1: {
    color: '#120D26',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 45
  },
  emptyEventText2: {
    color: '#120D26',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25
  },
  upcommingText: {
    color: '#5669FF',
    fontFamily: 'Airbnb Cereal App',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25
  },


})