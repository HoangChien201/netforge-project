import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import ListMessageItem from '../../component/message/ListMessageItem'

const ListMessageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Tin Nhắn</Text>
        <TouchableOpacity>
          <EntypoIcon name='new-message' size={24} color={'#000'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
          <ListMessageItem/>
      </View>
    </View>
  )
}

export default ListMessageScreen

const styles = StyleSheet.create({
  content:{

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