import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MenuIcon = () => {
  return (
    <TouchableOpacity>
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