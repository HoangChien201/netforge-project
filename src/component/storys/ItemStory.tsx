import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';


const ItemStory = ({ setIndex, index, indexfind }) => {
  const navigation:NavigationProp<ParamListBase> = useNavigation(); 
  return (
    <View style={styles.border}>
      <TouchableOpacity
        onPress={() => {
          // Remove the undefined variable log or replace it with a valid statement
          console.log('Item pressed',indexfind);
          console.log('Item pressed1',index);
          setIndex(indexfind);
          navigation.navigate("StoryScreen")
        }}
      >
        <Image source={require('../../media/icon/phuking.jpg')} style={[styles.avt,{borderColor:indexfind===index?"red":"#E27C39"}]} />
      </TouchableOpacity>
      
    </View>
  );
};

export default ItemStory;

const styles = StyleSheet.create({
  avt: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: 'cover',
    borderWidth: 4,
    
  },
  border: {
    padding: 5,

  },
});
