import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';


import HISTORY from '../../component/user-histories-modal/Body'
const HistoryActivityScreen = () => {
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  useEffect(() => {
    if (isFocus) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }



  }, [isFocus]);
  return (
    <View>
      <HISTORY/>
    </View>
  )
}

export default HistoryActivityScreen

const styles = StyleSheet.create({})