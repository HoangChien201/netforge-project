import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';

const ItemStory = ({ data, setIndex, index, indexfind, list }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation(); 
console.log("data",data);

  return (
    <TouchableOpacity
      onPress={() => {
        setIndex(indexfind);
        navigation.navigate("StoryScreen", { list, indexfind });
      }}
    >
      <View style={[styles.borderContainer,{ borderColor: indexfind === index ? COLOR.PrimaryColor1 : '#A5A3A3' }]}>
        <ImageBackground 
          source={{ uri: data.posts[0].media[0].url }} 
          style={styles.imageBackground} 
          imageStyle={styles.imageStyle}
        >
          <Image 
            source={{ uri: data.avatar }} 
            style={[
              styles.avatar, 
              { borderColor: indexfind === index ? COLOR.PrimaryColor1 : COLOR.PrimaryColor }
            ]} 
          />
          <Text style={{top:data?.fullname.length > 8 ? 60:70,color:'#fff',fontWeight:'bold'}}>{data?.fullname}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ItemStory;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: 'cover',
    borderWidth: 1.5,
  },
  borderContainer: {
    width: 100,
    height: 150,
    borderRadius: 7,
    overflow: 'hidden',
    margin: 5,
    borderWidth: 2,
   
  },
  imageBackground: {
    flex: 1,
    padding:7
  },
  imageStyle: {
    borderRadius: 6,
    borderWidth: 2, 
    borderColor: 'white', 
  },
});
