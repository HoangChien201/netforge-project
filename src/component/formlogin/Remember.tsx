import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React from 'react'
import { COLOR } from '../../constant/color';

const Remember:React.FC = () => {
    const [toggleCheckBox, setToggleCheckBox] = React.useState<boolean>(false);
  return (
    <View style={{alignItems:"center",flexDirection:"row"}}>
       <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          tintColors={{true:COLOR.primary200,false:"black"}}
        />
        <Text style={styles.label}>Stay logged in?</Text>
    </View>
  )
}

export default Remember

const styles = StyleSheet.create({})