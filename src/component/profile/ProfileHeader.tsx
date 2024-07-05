import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formattedDate } from '../../format/FormatDate';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../constant/color';
import { useMyContext } from '../navigation/UserContext';
import { deleteFriend, sendRequest } from '../../http/QuyetHTTP';
import DeleteFriend from '../../screens/profile/friendScreen/DeleteFriend'
import uuid from 'react-native-uuid';
import { socket } from '../../http/SocketHandle';

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

  const handleToEditProfile = () =>  {
  const { user } = useMyContext();
  //const isOwnProfile = userId === loggedInUserId; // Kiểm tra xem đây có phải là trang cá nhân của người đang đăng nhập hay không

  // if (userId === loggedInUserId) {
  //   navigation.navigate('ProfileScreen');
  // }
    navigation.navigate('EditProfileScreen' as never);
    //navigation.navigate('StoryScreen');
  }

  const handleToCreateStory = () => {
    navigation.navigate('LiveStack' as never);
  }
  const [cancelAdd, setCancelAdd] = useState(false);
  const [textReqState, setTextReqState] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [cancelF, setCancelF] = useState('Hủy kết bạn');
  const sendRequestFriend = async (id: number, status: number) => {
    if (cancelAdd) {
      ToastAndroid.show("Không thể gửi kết bạn ngay sau khi xóa! thử lại sau", ToastAndroid.LONG);
    } else {
      setDisabledButtons(true);
      try {
        const result = await sendRequest(id, status);
        // console.log('đã gửi lời mời');
        // console.log('id: '+ id + 'status: ' + status);
        if (result) {
          setTextReqState(true);
          handleSendReaction(id);
        }
      } catch (error) {
        setDisabledButtons(false);
      }
    }
  }
  const handleSendReaction = (id:any) => {
    const data = {
      id: uuid.v4(),
      type: 3,
      title: `${user.fullname} đã gửi cho bạn lời mời kết bạn`,
      userInfo: {
        receiver: id,
        sender: `${user.id}`,
        fullname: `${user.fullname}`, 
        avatar: `${user.avatar}`, 
      },
      timestamp: new Date().toISOString()
    };

    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const [show, setShow] = useState(false);
  const [type, setType] = useState(false);
  const openDelete = async () => {
    setShow(true);
  };
  const [change, setChange] = useState(false);
  const deleteF = async (id: number) => {
    const user1 = Number(user.id);
    const user2 = Number(id);
    console.log('click');
    
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
  const checkFiend = () => {
    if (relationship === null || relationship.status == null || change) {
      return (
        <View>
          <TouchableOpacity style={styles.btnAddFriend}
            onPress={() => { sendRequestFriend(userId, 1) }} disabled={textReqState == true || disabledButtons}
          >
            <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{textReqState == true ? 'Đã gửi lời mời' : 'Gửi lời mời'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSendMessage}>
            <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
            <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
          </TouchableOpacity>
        </View>
      )

    } else if (relationship.status == 1) {
      return (
        <View>
          <View style={styles.btnAddFriend}>
            <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Chờ phê duyệt</Text>
          </View>
          <TouchableOpacity style={styles.btnSendMessage}>
            <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
            <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (relationship.status == 2) {
      return (
        <View>
          <TouchableOpacity style={styles.btnAddFriend}
            onPress={() => openDelete()}
          >
            <Icon name="person-remove" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{cancelF}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSendMessage}>
            <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
            <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.btnToEdit} onPress={handleToEditProfile}>
            <Icon name="edit" size={24} color="#000" style={{ marginRight: 10 }} />
            <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
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
    width: '100%',
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
