import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const ItemSearch = ({item, handleItemClick}) => {
  return (
    <View style={styles.itemRecentContai}>
    <TouchableOpacity style={styles.itemRecent} onPress={() => handleItemClick(item)}>
      <Image source={{ uri: item.avatar }} style={styles.imageItem} />
      <Text style={styles.nameItem}>{item.fullname}</Text>
      <TouchableOpacity style={{ marginRight: 10 }}>
      <Icon name='options' size={20} color={'#2F3645'} />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
  )
}

export default ItemSearch

const styles = StyleSheet.create({

      itemRecentContai: {
        marginTop: 15,
        flexDirection: 'column',
    
    
      },
      nameItem: {
        position: 'absolute',
        left: 58,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
      },
      imageItem: {
        marginStart: 10,
        borderRadius: 100,
        width: 38,
        height: 38
      },
      itemRecent: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
      },
})