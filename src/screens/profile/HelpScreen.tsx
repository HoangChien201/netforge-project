import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
  const navigation = useNavigation()
  const isFocus = useIsFocused()

  useEffect(() => {

    if(isFocus){
      navigation.getParent()?.setOptions({
          tabBarStyle: {
              display: 'none',
          }
      });
    }


}, [isFocus]);
  return (
    <View>
      <Text>HelpScreen</Text>
    </View>
  )
}

export default HelpScreen

const styles = StyleSheet.create({})