import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formattedDate } from '../../format/FormatDate';
import { useNavigation } from '@react-navigation/native';
import { name } from '@stream-io/video-react-native-sdk';
import { COLOR } from '../../constant/color';

interface ProfileHeaderProps {
  fullname: string;
  userId: number;
  loggedInUserId: number;
  // onAddStory: () => void;
  // onEditProfile: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ fullname, userId, loggedInUserId}) => {
  const navigation = useNavigation();
  //const isOwnProfile = userId === loggedInUserId; // Kiểm tra xem đây có phải là trang cá nhân của người đang đăng nhập hay không

  // if (userId === loggedInUserId) {
  //   navigation.navigate('ProfileScreen');
  // }
  const handleToEditProfile = () =>  {
    navigation.navigate('EditProfileScreen' as never);
    //navigation.navigate('StoryScreen');
  }

  const handleToCreateStory = () => {
    navigation.navigate('LiveStack' as never);
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
        <>
          <TouchableOpacity style={styles.btnAddFriend}>
            <Icon name="person-add" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Thêm bạn bè</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSendMessage}>
            <Icon name="message" size={24} color="#000" style={{ marginRight: 10 }} />
            <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>Nhắn tin</Text>
          </TouchableOpacity>
        </>
      )}
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
});

export default ProfileHeader;
