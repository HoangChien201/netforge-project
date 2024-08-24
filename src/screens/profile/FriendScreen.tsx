import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo'
import { COLOR } from '../../constant/color'
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import SkelotonFriend from '../../component/friend-request-accept-modal/SkelontonFriend';
import { getFriends, getRequest, getSuggest } from '../../http/QuyetHTTP';
import Friends from './friendScreen/Friends';
import SuggestFriends from './friendScreen/SuggestFriends';
import RequestList from '../../component/friend-request-accept-modal/RequestList';
import WaitAcceptList from '../../component/friend-request-accept-modal/WaitAcceptList';
import { socket } from '../../http/SocketHandle';
import { useSendNotification } from '../../constant/notify';
import { RootState } from '../../component/store/store';
// import { BounceIn, FadeIn, ReduceMotion, useReducedMotion } from 'react-native-reanimated';
type Friends = {
}
const FriendScreen: React.FC<Friends> = () => {
  //const reduceMotion = useReducedMotion();
  // const entering = reduceMotion
  // ? FadeIn.reduceMotion(ReduceMotion.Never)
  // : BounceIn;
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  const [friends, setFriends] = useState<any[]>([]);
  const status2 = 2;
  const status1 = 1;
  const user = useSelector((state: RootState) => state.user.value)
  const userId = user?.id
  const [showModalFriend, setShowModalFriend] = useState(false);
  const [dot, setDot] = useState(Number);
  const [reload, setReload] = useState(false);
  const [dataSuggest, setDataSuggest] = useState([]);
  const [dataSuggestAS, setDataSuggestAS] = useState([]);
  const [dataRequest, setDataRequest] = useState([]);
  const [dataWaitAccept, setDataWaitAccept] = useState([]);
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { sendNRequestFriend } = useSendNotification();
  const [refreshing, setRefreshing] = useState(false);
  const [numReq, setNumReq] = useState(0);
  const [numWA, setNumWA] = useState(0);
  const getFriendList = async (status: number) => {
    try {
      const result = await getFriends(status);
      if (result) {
        setFriends(result);
        setRefreshing(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const idsToRemove = new Set([
      ...dataRequest.map(item => item.user.id),
      ...dataWaitAccept.map(item => item.user.id)
    ]);
    const filteredDataSuggest = dataSuggest.filter(item => !idsToRemove.has(item.id));
    setDataSuggestAS(filteredDataSuggest);
    console.log('1');

  }, [dataRequest, dataWaitAccept,dataSuggest]);
  const getSuggestList = async () => {
    try {
      //const result = await getAllUser();
      const result = await getSuggest();
      if (result) {
        setDataSuggest(result)
        setRefreshing(false)
        console.log('getSuggestList');
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRequestList = async (num: number) => {
    try {
      const result = await getFriends(num);
      if (result) {
        setDataRequest(result);
        setRefreshing(false);
        setNumReq(result.length);
        console.log('getRequestList');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getWaitAcceptList = async () => {
    try {
      const result = await getRequest();
      if (result) {
        setDataWaitAccept(result);
        setRefreshing(false);
        setNumWA(result.length);
        console.log('getWaitAcceptList');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadAllData();
  }, [])
  useEffect(() => {
    if (isFocus) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
      loadAllData();

    }
  }, [isFocus, reload]);
  const loadAllData = () => {
    getFriendList(status2);
    getSuggestList();
    getRequestList(status1);
    getWaitAcceptList();
    console.log('loadAllData');
    
  };
  useEffect(() => {
    socket.on(`notification-${userId}`, (data) => {
      if (data) {
        setReload(prevState => !prevState)
      }
    });
    return () => {
      socket.off(`notification-${userId}`);
    };
  }, [userId]);
  useEffect(() => {
    if (isFocus) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none',
        }
      });
    }
  }, [isFocus]);
  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };
  const handleButtonPress = (index) => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - currentIndex, true);
    }
  };
  // useEffect(() => {
  //   //getRequestList(status1)
  // }, [dataRequest])
  // useEffect(() => {
  //   //getWaitAcceptList()
  // }, [dataWaitAccept])
  useFocusEffect(
    useCallback(()=>{
      loadAllData()
    },[])
  )
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.buttonS, currentIndex === 0 && styles.activeButton]}
          onPress={() => handleButtonPress(0)}
        >
          <Icon name='add-to-list' size={20} color={COLOR.PrimaryColor} />
          <Text style={styles.text1}>Yêu cầu</Text>
          <View style={{ position: 'absolute', height: 14, width: 12, backgroundColor: COLOR.PrimaryColor1, alignItems: 'center', justifyContent: 'center', borderRadius: 8, end: -2, top: -2 }}>
            <Text style={styles.num}>{numWA}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonS, currentIndex === 1 && styles.activeButton]}
          onPress={() => handleButtonPress(1)}
        >
          <Icon name='paper-plane' size={20} color={COLOR.PrimaryColor} />
          <Text style={styles.text1}>Lời mời</Text>
          <View style={{ position: 'absolute', height: 14, width: 12, backgroundColor: COLOR.PrimaryColor1, alignItems: 'center', justifyContent: 'center', borderRadius: 8, end: -2, top: -2 }}>
            <Text style={styles.num}>{numReq}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonF]}
          onPress={() => navigation.navigate('Friends')}
        >
          <Icon name='users' size={20} color={COLOR.PrimaryColor} />
          <Text style={styles.text1}>Bạn bè</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container1]}>
        {dataWaitAccept ?

          <Swiper ref={swiperRef} loop={false} showsButtons={false}
            onIndexChanged={handleIndexChanged}
          >
            <View>
              <WaitAcceptList dataWaitAccept={dataWaitAccept}
                setDataWaitAccept={setDataWaitAccept} setShowModalFriend={setShowModalFriend}
                getWaitAcceptList={getWaitAcceptList}
                reload={reload} setReload={setReload}
                refreshing={refreshing} setRefreshing={setRefreshing}
              />
            </View>
            <View>
              <RequestList dataRequest={dataRequest} setDataRequest={setDataRequest}
                setReload={setReload} reload={reload}
                setShowModalFriend={setShowModalFriend}
                refreshing={refreshing} setRefreshing={setRefreshing}
              />
            </View>
          </Swiper>
          : <SkelotonFriend />}
      </View>
      <SuggestFriends data={dataSuggestAS} setData={setDataSuggest} />

    </View >
  )

}

export default FriendScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.primary300,
  },
  container1: {
    height: '83%',
    backgroundColor: COLOR.primary300,
  },
  reqFriends: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderColor: COLOR.PrimaryColor,
    marginTop: 5
  },
  iconFriend: {
    height: 44,
    width: 44,
    borderWidth: 1,
    borderColor: COLOR.PrimaryColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginStart: 10
  },
  text1: {
    fontSize: 16,
    fontWeight: '400',
    fontStyle: "normal",
    color: 'black',
    marginStart: 3
  },
  text2: {
    fontSize: 13,
    fontWeight: '300',
    fontStyle: "normal",
    color: 'black'
  },
  header: {
    height: 60,
    flexDirection: 'row',

  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 19,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10
  }
  ,
  dot: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 35,
    start: 38,
    backgroundColor: COLOR.primary300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonS: {
    width: 86,
    height: 32,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonF: {
    width: 100,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLOR.primary350,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    end: 5,
    top: 5

  },
  activeButton: {
    backgroundColor: COLOR.primary150 // Change to the active color
  },
  num: {
    fontSize: 10,
    color: 'black',
    fontWeight: '400'
  }
})