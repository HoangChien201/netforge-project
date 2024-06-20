import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import ListMessageItem, { GroupChatType } from '../../component/message/ListMessageItem'
import { useMyContext } from '../../component/navigation/UserContext'
import { getGroupsAPI } from '../../http/ChienHTTP'
const DATA:Array<GroupChatType>=
  [
    {
      "id": 1,
      "name": null,
      "type": "single",
      "image": null,
      "members": [
        {
          "user": {
            "id": 1,
            "fullname": "Le Hoang Chien",
            "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1718786427/tta0qynlk3jssumgucy2.jpg"
          }
        },
        {
          "user": {
            "id": 2,
            "fullname": "Le Hoang lan",
            "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1718785906/sb4hrqbwvl1iauyxl824.jpg"
          }
        }
      ]
    },
    {
      "id": 3,
      "name": "Group 1",
      "type": "group",
      "image": 'https://res.cloudinary.com/delivery-food/image/upload/v1717925637/oqbqmqtswalnlfrmhayn.png',
      "members": [
        {
          "user": {
            "id": 1,
            "fullname": "Le Hoang Chien",
            "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1718786427/tta0qynlk3jssumgucy2.jpg"
          }
        },
        {
          "user": {
            "id": 2,
            "fullname": "Le Hoang lan",
            "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1718785906/sb4hrqbwvl1iauyxl824.jpg"
          }
        },
        {
          "user": {
            "id": 3,
            "fullname": "Le Hoang ",
            "avatar": " https://res.cloudinary.com/delivery-food/image/upload/v1718706392/dhfk1kr7rvvvtmsefzc7.jpg"
          }
        },
        {
          "user": {
            "id": 4,
            "fullname": "Le Hoang Bui",
            "avatar": 'https://res.cloudinary.com/delivery-food/image/upload/v1718725252/mob29aaunfbob7k52btg.webp'
          }
        }
      ]
    },
    {
      "id": 4,
      "name": "Group 2",
      "type": "group",
      "image": 'https://res.cloudinary.com/delivery-food/image/upload/v1717925637/oqbqmqtswalnlfrmhayn.png',
      "members": [
        {
          "user": {
            "id": 2,
            "fullname": "Le Hoang lan",
            "avatar": "https://res.cloudinary.com/delivery-food/image/upload/v1718785906/sb4hrqbwvl1iauyxl824.jpg"
          }
        },
        {
          "user": {
            "id": 3,
            "fullname": "Le Hoang ",
            "avatar": " https://res.cloudinary.com/delivery-food/image/upload/v1718706392/dhfk1kr7rvvvtmsefzc7.jpg"
          }
        },
        {
          "user": {
            "id": 4,
            "fullname": "Le Hoang Bui",
            "avatar": 'https://res.cloudinary.com/delivery-food/image/upload/v1718725252/mob29aaunfbob7k52btg.webp'
          }
        }
      ]
    }
  ]

const ListMessageScreen = () => {
  const {user}=useMyContext()
  const [groups,setGroups]=useState<Array<GroupChatType>>([])

  useEffect(()=>{
    getGroups()
  },[])

  async function getGroups(){
    const respone= await getGroupsAPI()
    console.log('respone',respone);
    
    if(respone){
      setGroups(respone)
    } 
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Nhắn tin</Text>
        <TouchableOpacity>
          <EntypoIcon name='new-message' size={24} color={'#000'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
          <FlatList
            data={groups}
            renderItem={({item})=>{
              return (
                <ListMessageItem group={item}/>
              )
            }}
            keyExtractor={(item)=>item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
      </View>
    </View>
  )
}

export default ListMessageScreen

const styles = StyleSheet.create({
  content:{
    marginTop:20
  },
  header:{
    color:'#000',
    fontSize:30,
    fontWeight:'700'
  },  
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  container:{
    paddingHorizontal:24,
    paddingVertical:8
  },
})