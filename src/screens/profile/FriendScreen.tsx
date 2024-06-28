import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../constant/color'

import MODALFRIEND from '../../component/friend-request-accept-modal/Body'
import { getFriends } from '../../http/QuyetHTTP';
import Friends from './friendScreen/Friends';
import RequestFriends from './friendScreen/RequestFriends';
type Friends = {
}
const FriendScreen: React.FC<Friends> = () => {
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  const [friends, setFriends] = useState<any[]>([]);
  const status2 = 2;
  const [showModalFriend, setShowModalFriend] = useState(false);
  const [dot, setDot] = useState(Number);
  const [reload, setReload] = useState(false)
  const getFriendList = async (status: number) => {
    try {
      const result = await getFriends(status);
      if (result) {
        setFriends(result);
        console.log('bạn bè: ' + JSON.stringify(result));

      }
    } catch (error) {
      console.log(error);
    }
  };
  const ShowModalFriend = () => {
    setShowModalFriend(true);
  }
  useEffect(() => {
    getFriendList(status2);
  }, [])
  useEffect(() => {
    if (isFocus) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }
  }, [isFocus]);

  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={ShowModalFriend}>
        <View style={styles.reqFriends}>
          <View style={styles.iconFriend} >
            <Icon name='adduser' size={24} color={COLOR.PrimaryColor} />
          </View>
          <View style={styles.text}>
            <Text style={styles.text1}>Yêu cầu kết bạn</Text>
            <Text style={styles.text2}>Phê duyệt hoặc bỏ qua yêu cầu</Text>
          </View>
        </View>
        {dot > 0 ? <View style={styles.dot}>
          <Text style={{ color: COLOR.PrimaryColor, fontSize: 16 }}>{dot}</Text>
        </View> : <View style={styles.dot}>
          <Text style={{ color: COLOR.PrimaryColor, fontSize: 16 }}>0</Text>
        </View>}
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách bạn bè</Text>
      </View>
      <Friends friends={friends} setFriends={setFriends}/>
      <MODALFRIEND
        reload={reload}
        showModalFriend={showModalFriend}
        setShowModalFriend={setShowModalFriend}
        setDot={setDot}
        setReload={setReload}
      />
    </View>
  )
}

export default FriendScreen

const styles = StyleSheet.create({
  container: {

    height: '100%',
    backgroundColor: 'white',
  },
  reqFriends: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderColor: COLOR.PrimaryColor,
    marginTop: 5
  },
  iconFriend: {
    height: 44,
    width: 44,
    borderWidth: 1,
    borderColor: COLOR.PrimaryColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginStart: 10
  },
  text1: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: "normal",
    color: 'black'
  },
  text2: {
    fontSize: 13,
    fontWeight: '300',
    fontStyle: "normal",
    color: 'black'
  },
  header: {

  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 19,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10
  }
  ,
  dot: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 35,
    start: 38,
    backgroundColor: COLOR.primary300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  }
})