import React, { useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, {
  AUDIENCE_DEFAULT_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import KeyCenter from './KeyCenter';
import {useNavigation, NavigationProp, RouteProp} from '@react-navigation/native';
import { useMyContext } from '../../component/navigation/UserContext';

type AudienceScreenRouteProp = RouteProp<{
  Audience: {
    userID: string;
    userName: string;
    liveID: string;
  };
}, 'Audience'>;

type RootStackParamList = {
  Home: undefined;
};

type Props = {
  route: AudienceScreenRouteProp;
};

const AudienceScreen: React.FC<Props> = ({route}) => {
  const {userID, userName, liveID} = route.params;
  //const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigation=useNavigation()
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: {display:'none'}});
  }, []);
  const {user} = useMyContext();

  const handleLeaveLiveStreaming = () => {
    navigation.popToTop()
  };


  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={KeyCenter.appID}
        appSign={KeyCenter.appSign}
        userID={userID}
        userName={user.fullname}
        liveID={liveID}
        config={{
          ...AUDIENCE_DEFAULT_CONFIG,
          confirmDialogInfo: {
            title: "Xác nhận rời đi?",
            message: "Bạn muốn rời khỏi phiên phát trực tiếp này?",
            cancelButtonName: "Hủy",
            confirmButtonName: "Đồng ý"
        },
          onLeaveLiveStreaming: handleLeaveLiveStreaming,
          translationText: {
            startLiveStreamingButton: 'Bắt đầu',
            noHostOnline: "Hiện không có phiên live này!",
          },
          audioVideoViewConfig: {
            showSoundWavesInAudioMode: true,
          },
        }}
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
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
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
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute',
  },
});

export default AudienceScreen;
