import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, LogBox } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import uuid from 'react-native-uuid';
import { COLOR } from '../../../constant/color';
import { sendRequest } from '../../../http/QuyetHTTP';
import { useMyContext } from '../../../component/navigation/UserContext';
import { socket } from '../../../http/SocketHandle';
import { useSendNotification } from '../../../constant/notify';
type Suggest = {
  data: any,
  setData: () => void,
}
const SuggestFriends: React.FC<Suggest> = ({ data, setData }) => {
  const snapPoints = useMemo(() => ['15%', '50%', '100%'], []);
  const snapPointsE = useMemo(() => ['15%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [textReqState, setTextReqState] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({});
  const { user } = useMyContext();
  const { sendNRequestFriend } = useSendNotification();
  LogBox.ignoreLogs([
    '[Reanimated] Reduced motion setting is enabled on this device.',
  ]);
  const handleSendReaction = (id: any) => {
    const data = {
      receiver:id
    };
    sendNRequestFriend(data)
  };
  // gửi yêu cầu kết bạn
  const status = 1;
  const sendRequestFriend = async (id: number, status: number) => {
    setDisabledButtons((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      const result = await sendRequest(id, status);
      console.log('đã gửi lời mời');

      if (result) {
        handleSendReaction(id)
        setTextReqState((prevState) => ({
          ...prevState,
          [id]: 'Đã gửi'
        }));
      }
    } catch (error) {
      setDisabledButtons((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  }

  if (!data || data.length === 0) {
    return <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPointsE}
    >
      <BottomSheetView>
        <View style={styles.containerEmpty}>
          <Text style={styles.headerText}>Không có gợi ý bạn bè</Text>
        </View>
      </BottomSheetView>

    </BottomSheet>





  }
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.text}>Danh sách gợi ý 🎉</Text>
        </View>

        {data?.map((friend: { user: { id: string | number; avatar: any; fullname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined } }) => (
          <View key={friend.id.toString()}>
            <View style={styles.itemWA}>
              <View style={styles.user}>
                {friend.avatar ? <Image source={{ uri: friend.avatar }} style={styles.avatarne} /> :
                  <View style={{ height: 48, width: 48, borderRadius: 50, borderWidth: 1, borderColor: 'gray', backgroundColor: '#DDDDDD', }} />
                }
                <Text style={styles.userName}>{friend.fullname}</Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity style={textReqState[friend.id] === 'Đã gửi' ? styles.buttonAccept : styles.buttonReject}
                  onPress={() => { sendRequestFriend(friend.id, status) }} disabled={textReqState[friend.id] === 'Đã gửi' || disabledButtons[friend.id]} >
                  <Text style={textReqState[friend.id] === 'Đã gửi' ? styles.textAccept1 : styles.textAccept}>
                    {textReqState[friend.id] === 'Đã gửi' ? 'Đã gửi' : 'kết bạn'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary300,
  },
  contentContainer: {
    flex: 1,

  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginVertical: 5
  },
  itemWA: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    marginTop: 3,
    justifyContent: 'space-between',
    marginStart: 3,
    marginBottom: 3,
    marginEnd: 3
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 10
  },
  userName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    marginTop: 10,
    marginStart: 5
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 5
  },
  buttonAccept: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  buttonReject: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  textAccept: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textTransform: 'capitalize'

  },
  avatarne: {
    height: 48,
    width: 48,
    borderRadius: 50,

  },
  textAccept1: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textTransform: 'capitalize'

  },
  containerEmpty: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerText: {
    marginStart: 10,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',

  },
});

export default SuggestFriends;
