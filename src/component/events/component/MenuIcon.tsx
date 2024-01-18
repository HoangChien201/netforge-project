import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'

const MenuIcon = ({onPress}:{onPress:any}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../../../media/icon/menu_icon.png')} style={styles.menuIcon}/>
    </TouchableOpacity>
  )
}

export default MenuIcon

const styles = StyleSheet.create({
    menuIcon: {
        width: 24,
        height: 19,
      },
})