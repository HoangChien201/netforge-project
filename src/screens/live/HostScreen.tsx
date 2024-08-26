import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, {
  HOST_DEFAULT_CONFIG, ZegoMenuBarButtonName
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import { useNavigation, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import KeyCenter from './KeyCenter';
import { createNewPost } from '../../http/QuyetHTTP';
import { deletePost } from '../../http/userHttp/getpost';
import { RootState } from '../../component/store/store';
import AlertCallError from '../../component/message/AlertCallError';
import { onLiveStreamLogout, onUserLogin, onUserLogout } from '../call-video/Utils';

//import { ZegoToastType } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn/lib/typescript/services/defines';
//import * as ZIM from 'zego-zim-react-native';

type HostScreenRouteProp = RouteProp<{
  Host: {
    userID: string;
    userName: string;
    liveID: string;
  };
}, 'Host'>;

type Props = {
  route: HostScreenRouteProp;
};

const { height } = Dimensions.get('window');

const HostScreen: React.FC<Props> = ({ route }) => {
  const user = useSelector((state: RootState) => state.user.value)

  const [alertVisible, setAlertVisible] = useState(false);

  const [idPost, setIdPost] = useState();
  const prebuiltRef = useRef<any>();
  const { userID, userName, liveID } = route.params;
  const navigation = useNavigation()

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  }, []);


  const handleLeaveLiveStreaming = () => {
    handleDeletePost();
    onUserLogout()

    // await AsyncStorage.removeItem("liveID")
  };
  const foregroundBuilder = ({ userInfo }: { userInfo: any }) => (
    <View style={styles.foreground}>
      <Image
        style={styles.avatar}
        source={{ uri: userInfo.avatarUrl }}
      />
      <Text style={styles.userName}>{userInfo.userName}</Text>
    </View>
  );
  const handleDeletePost = async () => {
    try {
      await deletePost(idPost);
      navigation.navigate('CreatePostScreen' as never);
    } catch (error) {
      console.error(error);
    }
  };
  const createLivePost = async () => {
    // console.log("live nè")
    try {
      const type = 3;
      const content = liveID
      const permission = 1;
      const newPost = await createNewPost({ type, permission, content });
      await AsyncStorage.setItem("liveID", content);

      setIdPost(newPost.post)
      const value = await AsyncStorage.getItem("liveID");
    } catch (error) {
      console.error('Error live post: ', error);
    }
  };

  if (!userID) {
    setAlertVisible(true)
  }

  return (
    <View style={styles.container}>
      {
        userID &&
        <>
          <Text style={styles.liveIDText}>Live ID: {liveID}</Text>
          <ZegoUIKitPrebuiltLiveStreaming
            ref={prebuiltRef}
            appID={KeyCenter.appID}
            appSign={KeyCenter.appSign}
            userID={userID}
            userName={user?.fullname}
            liveID={liveID}
            config={{
              ...HOST_DEFAULT_CONFIG,
              foregroundBuilder: foregroundBuilder,
              textStyle: {
                color: 'blue',
              },
              topMenuBarConfig: {
                buttons: [
                  // ZegoMenuBarButtonName.minimizingButton,
                  ZegoMenuBarButtonName.leaveButton,

                ],
                styles: {
                  color: 'red',
                },
              },
              confirmDialogInfo: {
                title: "Xác nhận kết thúc?",
                message: "Bạn muốn kết thúc phát trực tiếp?",
                cancelButtonName: "Hủy",
                confirmButtonName: "Đồng ý"
              },
              onLiveStreamingEnded: handleLeaveLiveStreaming,
              onLeaveLiveStreaming: handleLeaveLiveStreaming,
              //onStartLiveButtonPressed: createLivePost,
              onStartLiveButtonPressed: async () => {
                await createLivePost();
              },
              //onStartLiveStreaming: createLivePost,
              // onWindowMinimized: () => {
              //     navigation.navigate('LiveWithZego' as never);
              // },
              // onWindowMaximized: () => {
              //     navigation.navigate('HostScreen', { userID, userName, liveID });
              // },
              translationText: {
                startLiveStreamingButton: 'Bắt đầu',
                noHostOnline: "Hiện không có phiên live này!",
              },
              audioVideoViewConfig: {
                showSoundWavesInAudioMode: true,
              },
              durationConfig: {
                isVisible: true,
                onDurationUpdate: (duration: number) => {
                  if (duration === 10 * 60) {
                    prebuiltRef.current.leave();
                  }
                }
              }
            }}
          // plugins={[ZIM]}
          />
        </>
      }
      {
        alertVisible &&
        <AlertCallError
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          title="Thông báo"
          message="Kết nối không ổn định. Vui lòng đợi !"
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  btnContainer: {
    backgroundColor: '#07A3B2'
  },
  liveIDText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    zIndex: 1,
    position: 'absolute',
    top: height / 11,
    left: 20
  },
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red'
  },
  ctrlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    height: 50,
    zIndex: 2,
    color: 'blue'
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute'
  }
  , text: {
    color: 'blue'
  },
  foreground: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HostScreen;