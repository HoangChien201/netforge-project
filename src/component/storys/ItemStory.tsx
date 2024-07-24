import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';
import { setDate } from 'date-fns';

const ItemStory = ({ data, setIndex, index, indexfind, list }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [result,setResult] = useState(data);
  console.log("dâtta",data);
  useEffect(() => {
    setResult(data)
  }, [data]); 
  return (
    <TouchableOpacity
      onPress={() => {
        setIndex(indexfind);
        navigation.navigate("StoryScreen", { list, indexfind });
      }}
    >
      <View style={[styles.borderContainer,{ borderColor: result?.posts[0].type === 3 ? 'red' : indexfind === index ? COLOR.PrimaryColor1 : '#A5A3A3'}]}>
        {
          result?.posts[0].type === 3 && <View style={{position:'absolute',top:5,right:6,zIndex:11111,backgroundColor:'red',padding:3,borderColor:'white',borderWidth:1}}><Text style={{fontWeight:'bold',color:'white',fontSize:10}}>Live</Text></View>
        }
        <ImageBackground 
          source={{ uri: result?.posts[0].media[0]?.url ? result?.posts[0].media[0]?.url  : "https://images.pexels.com/photos/2310713/pexels-photo-2310713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }} 
          style={styles.imageBackground} 
          imageStyle={styles.imageStyle}
        >
          <Image 
            source={{ uri: result?.avatar }} 
            style={[
              styles.avatar, 
              { borderColor: indexfind === index ? COLOR.PrimaryColor1 : COLOR.PrimaryColor }
            ]} 
          />
          <Text style={{top:result?.fullname.length > 8 ? 60:70,color:'#fff',fontWeight:'bold'}}>{result?.fullname}</Text>
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
