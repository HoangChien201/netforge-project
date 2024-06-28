import { Image, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { memo, useState } from 'react';
import ActionBar from './ActionBar';
import { DateOfTimePost } from '../../format/DateOfTimePost';
import ItemImg from './ItemImg';
import ModalFriendProfile from '../profile/FriendProfile';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useMyContext } from '../navigation/UserContext';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';


const ItemPost =  memo(({ index, data,onrefresh, userId, onPressProfile  }) => {
    //const navigation = useNavigation();
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [checkLike,setCheckLike] = useState<boolean>(false)
    const { creater, share_count, reaction, content, media, comment_count, create_at, id,like_count } = data;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { user } = useMyContext();
    const loggedInUserId = user.id;
    userId =creater.id;
   const fommatContent = ()=>{
    const fomat = content ? content.split(/@\[([^\]]+)\]\(\d+\)/g) : [];
    return (
        <View  style={{ marginHorizontal: 20, paddingBottom: media ? 0 : 20,flexDirection:'row',flexWrap:'wrap' }}>
          {fomat?.map((fomat, index) => {
            if (index % 2 === 1) {
              return (
                <Text key={index} style={{ color: 'black',fontWeight:'bold' }}>{fomat}</Text>
              );
            } else {
              return (
                <Text key={index} style={{ color: 'black'}}>{fomat}</Text>
              );
            }
          })}
        </View>
      );
   }
    const handleItemPress = () => {
        setCheckLike(false);
    };

    // const handleToProfile = () => {
    //     userId =creater.id;
    //     setSelectedUserId(creater.id);
    //     console.log("userID: ",creater.id);
    //     if (creater.id === loggedInUserId) {
    //         setIsModalVisible(false);
    //         navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    //     } else {
    //         setIsModalVisible(true);
    //     } 
    // };
    const handleToProfile = () => {
        onPressProfile(creater.id);
    };

    // const closeModal = () => {
    //     setIsModalVisible(false);
    //     setSelectedUserId(null); 
    // };

    return (
        <>
        <Pressable onPress={handleItemPress}   style={{ marginBottom: 6, backgroundColor: "#fff" }}>
            <TouchableOpacity  onPress={handleToProfile}>
                <View style={styles.home}>
                    <View style={styles.containerAvt}>
                        {/* <Image source={require('../../media/icon/phuking.jpg')} style={styles.avt} /> */}
                        {creater.avatar ? (
                            <Image source={{ uri: creater.avatar }} style={styles.avt} />
                        ) : (
                            <Image source={require('../../media/icon/phuking.jpg')} style={styles.avt} />
                        )}
                        <View>
                            <Text style={styles.nameUser}>{creater.fullname === null ? "Người dùng" : creater.fullname}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
                                <Text style={{ marginRight: 10 }}>{DateOfTimePost(create_at)}</Text>
                                <Image source={require('../../media/icon/icon-hour-light.png')} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={require('../../media/Dicons/ellipsis.png')} style={styles.ellips} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            {fommatContent()}
            {media.length > 0 ? <ItemImg image={media} /> : null}
            <ActionBar checkLike={checkLike} setCheckLike={setCheckLike}  postId={id} type={reaction} comment_count={comment_count} share_count={share_count} like_count={like_count}  />
            
        </Pressable>
      
        </>
    );
});

export default ItemPost;

const styles = StyleSheet.create({
    avt: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: 'cover',
        marginRight: 10,
    },
    containerAvt: {
        flexDirection: 'row',
    },
    nameUser: {
        fontWeight: 'bold',
        color: 'black',
        fontFamily: '',
    },
    ellips: {
        width: 20,
        height: 20,
    },
    home: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
});
