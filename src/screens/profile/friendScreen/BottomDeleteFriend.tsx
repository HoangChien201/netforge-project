import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { COLOR } from '../../../constant/color';
import Icon from 'react-native-vector-icons/AntDesign';
import DeleteFriend from './DeleteFriend';
import { NavigateToMessage } from '../../../component/message/NavigateToMessage';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
type Bottom = {
  isVisible: boolean, setIsVisible: (value: boolean) => void, data: any,
  setFriends: (value: any) => void,
  friends: any
}
const BottomDeleteFriend: React.FC<Bottom> = ({ isVisible, setIsVisible, data, setFriends, friends }) => {
  const snapPointsE = useMemo(() => ['35%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [show, setShow] = useState(false);
  const [user2, setUser2] = useState<number>(0);
  const [name, setName] = useState('');
  const [deteted, setDeleted] = useState(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
    if (data) {
      setUser2(data.id)
      setName(data.fullname)
    }

  }, [isVisible, data]);
  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  useEffect(() => {
    handleClosePress()
  }, [deteted])
    //navigate to message
    function IconMessageOnPressHandle(user:{fullname:string,avatar:string,id:number}) {
      const { fullname, avatar, id } = user
      NavigateToMessage({
        fullname,
        avatar,
        id: id
      }, navigation)
    };
    const renderBackdrop = (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
        pressBehavior="close"
      />
    );
  return (
    <>

      {isVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPointsE}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          onClose={() => setIsVisible(false)} // Set visibility to false when the sheet is closed
        >
          <BottomSheetView
            style={{ backgroundColor: COLOR.PrimaryColor}}
          >
            <View style={styles.content}>
              <View style={styles.itemButton}>
                {data.avatar ?
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: data.avatar }} style={{ height: 40, width: 40, borderRadius: 40, }} />
                  </View>
                  :
                  null
                }
                <Text style={{ flex: 4, fontSize: 16, color: 'black', fontWeight: '400' }}>{data.fullname}</Text>
              </View>
              <TouchableOpacity style={styles.itemButton}
              onPress={IconMessageOnPressHandle.bind(this,data)}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                  <Icon name='message1' size={24} color={COLOR.PrimaryColor1} style={{ padding: 8 }} />
                </View>
                <Text style={{ flex: 4, fontSize: 16, color: 'black', fontWeight: '400' }}>Nhắn tin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemButton}
                onPress={() => { setShow(true) }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                  <Icon name='deleteuser' size={24} color={COLOR.PrimaryColor1} style={{ padding: 8 }} />
                </View>
                <Text style={{ flex: 4, fontSize: 16, color: 'black', fontWeight: '400' }}>Hủy kết bạn</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClosePress}
                style={styles.itemButton}
              >
                <Icon name='close' size={28} color='#000' />
              </TouchableOpacity>
            </View>
            <DeleteFriend show={show} setShow={setShow} user2={user2} setFriends={setFriends} name={name} setDeleted={setDeleted} />
          </BottomSheetView>
        </BottomSheet>
      )}
    </>
  );
};

export default BottomDeleteFriend;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white'
  },
  closeBottom: {
    position: 'absolute',
    end: 2,
    top: -10,
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 1,
  }
});
