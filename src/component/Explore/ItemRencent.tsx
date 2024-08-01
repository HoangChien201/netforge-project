import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { useMyContext } from '../navigation/UserContext';
import Icon from 'react-native-vector-icons/Feather'
import { COLOR } from '../../constant/color';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ItemRencent = ({ item, onPressDelete, users }) => {
  const navigation = useNavigation()
  const user = useSelector((state : RootState)=>state.user.value)
  
  const handleToProfile = () => {
    //setSelectedUserId(userId);
    const userId = item.id
    if (userId === user?.id) {
      //setIsModalVisible(false);
      navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    } else {
      //setIsModalVisible(true);
      navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
    }
  };
  const handleDelete = () => {
    onPressDelete(item.id);
  };

  return (
       <View style={styles.itemContainer}>
       <TouchableOpacity style={styles.item} onPress={handleToProfile}>
         <Image source={{ uri: item.avatar }} style={styles.avatar} />
         
         <View style={styles.textContainer}>
           <Text style={styles.fullName}>{item.fullname}</Text>
           {item.id == user?.id && (
             <Text style={styles.youTag}>(Bạn)</Text>
           )}
         </View>
         
         <TouchableOpacity style={styles.optionsIcon} onPress={handleDelete}>
         <Icon name='x' size={24} />
         </TouchableOpacity>
       </TouchableOpacity>
     </View>
  )
}

export default ItemRencent

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
})