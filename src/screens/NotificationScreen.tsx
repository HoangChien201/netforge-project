import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PushNotification, { Importance } from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';
import uuid from 'react-native-uuid';

import { useSendNotification } from '../constant/notify'
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
import ItemBirth from '../component/notificationes/ItemBirth';
import ItemFriendAccept from '../component/notificationes/ItemFriendAccept';
import ItemNewPostTag from '../component/notificationes/ItemNewPostTag';
import BirtdayButtonComponent from '../component/notificationes/BirtdayButtonComponent';
import BirthDayScreen from './BirthdayScreen';
import { RootState } from '../component/store/store';
import { useSelector } from 'react-redux';
const NotificationScreen = () => {

  const [showModalFriend, setShowModalFriend] = useState(false);
  const [showModalBirthday, setShowModalBirthday] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
  const [dot, setDot] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state : RootState)=>state.user.user)
  const [groupedNotifications, setGroupedNotifications] = useState<any>([]);
  // const userId = user.id;
  const { sendNCommentPost } = useSendNotification();

  useEffect(() => {
    fetchData();
    socket.on(`notification-${user?.data.id}`, (data) => {
      console.log('Notification received:', data);
      const exists = notifications.some(notification => notification.id == data.id);
      if (!exists) {
        // showLocalNotification(data);
        addNotification(data);
      }
    });
    console.log('render');
    return () => {
      socket.off(`notification-${user?.data.id}`);
    };
    

  }, [user?.data.id]);  // Include notifications in dependencies to ensure up-to-date check

  useEffect(() => {
    if (notifications.length > 0) {
      const grouped = notifications.reduce((acc, notification) => {
        const { type, postId, commentId, messId, friendId } = notification;
        const id = postId || commentId || friendId || messId;
        let foundIndex = acc.findIndex(item => item.id === id && item.type === type);
        if (foundIndex === -1) {
          acc.unshift({
            id: id,
            type: type,
            data: [notification],
            idv4: uuid.v4()
          });
        } else {
          const updatedItem = {
            ...acc[foundIndex],
            data: [notification, ...acc[foundIndex].data]
          };
          acc.splice(foundIndex, 1); // Remove the old item
          acc.unshift(updatedItem);
        }
        return acc;

      }, []);
      setGroupedNotifications(grouped);
      console.log('dulieumoi:' + JSON.stringify(grouped));

    }
  }, [notifications]);

  const addNotification = async (newNotification) => {
    try {
      const oldNotifications = await AsyncStorage.getItem(`notifications${user?.data.id}`);
      const parsedOldNotifications = oldNotifications ? JSON.parse(oldNotifications) : [];
      const updatedNotifications = Array.isArray(newNotification)
        ? [...parsedOldNotifications, ...newNotification]
        : [...parsedOldNotifications, newNotification];

      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(`notifications${user?.data.id}`, JSON.stringify(updatedNotifications));
      console.log('Notification added and saved:', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const fetchData = async () => {
    try {
      const oldNotifications = await AsyncStorage.getItem(`notifications${user?.data.id}`);
      if (oldNotifications) {
        console.log('AsyncStorage:', oldNotifications);
        const parsedNotifications = JSON.parse(oldNotifications);
        if (parsedNotifications && Array.isArray(parsedNotifications)) {
          setNotifications(parsedNotifications);
        }
        setRefreshing(false);
      }

    } catch (error) {
      console.error('AsyncStorage:', error);
    }
  };


  const showLocalNotification = (notification) => {
    console.log('show');
    
    PushNotification.localNotification({
      channelId: "channel-id-1",
      autoCancel: true,
      bigText: notification.body || "",
      title: notification.title || "Thông báo mới",
      message: notification.body || "",
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: "default",
    });
  };
  const loadData = useCallback(() => {
    setRefreshing(true);
    fetchData();
    // Giả lập thời gian tải dữ liệu từ server
    // setTimeout(() => {
      
    // }, 2000);
  }, [data]);

  const loadFlatList = () => {
    if (groupedNotifications.length > 0) {
      return <FlatList
        data={groupedNotifications}
        keyExtractor={(item) => item.idv4}
        renderItem={renderItem}
        style={styles.list}
      />
    } else {
      return <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có thông báo!</Text>
      </View>
    }
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
      case 7:
        return <ItemBirth notification={item} />;
      case 8:
        return <ItemFriendAccept notification={item} />;
      case 9:
        return <ItemNewPostTag notification={item} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={handleSendNotification}
        >
          <Text>Send NO</Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity onPress={() => setShowModalFriend(true)}>
        <REQFriend />
        {dot > 0 && (
          <View style={styles.dot}>
            <Text style={{ color: 'red', fontSize: 16 }}>{dot}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* **** button move birtday screen ***  */}
      <BirtdayButtonComponent setShowModalBirthday={setShowModalBirthday} />
      {/* **** button move birtday screen **** */}
      <View style={styles.line}></View>
      <View style={{ flexDirection: 'column' }}>
        <FlatList
          data={groupedNotifications}
          keyExtractor={(item) => item.idv4}
          renderItem={renderItem}
          style={styles.list}
          refreshing={refreshing}
          onRefresh={loadData}
        />
        {groupedNotifications?.length > 0 ?
          null
          :
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.emptyText}>Không có thông báo</Text>
          </View>
        }
      </View>

      <MODALFRIEND
        reload={reload}
        showModalFriend={showModalFriend}
        setShowModalFriend={setShowModalFriend}
        setDot={setDot}
        setReload={setReload}
      />
      <BirthDayScreen visible={showModalBirthday} setVisible={setShowModalBirthday} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary300,
    flex: 1
  },
  header: {
    height: 55,
    // backgroundColor: COLOR.PrimaryColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },
  headerText: {
    marginHorizontal: 16,
    fontWeight: '700',
    fontSize: 24,
    color: COLOR.PrimaryColor

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
  list: {
    marginTop: 5,
    backgroundColor: COLOR.primary300,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#d4d0d4',
    marginVertical: 5
  }
})

const data = [
  {
    id: 1,
    type: 2,
    postId: 80,
    //commentId: 81,
    //messId: 82,
    //friendId,
    title: "name bình luận bài viết",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1720027441/wowcr2pkeuwxizwtqtx7.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:24:02.561Z"
  },
  {
    id: 2,
    type: 2,
    postId: 80,
    commentId: 82,
    //messId
    title: "name1 bình luận bài viết",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name1",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:30:02.561Z"
  },
  {
    id: 3,
    type: 2,
    postId: 80,
    commentId: 85,
    title: "name1 bình luận bài viết",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name1",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:30:02.561Z"
  },
  {
    id: 4,
    type: 2,
    postId: 80,
    commentId: 89,
    title: "name1 bình luận bài viết",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name1",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:30:02.561Z"
  },
  {
    id: 5,
    type: 2,
    postId: 80,
    commentId: 99,
    title: "name1 bình luận bài viết",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name1",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T16:30:02.561Z"
  },
  {
    id: 6,
    type: 2,
    postId: 80,
    commentId: 100,
    title: "name1 bình luận bài viết",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name1",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T16:30:02.561Z"
  }, {
    id: 7,
    type: 2,
    postId: 81,
    commentId: 70,
    title: "name3 bình luận bài viết khác",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name3",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1719339803/jm7pruogzeprd7d41gwj.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 8,
    type: 2,
    postId: 81,
    commentId: 83,
    title: "name3 bình luận bài viết khác",
    body: "ủa là sao bạn?",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "name3",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 10,
    type: 1,
    postId: 81,
    title: "like đã bày tỏ cảm xúc post",
    body: "bày tỏ cảm xúc 1",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 101,
    type: 1,
    postId: 81,
    title: "like đã bày tỏ cảm xúc post",
    body: "bày tỏ cảm xúc 2",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 1011,
    type: 1,
    commentId: 83,
    postId1: 81,
    title: "like đã bày tỏ cảm xúc comment",
    body: "bày tỏ cảm xúc 2",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 11,
    type: 3,
    friendId: 8,
    title: "đã gửi lời mời kết bạn",
    body: "",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 12,
    type: 4,
    postId: 8,
    title: "tạo bài viết mới",
    body: "đây là body",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 13,
    type: 5,
    postId: 8,
    title: "share bài viết",
    body: "",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 13,
    type: 5,
    postId: 8,
    title: "share bài viết ",
    body: " share 2",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 13,
    type: 6,
    messId: 8,
    title: "gửi một tin nhắn",
    body: "tin nhắn thứ 1",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
  {
    id: 14,
    type: 6,
    messId: 8,
    title: "gửi một tin nhắn",
    body: "tin nhắn thứ 2 tôi đang cố làm cho nó dài thêm thật dài dài vãi cả l",
    userInfo: {
      receiver: 8,
      sender: 8,
      fullname: "like",
      avatar: "http://res.cloudinary.com/delivery-food/image/upload/v1718983274/cwow3twij10mb5r4nqzt.jpg",
      mutiple: false
    },
    reaction: {
      type: 2
    },
    timestamp: "2024-07-03T17:35:02.561Z"
  },
];
type daaata = {
  id: number, // import uuid from 'react-native-uuid';
  type: Number, // 1 thả cảm xúc - 2 comment - 3 add friend - 4 tạo mới bài viết + history - 5 share bài viết - 6 nhắn tin
  postId: number, // sử dụng cho đăng + thả emoji bài viết/story + share
  postId1: number, // chỉ sử dụng cho thả cảm xúc bình luận
  commentId: number, // sử dụng cho like comment - trả lời comment
  friendId: number, // sử dụng cho kết bạn
  messId: number,// sử dụng cho nhắn tin
  title: string,
  // ${user.fullname} đã gửi tin nhắn mới 
  // ${user.fullname} đã trả lời bình luận 
  // ${user.fullname} đã chia sẻ bài viết
  // ${user.fullname} bày tỏ cảm xúc với bài viết 
  // ${user.fullname} đã bày tỏ cảm xúc với bình luận
  body: string, // nội dung hiển thị trên thông báo 
  // content || message || comment 
  userInfo: {
    receiver: number, // id người nhận
    sender: number, // id người đăng nhập
    fullname: string, // tên người đăng nhập
    avatar: string, // link ảnh người đăng nhập
    mutiple: false // true = gửi cho tất cả bạn bè (dùng trong tạo bài viết + history)
  },
  reaction: {
    type: number
    // 1 thích - 2 ha ha - 3 thương thương - 4 yêu thích - 5 tức giận
  },
}