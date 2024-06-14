import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react'
import { COLOR } from '../../constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Remember: React.FC = () => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState<boolean>(false);
  const handleToggleCheckBox = async (newValue: boolean) => {
    setToggleCheckBox(newValue);
    if (newValue) {
      await AsyncStorage.setItem('keep', 'true');
      console.log('đã Giữ đăng nhập');
    } else {
      await AsyncStorage.removeItem('keep');
    }
  };
  return (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={handleToggleCheckBox}
        tintColors={{ true: COLOR.primary200, false: "black" }}
      />
      <Text style={styles.label}>Giữ đăng nhập?</Text>
    </View>
  )
}

export default Remember

const styles = StyleSheet.create({
  label: {}
})