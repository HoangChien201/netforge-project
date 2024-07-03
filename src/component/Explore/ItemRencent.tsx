import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { useMyContext } from '../navigation/UserContext';
import Icon from 'react-native-vector-icons/Feather'
import { COLOR } from '../../constant/color';

const ItemRencent = ({ item, onPressDelete,  }) => {
  const navigation = useNavigation()
  const { user } = useMyContext();
  const handleToProfile = () => {
    //setSelectedUserId(userId);
    const userId = item.id
    if (userId === user.id) {
        //setIsModalVisible(false);
        navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    } else {
        //setIsModalVisible(true);
        navigation.navigate(ProfileRootStackEnum.FriendProfile, {userId});
    } 
  };
    const handleDelete = () => {
        onPressDelete(item.id);
      };

  return (
    <View style={styles.itemRecentContai}>
    <TouchableOpacity style={styles.itemRecent} onPress={handleToProfile}>
      <Image source={{ uri: item.avatar }} style={styles.imageItem} />
      <Text style={styles.nameItem}>{item.fullname}</Text>
      <TouchableOpacity style={{ marginRight: 10 }} onPress={handleDelete}>
      <Icon name='x' size={24} />
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