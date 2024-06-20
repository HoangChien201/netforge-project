import React, { useEffect, useRef, useState } from 'react';
import { Animated, NativeScrollEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ListPorts from '../component/listpost/ListPorts';
import UpLoadAvatar from '../component/profile/UploadAvatar';
import { useMyContext } from '../component/navigation/UserContext';
import { formattedDate } from '../format/FormatDate';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const Header_Max_Height = 160;
const Header_Min_Height = 80;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const HeaderBanner = ({ value}: any) => {
  const [avatarPath, setAvatarPath] = useState<string>('');

  const handleImageSelect = (imagePath: string) => {
    setAvatarPath(imagePath);
  };

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#181D31', '#678983'],
    extrapolate: 'clamp',
  });

  const avatarTop = animatedHeaderHeight.interpolate({
    inputRange: [Header_Min_Height, Header_Max_Height],
    outputRange: [-200, Header_Min_Height],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
        },
      ]}
    >
      
      <Animated.View style={[styles.avatar, {
        top: avatarTop,
        zIndex: 1,
        backgroundColor: 'transparent',
      },]}>
        {/* {showHeaderTitle && <Text style={styles.title}>hehe</Text>} */}
        <UpLoadAvatar initialImage={avatarPath} onImageSelect={handleImageSelect} />
      </Animated.View>
    </Animated.View>
  );
};

const TestProfile = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: {display:'none'}});
  }, []);
  const { user } = useMyContext();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const handleToCreatStory = () => {
  }

  return (
    <View style={styles.container}>
      <HeaderBanner value={scrollOffsetY} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false}
        )}
      >
        <View style={[styles.inForContainer]}>
          <Text style={[styles.txtName,]}>{user.fullname}</Text>
          <Text style={[styles.txtBirthDay,]}>Ngày sinh {formattedDate(user.dateOfBirth)}</Text>
          <TouchableOpacity style={styles.btnToStory} onPress={handleToCreatStory}>
              <Text style={{color:"#fff",fontSize:18,fontWeight:'700'}}>Thêm vào tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnToEdit} onPress={() => navigation.navigate('EditProfileScreen')}>
              <Icon name="edit" size={24} color="#000" style={{marginRight:10}}/>
              <Text style={{color:"#000",fontSize:18,fontWeight:'700'}}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{flex:1, borderWidth:2, width:'100%', borderColor:'#C0C0C0', marginTop:15}}></View>
        {/* {DATA.map(val => {
          return (
            <View style={styles.card}>
              <Text style={styles.subtitle}>({val.id})</Text>
            </View>
          );
        })} */}
        <ListPorts />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 25,
    zIndex: 1,
  },
  avatar: {
    position: 'absolute',
    left: 20,
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingTop: Header_Max_Height,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
  inForContainer:{
    marginTop: 60,
    paddingHorizontal: 20,
  },
  txtName: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  txtBirthDay: {
    marginVertical:8,
    fontSize: 16,
    color: 'gray',
  },
  btnToStory: {
    borderRadius:10,
    backgroundColor:'#6A5ACD',
    height:40,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
  },
  btnToEdit: {
    borderRadius:10,
    backgroundColor:'#C0C0C0',
    height:40,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    flexDirection:'row',
  }

});

export default TestProfile;
