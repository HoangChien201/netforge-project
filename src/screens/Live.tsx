import React, { useEffect } from 'react';
import { StreamCall, StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
import { useCall, useCallStateHooks, VideoRenderer } from '@stream-io/video-react-native-sdk';
import { Button, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import IncallManager from 'react-native-incall-manager';

// API key lấy trong https://getstream.io/
// const apiKey = 'p888nmn4pscr'; 
// // token = Viewer token trong https://getstream.io/
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJAc3RyZWFtLWlvL2Rhc2hib2FyZCIsImlhdCI6MTcxNzk4MjUwOSwiZXhwIjoxNzE4MDY4OTA5LCJ1c2VyX2lkIjoicGh1a2luZyIsInJvbGUiOiJ2aWV3ZXIiLCJjYWxsX2NpZHMiOlsibGl2ZXN0cmVhbTpsaXZlc3RyZWFtX2UwY2FhODNiLWRmMWQtNGY1Ni04NjdjLTQ0MjkwNDg4N2VjNiJdfQ.0BXkJpJyg2D_Dj-jeZyydDJTXZWr0-7z7x0M2Pgc1gA';
// const userId = 'phuking';
// // Call ID = Livestream ID
// const callId = 'livestream_e0caa83b-df1d-4f56-867c-442904887ec6'; 
const apiKey = 'mmhfdzb5evj2'; // the API key can be found in the "Credentials" section
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiV2VkZ2VfQW50aWxsZXMiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1dlZGdlX0FudGlsbGVzIiwiaWF0IjoxNzE3OTg0MjQ3LCJleHAiOjE3MTg1ODkwNTJ9.EFXOFSS5QpxPCwP3U_DYM8wx3z-nzfUBtkpZrKPr29M';
const userId = 'Wedge_Antilles'; // the user id can be found in the "Credentials" section
const callId = 'OPgKQP0wESSI'; // the call id can be found in the "Credentials" section

// // Khởi tạo user object. Người dùng có thể là ẩn danh, khách hoặc xác thực
const user: User = {
  id: userId,
  name: 'Santhosh', // Tên của người dùng
  //image: `https://getstream.io/random_png/?id=${userId}&name=Santhosh`, 
};

 const myClient = new StreamVideoClient({ apiKey, user, token }); // Khởi tạo một client video mới từ thư viện

 const myCall = myClient.call('livestream', callId); // Tạo một cuộc gọi livestream mới với ID được chỉ định
 myCall.join({ create: true });

const LiveStreamUI = () => {
    const call = useCall(); // Sử dụng hook useCall để lấy thông tin về cuộc gọi

    // Sử dụng hook useCallState để lấy trạng thái hiện tại của cuộc gọi
    const { useParticipantCount, useLocalParticipant, useIsCallLive } = useCallStateHooks();

    const totalParticipants = useParticipantCount();
    const localParticipant = useLocalParticipant();
    const isCallLive = useIsCallLive();

    // Sử dụng hook useIncallManager để tự động định tuyến âm thanh đến thiết bị loa khi xem video
    useEffect(() => {
        // Sử dụng InCallManager để định tuyến âm thanh/video
        IncallManager.start({ media: 'video', auto: true });
        return () => {
          IncallManager.stop();
        };
      }, []);
      
    return (
      <View style={styles.flexed}>
        <Text style={styles.text}>Live: {totalParticipants}</Text>
        <View style={styles.flexed}>
          {localParticipant && <VideoRenderer participant={localParticipant} trackType='videoTrack' />} 
           {/* Hiển thị video của người dùng hiện tại nếu có */}
        </View>
        <View style={styles.bottomBar}>
          {isCallLive ? ( // Kiểm tra xem cuộc gọi có đang diễn ra không
            <Button onPress={() => call?.stopLive()} title='Dừng Livestream' /> 
          ) : (
            <Button
              onPress={() => {
                call?.goLive();
              }}
              title='Bắt Đầu Livestream'
            />
          )}
        </View>
      </View>
    );
  };

const Live = () => {
  return (
     // StreamVideo để quản lý client và ngôn ngữ
     <StreamVideo client={myClient} language='en'> 
     {/* StreamCall để quản lý cuộc gọi */}
      <StreamCall call={myCall}> 
        <SafeAreaView style={{ flex: 1 }}>
          <LiveStreamUI />
        </SafeAreaView>
       </StreamCall>
     </StreamVideo>
  )
}

export default Live

const styles = StyleSheet.create({
    flexed: {
        flex: 1,
      },
      text: {
        alignSelf: 'center',
        color: 'white',
        backgroundColor: 'blue',
        padding: 6,
        margin: 4,
      },
      bottomBar: {
        alignSelf: 'center',
        justifyContent:'center',
        alignItems:'center',
        flex:1
      },
})


