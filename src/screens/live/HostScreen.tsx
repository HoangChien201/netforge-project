import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, {
  HOST_DEFAULT_CONFIG, ZegoMenuBarButtonName
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import KeyCenter from './KeyCenter';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { useMyContext } from '../../component/navigation/UserContext';

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

const HostScreen: React.FC<Props> = ({ route }) => {
  const prebuiltRef = useRef<any>();
  const { userID, userName, liveID } = route.params;
  //const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigation=useNavigation()
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: {display:'none'}});
  }, []);
  const { user } = useMyContext();

  const handleLeaveLiveStreaming = () => {
    navigation.navigate('LiveWithZego' as never);
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

  return (
    <View style={styles.container}>
      <Text style={styles.liveIDText}>Live ID: {liveID}</Text>
      <ZegoUIKitPrebuiltLiveStreaming
        ref={prebuiltRef}
        appID={KeyCenter.appID}
        appSign={KeyCenter.appSign}
        userID={userID}
        userName={user.fullname}
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
  btnContainer:{
    backgroundColor:'#07A3B2'
  },
  liveIDText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    zIndex:1,
    position:'absolute',
    top:0,
    left:20
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
    color:'blue'
},
ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute'
}
,text: {
    color:'blue'
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
