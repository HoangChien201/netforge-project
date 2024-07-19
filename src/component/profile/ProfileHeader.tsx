import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';
import { useMyContext } from '../navigation/UserContext';
import { cancelRequest, deleteFriend, sendRequest, getRequest } from '../../http/QuyetHTTP';
import DeleteFriend from '../../screens/profile/friendScreen/DeleteFriend'
import uuid from 'react-native-uuid';
import { socket } from '../../http/SocketHandle';
import { useSendNotification } from '../../constant/notify';

interface ProfileHeaderProps {
  fullname: string;
  userId: number;
  loggedInUserId: number;
  relationship: any;

  // onAddStory: () => void;
  // onEditProfile: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ fullname, userId, loggedInUserId, relationship }) => {
  const navigation = useNavigation();
  const [cancelAdd, setCancelAdd] = useState(false);
  const [textReqState, setTextReqState] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [cancelF, setCancelF] = useState('Hủy kết bạn');
  const [show, setShow] = useState(false);
  const [type, setType] = useState(false);
  const [change, setChange] = useState(false);
  const { sendNRequestFriend } = useSendNotification();
  const { user } = useMyContext();
  const [wait, setWait] = useState(true);

  useEffect(() => {
    checkFiend();
    //getWaitAcept();
  }, [show])
  
  const getWaitAcept = async () => {
    try {
      const result = await getRequest();
      console.log(result);
      const found = result.some(item => item.user.id === loggedInUserId);
      if (found) {
        setWait(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleToEditProfile = () => {
    navigation.navigate('EditProfileScreen' as never);
  }
  const handleToFriend = () =>  {
      navigation.navigate('Friends' as never);
    }

  const handleToCreateStory = () => {
    //navigation.navigate('LiveStack' as never);
  }

  const sendRequestFriend = async (id: number, status: number) => {
    if (cancelAdd) {
      ToastAndroid.show("Không thể gửi kết bạn ngay sau khi xóa! thử lại sau", ToastAndroid.LONG);
    } else {
      setDisabledButtons(true);
      try {
        const result = await sendRequest(id, status);

        if (result) {
          setTextReqState(true);
          handleSendNotify(id);
          setChange(prevChange => !prevChange);
          checkFiend();
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

  const openDelete = async () => {
    setShow(true);
  };

  const deleteF = async (id: number) => {
    
    const user1 = Number(user.id);
    const user2 = Number(id); 
    
    try {
      const result = await deleteFriend(user1, user2);
      if (result) {
        setShow(false);
        setCancelF('Đã hủy')
        setType(true);
        setChange(true);
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
        setChange(prevChange => !prevChange);
        console.log('deleted');

      }
    } catch (error) {
      console.log(error);
      console.log(friendId);

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

  const checkFiend = () => {
    if (relationship === null || relationship?.status == null || change) {
      return (
        <View>
          <TouchableOpacity style={styles.btnAddFriend}
            onPress={() => { sendRequestFriend(userId, 1) }}
            disabled={textReqState == true || disabledButtons}
          >
            <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{textReqState == true ? 'Đã gửi lời mời' : 'Gửi lời mời'}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.btnSendMessage}>
              <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnToEdit, { width: '35%', marginLeft:5}]} onPress={handleToFriend}>
              <FontAwesome5 name="user-friends" size={18} color="#000" style={{ marginRight: 5 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Bạn bè</Text>
            </TouchableOpacity>
          </View>
        </View>
      )

    } else if (relationship.status == 1) {
      return (
        <View>
          <View style={styles.typeFriend}>
            <TouchableOpacity style={styles.TextType}
            onPress={() => {
              navigation.navigate('NotificationScreen')
            }}
            >
              <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Chờ phê duyệt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancel}
              onPress={() => { cancelReq(userId) }}
            >
              <Icon name="person-remove" size={24} color={COLOR.PrimaryColor} style={{ marginRight: 10 }} />
              <Text style={{ color: COLOR.PrimaryColor, fontSize: 18, fontWeight: '700' }}>Hủy bỏ</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.btnSendMessage}>
              <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnToEdit, { width: '35%', marginLeft:5}]} onPress={handleToFriend}>
              <FontAwesome5 name="user-friends" size={18} color="#000" style={{ marginRight: 5 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Bạn bè</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else if (relationship.status == 2) {
      return (
        <View>
          <View style={styles.typeFriend}>
            <View style={styles.TextType}>
              <Icon name="people" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Bạn bè</Text>
            </View>
            <TouchableOpacity style={styles.btnCancel}
              onPress={() => openDelete()}
            >
              <Icon name="person-remove" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{cancelF}</Text>
            </TouchableOpacity>
          </View>
            
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.btnSendMessage}>
              <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnToEdit, { width: '35%', marginLeft:5}]} onPress={handleToFriend}>
              <FontAwesome5 name="user-friends" size={18} color="#000" style={{ marginRight: 5 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Bạn bè</Text>
            </TouchableOpacity>
          </View>

        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtName}>{fullname}</Text>
      {userId === loggedInUserId ? ( // Nếu là trang cá nhân của người đăng nhập
        <>
          <TouchableOpacity style={styles.btnToStory} onPress={handleToCreateStory}>
            <Icon name="add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Thêm vào tin</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={[styles.btnToEdit, { width: '64%'}]} onPress={handleToEditProfile}>
              <Icon name="edit" size={20} color="#000" style={{ marginRight: 5 }} />
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnToEdit, { width: '35%', marginLeft:5}]} onPress={handleToFriend}>
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
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Xác nhận</Text>
            <Text style={styles.message}>Bạn có chắc chắn muốn xóa bạn bè?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setShow(false)}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => deleteF(userId)}>
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    width: '59%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSendMessage: {
    borderRadius: 10,
    backgroundColor: '#C0C0C0',
    height: 40,
    width: '64%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
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
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileHeader;
