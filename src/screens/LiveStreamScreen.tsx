import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

const APP_ID = '950cc85d9e234954822a441a6a22f992';
const CHANNEL_NAME = 'Network';
const TOKEN = '007eJxTYOAUfG7lP7nUxnae4Jm3M+d4TYzfO/EKc08f4yMzLRvezBgFBktTg+RkC9MUy1QjYxNLUxMLI6NEExPDRLNEI6M0S0ujhezVaQ2BjAwLdJcxMjJAIIjPzuCXWlKeX5TNwAAAx4QdUw==';
const UID = 0; // or any valid UID

const LiveStreamHostScreen: React.FC = () => {
  const [videoCall, setVideoCall] = useState(false);

  const connectionData = {
    appId: APP_ID,
    channel: CHANNEL_NAME,
    token: TOKEN,
    uid: UID,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  useEffect(() => {
    // Simulate receiving a push notification for new livestream
    // Replace with actual push notification handling logic
    const handlePushNotification = () => {
      Alert.alert(
        'New Livestream Available',
        'Tap to view the livestream',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'View', onPress: () => setVideoCall(true) },
        ],
        { cancelable: false }
      );
    };

    // Simulate receiving push notification after 5 seconds
    const notificationTimeout = setTimeout(handlePushNotification, 5000);

    return () => clearTimeout(notificationTimeout);
  }, []);

  const handleStartCall = () => {
    setVideoCall(true);
  };

  return (
    <View style={styles.container}>
      {!videoCall ? (
        <TouchableOpacity style={styles.startButton} onPress={handleStartCall}>
          <Text style={styles.startButtonText}>Start Livestream</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.fullScreen}>
          <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 20,
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LiveStreamHostScreen;
