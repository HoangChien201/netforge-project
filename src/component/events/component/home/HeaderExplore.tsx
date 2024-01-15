import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../../../constant/color'
import MenuIcon from '../MenuIcon'
import SearchComponent from './SearchComponent'
import CategoryComponent from './CategoryComponent'

const HeaderExplore = () => {
  return (
    <View style={styles.container}>
      <View>
        {/* begin-tabbar */}
        <View style={styles.tabBarContainer}>
          <MenuIcon />
          <View style={styles.currentLocationContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.lableLocation}>Current Location</Text>
              <Image source={require('../../../../media/icon/triangle_icon.png')} style={{ marginHorizontal: 5 }} />
            </View>
            <Text style={styles.location}>New York,USA</Text>
          </View>
          <TouchableOpacity style={styles.notificationContainer}>
            <Image source={require('../../../../media/icon/ring_icon.png')} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>
        {/* end-tabbar */}

        {/* begin-search */}
        <SearchComponent />
        {/* end-search */}
      </View>

      <View style={styles.categoryComponent}>
        <CategoryComponent />
      </View>

    </View>
  )
}

export default HeaderExplore

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLOR.primaryColor,
    height: 180,
    width: '100%',
    borderBottomRightRadius: 34,
    borderBottomLeftRadius: 34,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom:20
  },
  tabBarContainer: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",

  },
  currentLocationContainer: {
    maxWidth: 150,
    height: '100%'
  },
  lableLocation: {
    color: "#fff",
    fontSize: 12,
    fontWeight: '400'
  },
  location: {
    fontSize: 13,
    fontWeight: '500',
    color: "#fff",

  },
  notificationContainer: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: '#524CE0',
    justifyContent: "center",
    alignItems: 'center'

  },
  notificationIcon: {
    width: 20,
    height: 20
  },
  categoryComponent: {
    position:'relative',
    top:'25%',
    zIndex:10
  }
})