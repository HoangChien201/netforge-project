import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import FRIEND from './Friend'
type USER = {
  user: any
}
const User: React.FC<USER> = ({ user }) => {
  const getRelationshipText = (status: any) => {
    if (status === 1) {
      return 'Bạn hoặc người dùng này đã gửi lời mời!';
    } else if (status === 2) {
      return 'Các bạn đã là bạn bè của nhau!';
    } else {
      return 'Hai bạn là kẻ thù của nhau!';
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {user.avatar ?
          <Image source={{ uri: user.avatar }} style={styles.image} />
          :
          <View style={styles.image}></View>
        }
      </View>
      <View style={styles.infor}>
        <Text style={styles.name}>{user.fullname}</Text>
        {user.address ?
          <Text style={styles.address}>Địa chỉ: {user.address}</Text>
          :
          null
        }

      </View>
      {user.relationship == null ?
        <FRIEND id={user.id}/>
        :
        <View>
          <Text style={styles.isFriend}>{user.relationship ? getRelationshipText(user.relationship.status) : 'Không tìm thấy?'}</Text>
          <TouchableOpacity style={styles.buttonPage}>
            <Text style={styles.page}>Xem trang cá nhân</Text>
          </TouchableOpacity>
        </View>}
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop:-60,
    marginBottom:40

  },
  infor: {
    marginHorizontal: 20
  },
  image: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
    borderRadius: 200
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop:10
  },
  address: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    overflow:'hidden',
    marginBottom:20
  },
  isFriend:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop:10
  },
  buttonPage:{
    backgroundColor:'#07A3B2',
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    marginTop:20
  },
  page:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
})