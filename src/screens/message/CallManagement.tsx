// Import React Hooks
import React, { useRef, useState, useEffect } from 'react';

import { PermissionsAndroid, Platform, Switch, TouchableOpacity } from 'react-native';
// Import user interface elements
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// Import Agora SDK
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  RtcSurfaceView,
} from 'react-native-agora';
import { useMyContext } from '../../component/navigation/UserContext';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Define basic information
const appId = '86ad32b787104827bb27995057914d87';
const token = '007eJxTYJBdOGd3kffG7tSvdS6a4tv+inuou4SeaLqj3LNk0goe0xUKDBZmiSnGRknmFuaGBiYWRuZJSUbmlpamBqbmloYmKRbm2XOK0xoCGRk6tl1mZWSAQBCfkyGxNCUzPzkxJ4eBAQCNUyAl'
const channelName = 'audiocall';
const uid = 0; // Local user UID, no need to modify

const CallManagement = () => {


  const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
  const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Remote user UID
  const [message, setMessage] = useState(''); // User prompt message
  const [isHost, setIsHost] = useState(true); // User role

  // Initialize the engine when starting the App
  useEffect(() => {
    setupVideoSDKEngine();
  }, []);

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const setupVideoSDKEngine = async () => {
    try {
      // Create RtcEngine after checking and obtaining device permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      // Register event callbacks
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel: ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user ' + Uid + ' has joined');
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user ' + Uid + ' has left the channel');
          setRemoteUid(0);
        },
      });
      // Initialize the engine
      agoraEngine.initialize({
        appId: appId,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // Define the join method called after clicking the join channel button
  const join = async () => {
    if (isJoined) {
      return;
    } 
    try {
      // Set the channel profile type to communication after joining the channel
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      // // Call the joinChannel method to join the channel
      // agoraEngineRef.current?.joinChannel(token, channelName, uid, {
      //   // Set the user role to broadcaster
      //   clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      // });
      //callvideo
      if (isHost) {
        // Enable local preview
        agoraEngineRef.current?.startPreview();
        // Join the channel as a host
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster
        });
      } else {
        // Join the channel as audience
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  // Define the leave method called after clicking the leave channel button
  const leave = () => {
    try {
      // Call the leaveChannel method to leave the channel
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('Left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const enableVideo = () => {
    try {
      // Call the leaveChannel method to leave the channel
      agoraEngineRef.current?.enableVideo()
      agoraEngineRef.current?.startPreview();
    } catch (e) {
      console.log(e);
    }
  }

  const animatedStyled=useAnimatedStyle(()=>{
    return {
        transform: [
            {
                translateX: withTiming(100,
                    { duration: 1000,easing:Easing.linear }
                )
            },
          ]
    
    }
  })

  // Render the user interface
  return (
    <SafeAreaView style={styles.main}>
      {/* <Text style={styles.head}>Agora Voice Call Quick Start</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={join}>
          <Text style={styles.button}>
            Join Channel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={leave}>
          <Text style={styles.button}>
            Leave Channel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={enableVideo}>
          <Text style={styles.button}>
            Enable Video
          </Text>
        </TouchableOpacity>

      </View>
      <View style={styles.btnContainer}>
        <Text>Audience</Text>
        <Switch
          onValueChange={switchValue => {
            setIsHost(switchValue);
            if (isJoined) {
              leave();
            }
          }}
          value={isHost}
        />
        <Text>Host</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && !isHost && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{ uid: remoteUid }}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>{isJoined && !isHost ? 'Waiting for remote users to join' : ''}</Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView> */}

      <Animated.View 
      style={animatedStyled}
        > 
        <Text>AHHA</Text>
      </Animated.View>
    </SafeAreaView>
  );

  // Display message
  function showMessage(msg: string) {
    setMessage(msg);
  }
};

// Define user interface styles
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { flex: 1, alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '90%', height: 200 },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20 },
  info: { backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff' }
});

export default CallManagement;