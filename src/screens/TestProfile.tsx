import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Animated, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import HeaderBanner from '../component/profile/HeaderBanner';
import ProfileHeader from '../component/profile/ProfileHeader';
import { useMyContext } from '../component/navigation/UserContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListPortsByUser from '../component/listpost/ListPostByUser';
import ProfileDetailData from '../component/profile/ProfileDetailData';
import { getUSerByID } from '../http/PhuHTTP';
import MediaOfUser from '../component/profile/MediaOfUser';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const TestProfile = () => {
  const { user } = useMyContext();
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerHeight = 420; // Chiều cao của header
  const tabBarHeight = 80; // Chiều cao của tab bar
  const [currentTab, setCurrentTab] = useState('MyPost'); // Khởi tạo tab mặc định
  const [tabBarPosition, setTabBarPosition] = useState(headerHeight);

  const userID = user.id;
  const token = user.token;
  const [userData, setUserData] = useState<any>();
  let dateOfBirth = useState(null);
  const nameUser = user.fullname;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: nameUser,
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await getUSerByID(userID, token);
          setUserData(response);
          dateOfBirth = response.dateOfBirth;
          console.log("ProfileDetailData: ", response)
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

  const handleToCreateStory = () => {
    
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    { useNativeDriver: true }
  );

  const headerComponent = useMemo(() => {
    if (!userData) return null;

    return (
      <>
        <HeaderBanner value={scrollOffsetY} userId={user.id} />
        <View style={{marginTop:260}}></View>
          <ProfileHeader
          fullname={userData.fullname}
          userId={user.id}
          loggedInUserId={user.id} 
          relationship={undefined}/>
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
      // console.log(tabBarPosition)
      // console.log(scrollOffsetY._value);
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
      <ListPortsByUser onRefresh={false} userId = {userID} />
    </View>
  );

  const MyMediaScreen = () => (
    <View style={{ paddingTop:20}}>
      <MediaOfUser userId={userID} onRefresh={false}/>
    </View>
  );


  return (
    <View style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        //contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        {renderHeader()}
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop:tabBarHeight }}></View>
        {currentTab === 'MyPost' && <MyPostScreen />}
        {currentTab === 'Reviews' && <ReviewScreen />}
        {currentTab === 'Events' && <EventScreen />}
      </ScrollView> */}
      <Animated.FlatList
        data={['MyPost', 'Media', 'Events']}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }} key={item}>

            {currentTab === item && (
              <View style={{ minHeight: SCREEN_HEIGHT - headerHeight - tabBarHeight }}>

                <View style={{ paddingTop:tabBarHeight }}></View>
                {item === 'MyPost' && <MyPostScreen />}
                {item === 'Media' && <MyMediaScreen />}
                {item === 'Events' && <EventScreen />}
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={headerComponent}
      />
      
      <Animated.View style={[styles.tabContainer, { transform: [{ translateY: tabBarY }] }]}>
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
          tabBar={(props) => (
            <TabBar
              {...props}
              currentTab={currentTab}
              handleTabChange={handleTabChange}
            />
          )}
        >
          <Tab.Screen name="MyPost" component={MyPostScreen} options={{ tabBarLabel: 'Bài viết' }} />
          <Tab.Screen name="Media" component={MyMediaScreen} options={{ tabBarLabel: 'Hình ảnh' }} />
          <Tab.Screen name="Events" component={EventScreen} options={{ tabBarLabel: 'Video' }} />
        </Tab.Navigator>
      </Animated.View>
    </View>
  );
};


const EventScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

  </View>
);

const TabBar = ({ state, descriptors, navigation, currentTab, handleTabChange }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        return (
          <TouchableOpacity
          key={route.key}
            style={styles.tabItem}
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
            <Text style={[styles.tabText, { color: isFocused ? '#007AFF' : '#333333' }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
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
    borderBottomWidth:1,
    borderColor:'#dddddd',
    //elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestProfile;
