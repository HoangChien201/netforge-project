import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';


const ItemStory = ({ data,setIndex, index, indexfind,list }) => {
  const navigation:NavigationProp<ParamListBase> = useNavigation(); 
  
  const itemPost = data.posts
 
  return (
    <View style={styles.border}>
      <TouchableOpacity
        onPress={() => {
          setIndex(indexfind);
          navigation.navigate("StoryScreen",{itemPost,list,indexfind})
        }}
      >
        <Image source={{uri:data.avatar}} style={[styles.avt,{borderColor:indexfind===index?COLOR.PrimaryColor1:COLOR.PrimaryColor}]} />
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
