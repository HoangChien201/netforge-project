import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ActionBar from './ActionBar';
import { DateOfTimePost } from '../../format/DateOfTimePost';
import ItemImg from './ItemImg';

const ItemPost = ({ index,data, setIsLike, islike,setActive,active }) => {
    const { creater, share_count, reaction, content, media, comment_count, create_at, id } = data;
  console.log("index",index);
  
    const handleItemPress = () => {
        setIsLike(false);
        if(active === index){
            setActive(null)
            console.log("hih",active+"df"+index);
            
        }else{
            setActive(index)
        }
      
    };

    return (
        <TouchableOpacity onPress={handleItemPress} activeOpacity={1} style={{marginBottom: 6, backgroundColor: "#fff"}}>
            <View style={styles.home}>
                <View style={styles.containerAvt}>
                    {/* <Image source={require('../../media/icon/phuking.jpg')} style={styles.avt} /> */}
                    <Image source={{uri:creater.avatar === null ? null:creater.avatar}} style={styles.avt} />
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
            <View style={{ marginHorizontal: 20, paddingBottom: media ? 0 : 20 }}>
                <Text style={{ color: 'black' }}>{content}</Text>
            </View>
            {media.length > 0 ? <ItemImg image={media} /> : null}
            <ActionBar setActive={setActive} active={active} index1={index} isLike={islike} postId={id} type={reaction} comment_count={comment_count} share_count={share_count} setIsLike={setIsLike} />
        </TouchableOpacity>
    );
};

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
