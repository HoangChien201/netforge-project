import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps, FlatList } from 'react-native'
import React from 'react'



const CATEGORIES: Array<CategoryEntity> = [
  {
    id: 1,
    image: require('../../../media/icon/avt_1_icon.png'),
    name: 'LeHoangChien',
    status: 'Like you events',
    minute: '1 year ago',
  },
  {
    id: 2,
    image: require('../../../media/icon/avt_3_icon.png'),
    name: 'LeHoangDuy',
    status: 'Like you events',
    minute: '2 year ago',
  },
  {
    id: 3,
    image: require('../../../media/icon/avt_1_icon.png'),
    name: 'LucThienPhu',
    status: 'your Event Gala Music Festival',
    minute: '1 year ago',
  }
];
type CategoryEntity = {
  id: number,
  image: ImageProps,
  name: string,
  status: string,
  minute: string
}
interface ItemRenderProp{
  id?: number,
  image?: ImageProps,
  name: string,
  status: string,
  minute: string
}
const ItemRender:React.FC<ItemRenderProp>=({ image, name, status, minute })=>{

  return (
    <TouchableOpacity style={styles.containerUser}>
      <Image style={styles.imageUser} source={image} />
      <View style={styles.containerText}>
        <View style={styles.ConStatus}>
          <Text style={styles.NameUser}>{name}</Text>
          <Text style={styles.Status}>{status}</Text>
        </View>
        <Text style={styles.textTime}>{minute}</Text>
      </View>
    </TouchableOpacity>
  )

}

const NotificationScreen = () => {

  return <View style={styles.container}>
    <FlatList
      data={CATEGORIES}
      renderItem={({ item }) => {
        return (
          <ItemRender image= {item.image}name={item.name} status={item.status} minute={item.minute} />
        )
      }}
      keyExtractor={item => item.id.toString()} />
  </View>;
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10

  },
  imageUser: {
    width: 60,
    height: 60,
  },
  containerUser: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    


  },
  containerText: {
    flexDirection: 'row',
    width: 268,
    height: 46,
    textAlign: 'center'

  },
  NameUser: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    lineHeight: 18.23,


  },
  Status: {
    fontSize: 14,
    color: '#3C3E56',
    lineHeight: 23,
    width: 200


  },
  textTime: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18.23,
    color: '#3C3E56',
    marginStart: 10

  },
  ConStatus: {
    flexDirection: 'column',
    marginStart: 10,
    
    


  }
});