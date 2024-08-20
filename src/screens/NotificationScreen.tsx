import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PushNotification, { Importance } from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

import { useSendNotification } from '../constant/notify'
import { socket } from '../http/SocketHandle'
import { COLOR } from '../constant/color'
import REQFriend from '../component/notificationes/RequestFriend'
import MODALFRIEND from '../component/friend-request-accept-modal/Body'
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
import ItemLikeComment from '../component/notificationes/ItemLikeComment';
import { RootState } from '../component/store/store';
const NotificationScreen = () => {
  const [showModalFriend, setShowModalFriend] = useState(false);
  const [showModalBirthday, setShowModalBirthday] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dot, setDot] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const user = useSelector((state : RootState)=>state.user.value)
  
  const [groupedNotifications, setGroupedNotifications] = useState<any>([]);
  // const userId = user.id;
  const { sendNCommentPost } = useSendNotification();
  const [push, setPush] = useState(false);
  useEffect(() => {
    fetchData();
    socket.on(`notification-${user?.id}`, (data) => {
      const exists = notifications.some(notification => notification.id == data.id);
      if (!exists) {
        // showLocalNotification(data);
        addNotification(data);
      }
    });
    return () => {
      socket.off(`notification-${user?.id}`);
    };
  }, [user.id]);
  

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
    }
  }, [notifications || push]);

  const addNotification = async (newNotification) => {
    try {
      const oldNotifications = await AsyncStorage.getItem(`notifications${user?.id}`);
      const parsedOldNotifications = oldNotifications ? JSON.parse(oldNotifications) : [];
      const updatedNotifications = Array.isArray(newNotification)
        ? [...parsedOldNotifications, ...newNotification]
        : [...parsedOldNotifications, newNotification];

      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(`notifications${user?.id}`, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const fetchData = async () => {
    try {

      const oldNotifications = await AsyncStorage.getItem(`notifications-${user?.id}`);
      if (oldNotifications) {
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
  }, []);

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
        return <ItemBirth notification={item} setShowModalBirthday={setShowModalBirthday} />;
      case 8:
        return <ItemFriendAccept notification={item} />;
      case 9:
        return <ItemNewPostTag notification={item} />;
      case 10:
        return <ItemLikeComment notification={item} />;
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
      <View style={{ flexDirection: 'column' , marginStart:4 , marginBottom: 240}}>
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
        showModalFriend={showModalFriend}
        setShowModalFriend={setShowModalFriend}
        setDot={setDot}
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

