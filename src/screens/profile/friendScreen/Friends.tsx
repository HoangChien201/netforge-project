import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';


import { deleteFriend } from '../../../http/QuyetHTTP';
import { useMyContext } from '../../../component/navigation/UserContext';
import DeleteFriend from './DeleteFriend';
import Loading from '../../../component/Modal/Loading';
import { ProfileRootStackEnum } from '../../../component/stack/ProfileRootStackParams';

type Friend = {
  friends: any,
  setFriends: () => void;
}

const Friends: React.FC<Friend> = ({ friends, setFriends}) => {
  const { user } = useMyContext();
  const [show, setShow] = useState(false);
  const [user2, setUser2] = useState<number>(0);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  if (!friends || friends.length === 0) {
    return <View style={{alignItems:'center', justifyContent:'center',
      marginTop:10
    }}>
      <Text style={styles.headerText}>Chưa có bạn bè</Text>
    </View>;
    //return <Loading isLoading={true}/>;
  };
  const deleteFri = async (user2: number) => {
    setShow(true);
    setUser2(user2);
  };
  const handleToFriendProfile = (userId: any) => {
    navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
  };
  return (
    <ScrollView style={{ marginHorizontal: 10 }}>
      {friends.map((friend: { user: { id: string | number; avatar: any; fullname: string | any | undefined } }) => (
        <TouchableOpacity key={friend.id.toString()} onPress={() => handleToFriendProfile(friend.user.id)}>
          <View style={styles.itemWA}>
            <View style={styles.user}>
              {friend.user.avatar ? <Image source={{ uri: friend.user.avatar }} style={styles.avatarne} /> :
                <View style={{ height: 48, width: 48, borderRadius: 50, borderWidth: 1, borderColor: 'gray', backgroundColor: '#DDDDDD', }} />
              }
              <Text style={styles.userName}>{friend.user.fullname}</Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.buttonAccept} onPress={() => deleteFri(friend.user.id)} >
                <Text style={styles.textAccept1}>
                  Xóa bạn
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </TouchableOpacity>
      ))
      }
      <DeleteFriend show={show} setShow={setShow} user2={user2} setFriends={setFriends}/>
    </ScrollView >
  )
}

export default Friends

const styles = StyleSheet.create({
  headerText: {
    marginStart: 10,
    fontWeight: '500',
    fontSize: 18,
    color: 'black'
  },
  itemWA: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    marginTop: 3,
    justifyContent: 'space-between',
    marginStart: 3,
    marginBottom: 3,
    marginEnd: 3
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10
  },
  userName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    marginTop: 10,
    marginStart: 5
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5
  },
  buttonAccept: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  buttonReject: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  textAccept: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textTransform: 'capitalize'

  },
  avatarne: {
    height: 48,
    width: 48,
    borderRadius: 50,

  },
  textAccept1: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textTransform: 'capitalize'

  },
})