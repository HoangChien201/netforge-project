import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps, FlatList } from 'react-native'
import React from 'react'
import RatingStart from './RatingStart';

type ReviewEntity = {
  id: number,
  avatar: ImageProps,
  name: string,
  time: string,
  text_review: string,
}
interface ItemRenderProp{
  id?: number,
  avatar?: ImageProps,
  name: string,
  time: string,
  text_review: string,
}


const REVIEWS: Array<ReviewEntity> = [
  {
      id: 1,
      avatar: require('../../../../media/icon/phuking.jpg'),
      name: 'Lục Thiên Phú',
      time: '10 Feb',
      text_review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you. Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
  },
  {
      id: 2,
      avatar: require('../../../../media/icon/phuking.jpg'),
      name: 'Lê Hoàng Chiến',
      time: '10 Feb',
      text_review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
  },
  {
      id: 3,
      avatar: require('../../../../media/icon/phuking.jpg'),
      name: 'Lê Hoàng Duy',
      time: '10 Feb',
      text_review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
  },
  {
      id: 4,
      avatar: require('../../../../media/icon/phuking.jpg'),
      name: 'Lê Thanh Tường',
      time: '10 Feb',
      text_review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
  },
  {
      id: 5,
      avatar: require('../../../../media/icon/phuking.jpg'),
      name: 'Trần Văn Quyết',
      time: '10 Feb',
      text_review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
  },
  {
      id: 6,
      avatar: require('../../../../media/icon/phuking.jpg'),
      name: 'Trần Hữu Trí',
      time: '10 Feb',
      text_review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
  }

  ];

  const ItemRender:React.FC<ItemRenderProp>=({ avatar, name, time, text_review })=>{
  return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.imgAvatar} source={avatar} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameAndTimeHeader}>
            <Text style={styles.txtName}>{name}</Text>
            <Text style={styles.txtTime}>{time}</Text>
          </View>
          <RatingStart/>
          <Text style={styles.txtReview}>{text_review}</Text>
        </View>
      </TouchableOpacity>
  )
  }

const ItemListReviews = () => {
  return (
    <View>
      <FlatList
        data={REVIEWS}
        renderItem={({ item }) => {
          return (
            <ItemRender avatar= {item.avatar} name={item.name}  time={item.time} 
              text_review={item.text_review} />
            )
        }}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator= {false}/>
        </View>
  )
}

export default ItemListReviews

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    backgroundColor:"#FFFFFF",
    paddingVertical:10,
    flex:1,
  },
  imgContainer:{
    borderRadius: 50,
    overflow: 'hidden', // Đảm bảo hình ảnh không vượt ra khỏi hình tròn
    width: 40,
    height: 40,
  },
  imgAvatar: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover', // Đảm bảo hình ảnh nằm đúng trong hình tròn
  },
  textContainer: {
    flex:1,
    marginLeft:10,
  },
  nameAndTimeHeader: {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  txtTime: {
    fontSize:15,
    fontWeight:'400',
    lineHeight:25,
    color:'#ADAFBB',
  },
  txtName: {
    fontSize:18,
    fontWeight:'500',
    lineHeight:34,
    color:'#120D26',
  },
  txtReview: {
    fontSize:15,
    fontWeight:'400',
    lineHeight:25,
    color:'#000',
  },

})