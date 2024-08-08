import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../../../component/stack/ProfileRootStackParams';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { COLOR } from '../../../constant/color';
import { NavigateToMessage } from '../../../component/message/NavigateToMessage';
import { FriendType } from '../../../component/message/ModalNewMessage';
import BottomDeleteFriend from './BottomDeleteFriend';
import { useSelector } from 'react-redux';
import { RootState } from '../../../component/store/store';
import { getFriends } from '../../../http/QuyetHTTP';
import SkelotonFriend from '../../../component/friend-request-accept-modal/SkelontonFriend';
type Friend = {
  friends: any,
  setFriends: () => void;
}

const Friends: React.FC<Friend> = () => {
  const user = useSelector((state: RootState) => state.user.value)
  const [show, setShow] = useState(false);
  const [user2, setUser2] = useState<number>(0);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [friends, setFriends] = useState<Array<FriendType>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState();
  const getFriendList = async () => {
    try {
      const result = await getFriends(2);
      if (result) {
        setFriends(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendList()
  }, [friends]);
  if (!friends || friends.length === 0) {
    return <View style={{
      alignItems: 'center', justifyContent: 'center',
      marginTop: 10
    }}>
      <SkelotonFriend/>
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

  //navigate to message
  function IconMessageOnPressHandle(user: { fullname: string, avatar: string, id: number }) {
    const { fullname, avatar, id } = user

    NavigateToMessage({
      fullname,
      avatar,
      id: id
    }, navigation)
  }
  //navigate to message
  const showBottomS = (data: any) => {
    setIsVisible(true)
    setData(data)

  }
  return (
    <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          {friends.map((friend: { user: { id: number; avatar: string; fullname: string } }) => (
            <TouchableOpacity key={friend.id.toString()} onPress={() => handleToFriendProfile(friend.user.id)}>
              <View style={styles.itemWA}>
                <View style={styles.user}>
                  {friend.user.avatar ? <Image source={{ uri: friend.user.avatar }} style={styles.avatarne} /> :
                    <View style={{ height: 48, width: 48, borderRadius: 50, borderWidth: 1, borderColor: 'gray', backgroundColor: '#DDDDDD', }} />
                  }
                  <Text style={styles.userName}>{friend.user.fullname}</Text>
                </View>
                <View style={styles.button}>

                  <TouchableOpacity style={styles.buttonAccept} onPress={IconMessageOnPressHandle.bind(this, friend.user)}>
                    <AntDesignIcon name='message1' size={22} color={COLOR.PrimaryColor} />
                  </TouchableOpacity>

                  {/* chú ý */}
                  {/* nếu là bạn của bạn bè thì đổi icon này thành icon add friend, còn xem bb của mình thì kh hiện icon ... 
                nhấn vào dấu ... hiện sự lựa chọn là hủy kb,...
              */}
                  <TouchableOpacity style={styles.buttonAccept}
                    onPress={() => { showBottomS(friend.user) }}>
                    <AntDesignIcon name='ellipsis1' size={22} color={'#000'} />
                  </TouchableOpacity>
                </View>
              </View>

            </TouchableOpacity>
          ))
          }

        </ScrollView >

      {/* <DeleteFriend show={show} setShow={setShow} user2={user2} setFriends={setFriends} /> */}
      <BottomDeleteFriend isVisible={isVisible} setIsVisible={setIsVisible} data={data} setFriends={setFriends} friends={friends} />
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  headerText: {
    marginStart: 10,
    fontWeight: '500',
    fontSize: 18,
    color: 'black'
  },
  itemWA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    // backgroundColor: 'white',
    // borderRadius: 5,
    // shadowColor: 'black',
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // elevation: 5,
    // marginTop: 3,
    // marginBottom: 3,
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
    marginStart: 10
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: 100
  },
  buttonAccept: {
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginStart: 5

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