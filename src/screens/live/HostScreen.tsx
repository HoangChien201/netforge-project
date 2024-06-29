import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

type RootStackParamList = {
  Home: undefined;
};

type Props = {
  route: HostScreenRouteProp;
};

const HostScreen: React.FC<Props> = ({ route }) => {
  const prebuiltRef = useRef<any>();
  const { userID, userName, liveID } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useMyContext();

  const handleLeaveLiveStreaming = () => {
    navigation.navigate('LiveWithZego' as never);
  };

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
          textStyle: {
            color: 'blue', // Example: Change text color to red
          },
          topMenuBarConfig: {
            buttons: [
                ZegoMenuBarButtonName.minimizingButton,
                ZegoMenuBarButtonName.leaveButton,
                
            ],
            styles: {
                color: 'red', // Ví dụ: Đổi màu chữ của các nút thành màu đỏ
              },
        },
        onLiveStreamingEnded: handleLeaveLiveStreaming,
        onLeaveLiveStreaming: handleLeaveLiveStreaming,
        onWindowMinimized: () => {
            // Navigate to a specific page, such as the homepage
            navigation.navigate('LiveWithZego' as never);
        },
        onWindowMaximized: () => {
            // Navigate to the current page, but be sure to include the original parameters of the page. If the current page has no parameters, they can be ignored
            navigation.navigate('HostScreen', { userID, userName, liveID });
        },
        
          durationConfig: {
            isVisible: true,
            onDurationUpdate: (duration: number) => {
                if (duration === 5 * 60) {
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
  liveIDText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    zIndex:1,
    position:'absolute',
    top:0
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
}
});

export default HostScreen;
