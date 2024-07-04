import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PushNotification, { Importance } from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';
import uuid from 'react-native-uuid';


import { socket } from '../http/SocketHandle'
import BODYMODAL from '../component/edit-post-modal/Body'
import { COLOR } from '../constant/color'
import REQFriend from '../component/notificationes/RequestFriend'
import MODALFRIEND from '../component/friend-request-accept-modal/Body'
import { useMyContext } from '../component/navigation/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ItemLike from '../component/notificationes/ItemLike'
import ItemComment from '../component/notificationes/ItemComment'
import ItemFriend from '../component/notificationes/ItemFriend'
import ItemMessage from '../component/notificationes/ItemMessage';
import ItemShare from '../component/notificationes/ItemShare';
import ItemNewPost from '../component/notificationes/ItemNewPost';
const NotificationScreen = () => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalFriend, setShowModalFriend] = useState(false);
  const [showModalHistories, setShowModalHistories] = useState(false);
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reload, setReload] = useState(false);
  const [dot, setDot] = useState(Number);
  const [notifications, setNotifications] = useState([]);
  const { user } = useMyContext();
  const id = user.id;
  const ShowModalEdit = () => {
    setShowModalEdit(true);
  }
  const ShowModalFriend = () => {
    setShowModalFriend(true);
  }
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification);
      },
      requestPermissions: false,
    });
    const fetchData = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };
    fetchData();
    createChannelNotify();
    requestNotificationPermission();
  }, []);
  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "Notification Permission",
          message: "This app needs access to show notifications.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the notifications");
      } else {
        console.log("Notification permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const createChannelNotify = async () => {
    PushNotification.createChannel(
      {
        channelId: "channel-id-1",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications",
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }

  useEffect(() => {
    console.log('Socket connected:', socket.connected);

    socket.on(`notification-${id}`, (data) => {
      console.log('Notification received:', data);

      // Check if the notification already exists in notifications
      const exists = notifications.some(notification => notification.id === data.id);

      // Add notification only if it doesn't already exist
      if (!exists) {
        addNotification(data);
        showLocal(data);
      }
    });

    return () => {
      socket.off(`notification-${id}`);
    };
  }, [id, notifications]);  // Include notifications in dependencies to ensure up-to-date check

  const handleSendReaction = () => {
    const data = {
      id: uuid.v4(), // id Notify
      // import uuid from 'react-native-uuid';
      type: 6, // 1 thả cảm xúc - 2 comment - 3 add friend - 4 tạo mới bài viết + history - 5 share bài viết - 6 nhắn tin
      postId: "80", // sử dụng cho đăng + thả emoji bài viết/story + share
      commentId: "80", // sử dụng cho like comment - trả lời comment
      messId: "80",// sử dụng cho nhắn tin
      title: `${user.fullname} gửi một tin nhắn`,
      // gửi tin nhắn mới || trả lời bình luận ${content}||chia sẻ bài viết ${content}
      // bày tỏ cảm xúc với bài viết ${content} || bày tỏ cảm xúc với comment${content}
      // ${content} thuộc về người nhận thông báo || nếu không lấy được bỏ qua
      //----------------------------------------------
      body: "ủa là sao bạn?", // nội dung hiển thị trên thông báo / tùy chỉnh (thuộc về người gửi) 
      userInfo: {
        receiver: 8, // id người nhận
        sender: `${user.id}`, // id người đăng nhập
        fullname: `${user.fullname}`, // tên người đăng nhập
        avatar: `${user.avatar}`, // ảnh người đăng nhập
        mutiple: false // true = gửi cho tất cả bạn bè (dùng trong tạo bài viết + history)
      },
      reaction: {
        type: 2 // 1 thích - 2 ha ha - 3 thương thương - 4 yêu thích - 5 tức giận
      },
      timestamp: new Date().toISOString()
    };

    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const addNotification = async (newNotification) => {
    try {
      const updatedNotifications = [...notifications, newNotification];
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      console.log('Notification added and saved:', newNotification);
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const showLocal = (notification: { notification?: any; body?: any; title?: any; }) => {
    PushNotification.localNotification({
      channelId: "channel-id-1",
      autoCancel: true,
      bigText: notification.body || "Không rõ nội dung",
      title: notification.title || " Thông báo mới",
      message: notification.body || "Không rõ nội dung",
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: "default",
    });

  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 1:
        return <ItemLike notification={item} />;
      case 2:
        return <ItemComment notification={item} />;
      case 3:
        return <ItemFriend notification={item} />;
      case 4:
        return <ItemNewPost notification={item} />;
      case 5:
        return <ItemShare notification={item} />;
      case 6:
        return <ItemMessage notification={item} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
        <TouchableOpacity style={{ height: 20, width: 60, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}
          onPress={ShowModalEdit}>
          <Text>edit Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 20, width: 60, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}
          onPress={handleSendReaction}
        >
          <Text>send NO</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={ShowModalFriend}>
        <REQFriend />
        {dot > 0 ? <View style={styles.dot}>
          <Text style={{ color: COLOR.PrimaryColor1, fontSize: 16 }}>{dot}</Text>
        </View> : null}
      </TouchableOpacity>
      <View style={{ flexDirection: 'column' }}>
        {notifications ?
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.timestamp}
            renderItem={renderItem}
            style={styles.list}
          />
          :
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.emptyText}>Không có thông báo!</Text>
          </View>
        }

      </View>
      <BODYMODAL
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
      />
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

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:COLOR.primary300,
    flex:1
  },
  header: {
    height: 40,
    backgroundColor: COLOR.PrimaryColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },
  headerText: {
    marginHorizontal: 16,
    fontWeight: '500',
    fontSize: 24,
    color: COLOR.primary100

  },
  dot: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 31,
    start: 35,
    backgroundColor: COLOR.primary300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  emptyText: {
    marginHorizontal: 16,
    fontWeight: '500',
    fontSize: 16,
    color: COLOR.PrimaryColor

  },
  list:{
    marginTop:5,
    backgroundColor:COLOR.primary300,
  }
})
