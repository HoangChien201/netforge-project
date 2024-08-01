import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { useMyContext } from '../../component/navigation/UserContext';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ItemSearch = ({ item, handleItemClick, users }) => {
  console.log('users', item.id);
  const user = useSelector((state : RootState)=>state.user.value)



  return (
    <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.item} onPress={() => handleItemClick(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      
      <View style={styles.textContainer}>
        <Text style={styles.fullName}>{item.fullname}</Text>
        {item.id == user?.id && (
          <Text style={styles.youTag}>(Bạn)</Text>
        )}
      </View>
      
      <TouchableOpacity style={styles.optionsIcon}>
        <Icon name='options' size={20} color={'#2F3645'} />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
)
}

export default ItemSearch

const styles = StyleSheet.create({
itemContainer: {
  marginTop: 15,
  paddingHorizontal: 10,
  paddingVertical: 2,
  borderRadius: 10,

},
item: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
avatar: {
  borderRadius: 50,
  width: 40,
  height: 40,
},
textContainer: {
  flex: 1,
  marginLeft: 15,
  justifyContent: 'center',
},
fullName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#2F3645',
},
youTag: {
  fontSize: 14,
  color: '#6C757D',
  fontWeight: '500'
},
optionsIcon: {
  marginLeft: 10,
},
});