import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';

const HistoryActivityScreen = () => {
  const navigation = useNavigation()
  const isFocus=useIsFocused()
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
      <Text>HistoryActivityScreen</Text>
    </View>
  )
}

export default HistoryActivityScreen

const styles = StyleSheet.create({})