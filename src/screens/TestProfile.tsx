import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { BlurView } from "@react-native-community/blur";
import { useMyContext } from '../component/navigation/UserContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import { getUSerByID } from '../http/PhuHTTP';
import { useFocusEffect } from '@react-navigation/native';
import ImageViewModal from '../component/profile/ImageViewModal';
import { FormatDate } from '../format/FormatDate';


const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 70;

const PROFILE_PICTURE_URI =
  'https://pbs.twimg.com/profile_images/975388677642715136/7Hw2MgQ2_400x400.jpg';

const PROFILE_BANNER_URI =
  'https://tse4.mm.bing.net/th?id=OIP.BMCzMzN0sAijRZmw-dXr6gHaCe&pid=Api&P=0&h=220';

const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground
);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const TestProfile = () => {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const {user} = useMyContext();
  const [userData, setUserData] = useState<any>(null);
  console.log(user.data.fullname);
  const userID = user.data.id;
  const token = user.data.token;
  const PROFILE_AVATAR_URI = user.data.avatar;

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          
            const response = await getUSerByID(userID, token);
            setUserData(response);
            console.log("response nè: ",response);
            console.log("userData: ", userData);
            console.log(response.id);
            
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserData();
    }, [user])
  );


  const navigation:NavigationProp<ParamListBase> = useNavigation();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;


  const handleEditProfile = async () => {
    console.log("edit nè")
    navigation.navigate(ProfileRootStackEnum.EditProfileScreen, { user: userData } );
  }

  const handleToLiveStream = async () => {
    console.log("live chim nè")
    navigation.navigate(ProfileRootStackEnum.Live);
  }

  return (
    <View style={[styles.container]}>
      {/* fullname + post count */}
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: insets.top + 6,
          left: 0,
          right: 0,
          alignItems: 'center',
          opacity: scrollY.interpolate({
            inputRange: [90, 110],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [90, 120],
                outputRange: [30, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        {userData && (
          <Text style={[styles.usernameTop]}>{userData.fullname}</Text>
        )}
        <Text style={[styles.postsCount]}>379 tweets</Text>
      </Animated.View>

      {/* Banner */}
      <AnimatedImageBackground
        source={{
          uri: PROFILE_BANNER_URI,
        }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-200, 0],
                outputRange: [5, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
              }),
            },
          ],
        }}
      >
        <AnimatedBlurView
          tint = "dark"
          intensity={96}
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 2,
            opacity: scrollY.interpolate({
              inputRange: [-50, 0, 50, 100],
              outputRange: [1, 0, 0, 1],
            }),
          }}
        />
      </AnimatedImageBackground>

      {/* profile */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: { y: scrollY },
            },
          }],
          { useNativeDriver: true }
        )}
        style={{
          zIndex: 3,
          marginTop: HEADER_HEIGHT_NARROWED,
          paddingTop: HEADER_HEIGHT_EXPANDED,
        }}
      >
        <View style={[styles.container, { backgroundColor: '#FFF' }]}>
          <View style={[styles.container, {paddingHorizontal: 20,}]}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => setIsImageViewerVisible(true)}>
              <Animated.Image
                source={user && user.data.avatar ? { uri: PROFILE_AVATAR_URI  } : require('../media/icon/avatar.png')}
                //source={require('../media/icon/phuking.jpg')}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 40,
                  borderWidth: 4,
                  borderColor: 'black',
                  marginTop: 10,
                  zIndex:4,
                  transform: [
                    {
                      scale: scrollY.interpolate({
                        inputRange: [0, HEADER_HEIGHT_EXPANDED],
                        outputRange: [1, 0.5],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, HEADER_HEIGHT_EXPANDED],
                        outputRange: [0, 16],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnEditProfile} onPress={handleEditProfile} >
                <Text style={styles.buttonText}>Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
            </View>

            {userData && (
              <Text style={[styles.txtName,]}>{userData.fullname}</Text>
            )}

            <TouchableOpacity style={styles.btnEditProfile} onPress={handleToLiveStream} >
                <Text style={styles.buttonText}>Phát trực tiếp</Text>
            </TouchableOpacity>

            <Text style={[{fontSize: 16, color: 'gray', marginBottom: 10,}]}>
              @eveningkid
            </Text>

            {userData && (
              <Text style={[styles.txtBirthDay,]}>Ngày sinh {FormatDate(userData.dateOfBirth)}</Text>
            )}


            {/* follow count */}
            <View style={{flexDirection: 'row', marginBottom: 15,}}>
              <Text style={[styles.txtFollowCount]}> 70{' '}
                <Text style={{color: 'gray', fontSize:16}}>Đang theo dõi</Text>
              </Text>

              <Text style={[styles.txtFollowCount]}>106{' '}
                <Text style={{color: 'gray', fontSize:16}}>Người theo dõi</Text>
              </Text>
            </View>
          </View>

          <View style={{ height: 1,backgroundColor: '#e0e0e0',marginVertical: 5,marginHorizontal:20}} />

          <View style={styles.container}>
            {/* <ListPorts/> */}
          </View>
        </View>
      </Animated.ScrollView>
      <ImageViewModal
        visible={isImageViewerVisible}
        onClose={() => setIsImageViewerVisible(false)}
        imageUri={require('../media/icon/phuking.jpg')}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'gray',
  },
  usernameTop: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -3,
    color:'gray',
  },
  txtName: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  postsCount: {
    fontSize: 13,
    color: 'gray',
  },
  txtBirthDay: {
    marginBottom: 10, 
    fontSize: 16,
    color: 'gray',
  },
  txtFollowCount: {
    fontWeight: 'bold',
    marginRight: 20,
    color:'#000',
    fontSize:16,
  },
  btnEditProfile: {
    borderWidth:2,
    width:'auto',
    height:40,
    borderColor:'gray',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#FFA07A',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
