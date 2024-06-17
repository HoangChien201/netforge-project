import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';

const FriendScreen = () => {
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
      <Text>FriendScreen</Text>
    </View>
  )
}

export default FriendScreen

const styles = StyleSheet.create({})