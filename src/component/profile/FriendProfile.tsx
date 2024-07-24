import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Animated, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import HeaderBanner from './HeaderBanner';
import ProfileHeader from './ProfileHeader';
import { useMyContext } from '../navigation/UserContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListPortsByUser from '../listpost/ListPostByUser';
import ProfileDetailData from './ProfileDetailData';
import { getUSerByID } from '../../http/PhuHTTP';
import MediaOfUser from './MediaOfUser';
import Icon from 'react-native-vector-icons/Ionicons';
import FriendScreen from '../../screens/profile/FriendScreen';
import Friends from '../../screens/profile/friendScreen/Friends';
import { getFriends } from '../../http/QuyetHTTP';
import { COLOR } from '../../constant/color';

interface ModalFriendProfileProps {
    userId:any;
    setFriends:()=>void;
}
interface ContextType {
    user: any;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const FriendProfile:React.FC<ModalFriendProfileProps> = () => {
  const { user } = useMyContext() as ContextType;
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerHeight = 420; // Chiều cao của header
  const tabBarHeight = 80; // Chiều cao của tab bar
  const [currentTab, setCurrentTab] = useState('MyPost'); // Khởi tạo tab mặc định
  const [tabBarPosition, setTabBarPosition] = useState(headerHeight);
  const route = useRoute();
  const userId = route.params?.userId;
  const [friends, setFriends] = useState<any[]>([]);

  const token = user.token;
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  

  //api bạn bè
  const getFriendList = async (status: number) => {
    try {
      const result = await getFriends(status);
      if (result) {
        setFriends(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendList(2);
  }, [])


  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await getUSerByID(userId, token);
          setUserData(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserData();
    }, [setUserData])
  );

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  }, [user]);

  const handleToCreateStory = () => {};

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    { useNativeDriver: true }
  );

  const headerComponent = useMemo(() => {
    if (!userData) return null;
    return (
      <>
        <HeaderBanner value={scrollOffsetY} userId={userId} />
        <View style={{ marginTop: 260 }}></View>
        <ProfileHeader
                avatar={userData.avatar} //chiến mới thêm //--nếu đã thấy vui lòng xóa comment này
                fullname={userData.fullname}
                userId={userId} 
                loggedInUserId={user.id}
                relationship ={userData.relationship}
                />
      </>
    );
  }, [userData, scrollOffsetY, navigation]);

  const tabBarY = useMemo(() => {
    return scrollOffsetY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [tabBarPosition, 0],
      extrapolate: 'clamp',
    });
  }, [headerHeight, scrollOffsetY, tabBarPosition]);

  const handleTabChange = (tab: any) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
      if (tabBarPosition === 0) {
        setTabBarPosition(0);
      } else {
        setTabBarPosition(headerHeight); // Cập nhật lại vị trí tabBar khi chuyển tab
      }
    }
  };

  const MyPostScreen = () => (
    <View style={{ flex: 1 }}>
      {userData && <ProfileDetailData userData={userData} />}
      <ListPortsByUser onRefresh={false} userId = {userId} />
    </View>
  );

  const MyMediaScreen = () => (
    <View style={{ paddingTop:30}}>
      <MediaOfUser userId={userId} onRefresh={false}/>
    </View>
  );

  // const MyFriendScreen = () => (
  //   <View style={{ paddingTop:10, paddingBottom:20}}>
  //     <Friends friends={friends} setFriends={setFriends} />
  //   </View>
  // );

  return (
      <View style={styles.container}>
        <Animated.FlatList
          data={['MyPost', 'Media', 'Events']}
          renderItem={({item}) => (
            <View style={{flex: 1}} key={item}>
              {currentTab === item && (
                <View
                  style={{
                    minHeight: SCREEN_HEIGHT - headerHeight - tabBarHeight,
                  }}>
                  <View style={{paddingTop: tabBarHeight}}></View>
                  {item === 'MyPost' && <MyPostScreen />}
                  {item === 'Media' && <MyMediaScreen />}
                  {/* {item === 'Events' && <MyFriendScreen/>} */}
                </View>
              )}
            </View>
          )}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={headerComponent}
        />

        <Animated.View
          style={[styles.tabContainer, {transform: [{translateY: tabBarY}]}]}>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: '#ffffff',
                elevation: 0,
                shadowOpacity: 0,
              },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
              },
              tabBarIndicatorStyle: {
                backgroundColor: '#007AFF',
              },
            }}
            initialRouteName="MyPost"
            tabBar={props => (
              <TabBar
                {...props}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
              />
            )}>
            <Tab.Screen
              name="MyPost"
              component={MyPostScreen}
              options={{tabBarLabel: 'Bài viết'}}
            />
            <Tab.Screen
              name="Media"
              component={MyMediaScreen}
              options={{tabBarLabel: 'Hình ảnh'}}
            />
            {/* <Tab.Screen
              name="Events"
              component={MyFriendScreen}
              options={{tabBarLabel: 'Bạn bè'}}
            /> */}
          </Tab.Navigator>
        </Animated.View>
      </View>
  );
};

const TabBar = ({ state, descriptors, navigation, currentTab, handleTabChange }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabItem, isFocused && styles.focusedTabItem]}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                handleTabChange(route.name);
                navigation.navigate(route.name);
              }
            }}
          >
            <Text style={[styles.tabText, isFocused && styles.focusedTabText]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 50,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    zIndex: 1,
    borderBottomWidth: 1,
    borderColor: '#dddddd',
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:30 
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  focusedTabItem: {
    backgroundColor: '#32DEEE2A',
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal:10
  },
  focusedTabText: {
    color: COLOR.PrimaryColor,
  },
});

export default FriendProfile;
