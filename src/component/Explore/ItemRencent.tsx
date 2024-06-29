import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {COLOR} from '../../constant/color';
import { HangUpCallButton } from '@stream-io/video-react-native-sdk';

const ItemRencent = ({ item, onPressDelete }) => {
    const handleDelete = () => {
        onPressDelete(item.id);
      };
      const handleNe =() =>{
        console.log('idItemne:', item.id);
        
      }
  return (
    <View style={styles.itemRecentContai}>
    <TouchableOpacity style={styles.itemRecent} onPress={handleNe}>
      <Image source={{ uri: item.avatar }} style={styles.imageItem} />
      <Text style={styles.nameItem}>{item.fullname}</Text>
      <TouchableOpacity style={{ marginRight: 10 }} onPress={handleDelete}>
        <Image source={require('../../media/icon_tuong/trash.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
  )
}

export default ItemRencent

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