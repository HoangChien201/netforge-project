import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Modal, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';
import { cancelRequest, deleteFriend, sendRequest, getRequest } from '../../http/QuyetHTTP';
import { useSendNotification } from '../../constant/notify';
import { NetworkRootStackEnum, NetworkStackNavigationProp } from '../stack/NetworkRootStackParams';
import { NavigateToMessage } from '../message/NavigateToMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProfileHeaderProps {
  fullname: any;
  userId: any;
  loggedInUserId: any;
  relationship: any;
  avatar:any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (
  {fullname, 
    userId, 
    loggedInUserId, 
    relationship, 
    avatar,
  }) => {
  const navigation:NetworkStackNavigationProp = useNavigation();
  const [cancelAdd, setCancelAdd] = useState(false);
  const [textReqState, setTextReqState] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [cancelF, setCancelF] = useState('Hủy kết bạn');
  const [show, setShow] = useState(false);
  const [type, setType] = useState(false);
  const [change, setChange]= useState(0)
  const { sendNRequestFriend } = useSendNotification();
  const user = useSelector((state : RootState)=>state.user.value)
  const [wait, setWait] = useState(true);
  // const [check,setCheck]=useState(false)
  useEffect(() => {
    checkFiend();
    //getWaitAcept();
  }, [show || change])
  useEffect(() => {
    checkFiend();
    setChange(0);
  }, [])
  useFocusEffect(
    React.useCallback(() => {
      checkFiend;
    }, [change])
  );

  // const getWaitAcept = async () => {
  //   try {
  //     const result = await getRequest();
  //     console.log(result);
  //     const found = result.some(item => item.user.id === loggedInUserId);
  //     if (found) {
  //       setWait(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleToEditProfile = () => {
    navigation.navigate('EditProfileScreen' as never);
  }
  const handleToFriend = () => {
    navigation.navigate('Friends' as never);
  }

  const handleToCreateStory = () => {
    navigation.navigate(NetworkRootStackEnum.CreateStoris);
  }

  const sendRequestFriend = async (id: number, status: number) => {
    if (cancelAdd) {
      ToastAndroid.show("Không thể gửi kết bạn ngay sau khi xóa! thử lại sau", ToastAndroid.LONG);
    } else {
      //setDisabledButtons(true);
      try {
        const result = await sendRequest(id, status);

        if (result) {
          setTextReqState(true);
          handleSendNotify(id);
          setChange(1);
          checkFiend();
          setShow(false)
        }
      } catch (error) {
        setDisabledButtons(false);
      }
    }
  }
  const handleSendNotify = (id: any) => {
    const data = {
      receiver: id,
    };
    sendNRequestFriend(data)
  };

  const showModal = async () => {
    setShow(true);
  };


  const deleteF = async (id: number) => {
    const user1 = Number(user?.id);
    const user2 = Number(id);
    try {
      const result = await deleteFriend(user1, user2);
      if (result) {
        setShow(false);
        setCancelF('Đã hủy')
        setType(true);
        setChange(2);
        setTextReqState(false);
        setCancelAdd(true);
        const timer = setTimeout(() => {
          setCancelAdd(false);
        }, 60 * 1000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.log('Lỗi khi xóa bạn: ', error);
    }
  };
  const cancelReq = async (friendId: number) => {
    try {
      const result = await cancelRequest(friendId);
      if (result) {
        setChange(3);
        setShow(false)
        setTextReqState(false)
      }
    } catch (error) {
      console.log(error);

    }
  }

  const checkReqOrAccept = () => {
    return (
      <View>
        <View style={styles.typeFriend}>
          <View style={styles.TextType}>
            <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Chấp nhận</Text>
          </View>
          <TouchableOpacity style={styles.btnCancel}
            onPress={() => { cancelReq(userId) }}
          >
            <Icon name="person-remove" size={24} color={COLOR.PrimaryColor} style={{ marginRight: 10 }} />
            <Text style={{ color: COLOR.PrimaryColor, fontSize: 18, fontWeight: '700' }}>Hủy bỏ</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnSendMessage}>
          <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
    )
  }
  function ButtonMessagePressHandle() {
    NavigateToMessage({
      fullname,
      avatar,
      id:userId
    },navigation)
  }
  const sendF =(userId:any)=>{
    if(!textReqState){
      sendRequestFriend(userId,1);
    }else{
      setShow(true);
    }

  }
  const checkFiend = () => {
    if (change == 3 || change == 2 || relationship == null || relationship?.status == null ) {
      return (
        <View>
          <TouchableOpacity style={styles.btnAddFriend}
            onPress={() => { sendF(userId) }}
            // disabled={textReqState == true || disabledButtons}
          >
            <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{textReqState == true ? 'Đã gửi lời mời' : 'Thêm bạn bè'}</Text>
          </TouchableOpacity>
          {/* {textReqState == true ? 'Đã gửi lời mời' : 'Gửi lời mời'} */}
            <TouchableOpacity style={styles.btnSendMessage} onPress={ButtonMessagePressHandle}>
              <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
            </TouchableOpacity>

        </View>
      )

    } else if (change ==1 || relationship.status == 1) {
      return (
        <View>
          <View style={styles.typeFriend}>
            <TouchableOpacity style={styles.TextType}
              onPress={() => showModal()}
            >
              <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Đã gửi lời mời</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnCancel}
              onPress={() => { cancelReq(userId) }}
            >
              <Icon name="person-remove" size={24} color={COLOR.PrimaryColor} style={{ marginRight: 10 }} />
              <Text style={{ color: COLOR.PrimaryColor, fontSize: 18, fontWeight: '700' }}>Hủy bỏ</Text>
            </TouchableOpacity> */}
          </View>
            <TouchableOpacity style={styles.btnSendMessage} onPress={ButtonMessagePressHandle}>
              <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
            </TouchableOpacity>

          
        </View>
      )
    }
    else if (relationship.status == 2) {
      return (
        <View>
          <View style={styles.typeFriend}>
            <TouchableOpacity style={styles.TextType} onPress={() => showModal()}>
              <FontAwesome5 name="user-check" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Bạn bè</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnCancel}
              onPress={() => openDelete()}
            >
              <Icon name="person-remove" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{cancelF}</Text>
            </TouchableOpacity> */}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.btnSendMessage} onPress={ButtonMessagePressHandle}>
              <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={[styles.btnToEdit, { width: '35%', marginLeft: 5 }]} onPress={handleToFriend}>
              <FontAwesome5 name="user-friends" size={18} color="#000" style={{ marginRight: 5 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Bạn bè</Text>
            </TouchableOpacity> */}
          </View>

        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtName}>{fullname}</Text>
      {userId == loggedInUserId ? ( // Nếu là trang cá nhân của người đăng nhập
        <>
          <TouchableOpacity style={styles.btnToStory} onPress={handleToCreateStory}>
            <Icon name="add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Thêm vào tin</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.btnToEdit, { width: '64%' }]} onPress={handleToEditProfile}>
              <Icon name="edit" size={20} color="#000" style={{ marginRight: 5 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnToEdit, { width: '35%', marginLeft: 5 }]} onPress={handleToFriend}>
              <FontAwesome5 name="user-friends" size={18} color="#000" style={{ marginRight: 5 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Bạn bè</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : ( // Nếu không phải là trang cá nhân của người đăng nhập
        
        checkFiend()
      )}

      <Modal
        visible={show}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShow(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setShow(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.iconClose} onPress={() => setShow(false)}>
              <AntDesign name="minus" size={30} color="#000" />
            </TouchableOpacity>

            {relationship && relationship.status === 1 && (
              <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', marginTop:10}} 
                onPress={() => { cancelReq(userId) }}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="user-minus" size={20} color="black" />
                </View>
                <Text style={styles.buttonText}>Hủy yêu cầu</Text>
              </TouchableOpacity>
            )}

            {relationship && relationship.status === 2 && (
              <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', marginTop:10}}
                onPress={() => deleteF(userId)}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="user-times" size={20} color="black" />
                </View>
                <Text style={styles.buttonText}>{cancelF}</Text>
              </TouchableOpacity>
            )}
            {textReqState && (
              <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', marginTop:10}}
                onPress={() => cancelReq(userId)}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="user-times" size={20} color="black" />
                </View>
                <Text style={styles.buttonText}>Hủy yêu cầu</Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  txtName: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  btnToStory: {
    borderRadius: 10,
    backgroundColor: COLOR.PrimaryColor,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  btnToEdit: {
    borderRadius: 10,
    backgroundColor: '#C0C0C0',
    height: 40,
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  btnAddFriend: {
    borderRadius: 10,
    backgroundColor: COLOR.PrimaryColor,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  typeFriend: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  btnCancel: {
    borderRadius: 10,
    backgroundColor: '#C0C0C0',
    height: 40,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TextType: {
    borderRadius: 10,
    backgroundColor: COLOR.PrimaryColor,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSendMessage: {
    borderRadius: 10,
    backgroundColor: '#C0C0C0',
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: Dimensions.get('window').height/4.5,
    backgroundColor: 'white',
    paddingHorizontal:20,
    paddingBottom:20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  iconClose: {
    alignItems:'center'
  },
  iconContainer: {
    width:44,
    height:44,
    borderRadius:22,
    backgroundColor:'#ddd',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ProfileHeader;
