import { Image, Pressable, StyleSheet, Animated, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import ActionBar from './ActionBar';
import { DateOfTimePost } from '../../format/DateOfTimePost';
import ItemImg from './ItemImg';
import { useMyContext } from '../navigation/UserContext';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { SharePost } from '../../http/userHttp/getpost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalFriendProfile from '../profile/FriendProfile';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';

import { deletePost } from '../../http/QuyetHTTP'
import AxiosInstance from '../../http/AxiosInstance';
const ItemPost = memo(({ index, data, onrefresh, userId, onPressProfile, setShowModalEdit, setSelectedId, showDelete, setShowDelete }) => {
    const { creater, share_count, reaction, content, media, comment_count, create_at, id, like_count, share } = data;
    const [checkLike, setCheckLike] = useState(false);
    const [shareId, setshareId] = useState(null);
    const [postsShares, setPostShare] = useState({});
    const { user } = useMyContext();
    const menu = useRef(new Animated.Value(0)).current;
    const [hidden, setHidden] = useState(false);
    console.log("ItemPost1s");
    //
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const loggedInUserId = user.id;

    useEffect(() => {
        if (share) {
            setshareId(share);
            const getPostShare = async () => {
                const token = await AsyncStorage.getItem('userToken');
                const result = await SharePost(share.id);
                setPostShare(result);

            }
            getPostShare();
        }
    }, [share]);

    const hiddenMenu = () => {
        Animated.timing(menu, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => setHidden(true));
    };

    const hiddenMenu1 = () => {
        Animated.timing(menu, {
            toValue: 5,
            duration: 100,
            useNativeDriver: true,
        }).start(() => setHidden(false));
    };


    const formatContent = useMemo(() => {
        const format = content?.split(/@\[([^\]]+)\]\(\d+\)/g);
        return (
            <View style={{ marginHorizontal: 20, paddingBottom: media.length > 0 ? 0 : 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                {format?.map((fomat, index) => (
                    <Text
                        key={`${fomat}-${index}`}
                        style={{ color: 'black', fontWeight: index % 2 === 1 ? 'bold' : 'normal' }}
                    >
                        {fomat}
                    </Text>
                ))}
            </View>
        );
    }, [content, media]);

    const formatContents = useMemo(() => {
        const format = postsShares?.content?.split(/@\[([^\]]+)\]\(\d+\)/g);
        return (
            <View style={{ marginHorizontal: 20, paddingBottom: postsShares?.media?.length ? 0 : 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                {format?.map((fomat, index) => (
                    <Text
                        key={`${fomat}-${index}`}
                        style={{ color: 'black', fontWeight: index % 2 === 1 ? 'bold' : 'normal' }}
                    >
                        {fomat}
                    </Text>
                ))}
            </View>
        );
    }, [postsShares?.content, media]);

    const handleItemPress = () => {
        hiddenMenu1();
        setCheckLike(false);
    };

    const handleToProfile = (userId: React.SetStateAction<null>) => {
        if (userId === loggedInUserId) {
            navigation.navigate(ProfileRootStackEnum.ProfileScreen);
        } else {
            navigation.navigate(ProfileRootStackEnum.FriendProfile, { userId });
        }
    };


    const handleEdit = () => {
        setSelectedId(id);
        setShowModalEdit(true);
        setHidden(false);
    };
    const handleDelete = () => {
        setSelectedId(id);
        setShowDelete(true);
        setHidden(false);
    };
    return (
        <Pressable onPress={handleItemPress} style={{ margin: 5, marginBottom: 6, backgroundColor: "#fff" }}>
            {shareId ? (
                <>
                    <View style={styles.home1}>
                        <View style={styles.containerAvt}>
                            <TouchableOpacity onPress={() => handleToProfile(creater.id)} style={styles.containerAvt}>
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
                            </TouchableOpacity>
                        </View>
                        <View>
                            {user.id === creater.id && (
                                <TouchableOpacity onPress={hiddenMenu}>
                                    <Image source={require('../../media/Dicons/ellipsis.png')} style={styles.ellips} />
                                </TouchableOpacity>
                            )}
                            {hidden && (
                                <Animated.View style={[styles.menu, { transform: [{ translateY: menu }], }]}>
                                    <View style={{ height: '100%', width: '100%', backgroundColor: '#fff', padding: 2, borderRadius: 5, borderWidth: 0.5, borderColor: '#fff' }}>
                                        <TouchableOpacity style={[styles.buttonMenu]}
                                            onPress={handleDelete}
                                        >
                                            <Text style={styles.textMenu}>Xóa</Text>
                                            <AntDesignIcon name='close' size={18} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonMenu}
                                            onPress={handleEdit}
                                        >
                                            <Text style={styles.textMenu}>
                                                Sửa
                                            </Text>
                                            <AntDesignIcon name='sync' size={18} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                            )}
                        </View>
                    </View>
                    {
                        content.length > 0 && <View style={styles.sharedContent}>
                            {formatContent}
                        </View>
                    }
                    <View style={styles.sharedPost}>
                        <View style={styles.home}>
                            <View style={styles.containerAvt}>
                                <TouchableOpacity style={styles.containerAvt} onPress={() => handleToProfile(postsShares?.creater?.id)}>
                                    {postsShares?.creater?.avatar ? (
                                        <Image source={{ uri: postsShares?.creater?.avatar }} style={styles.avt} />
                                    ) : (
                                        <Image source={require('../../media/Dicons/nguoidung.jpg')} style={styles.avt} />
                                    )}
                                    <View>
                                        <Text style={[styles.nameUser, { marginTop: postsShares?.creater?.fullname ? 0 : 15 }]}>{postsShares?.creater?.fullname || "Người dùng"}</Text>
                                        <View style={styles.postInfo}>
                                            <Text style={styles.postDate}>{postsShares?.create_at ? DateOfTimePost(postsShares?.create_at) : null}</Text>
                                            {postsShares?.create_at ? <Image source={require('../../media/icon/icon-hour-light.png')} /> : null}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            postsShares?.content?.length > 0 ? <View style={styles.sharedPostContainer}>
                                {formatContents}
                            </View> : <View style={{ padding: 5 }}>
                                <Text style={{ textAlign: 'center' }}> Bài viết này đã được xóa </Text>
                            </View>
                        }
                        {postsShares?.media?.length > 0 && <ItemImg image={postsShares?.media} />}
                    </View>
                    <ActionBar share={share.id} checkLike={checkLike} setCheckLike={setCheckLike} postId={id} type={reaction} comment_count={comment_count} share_count={share_count} like_count={like_count} />
                </>
            ) : (
                <>
                    <View style={styles.home}>
                        <View style={styles.containerAvt}>
                            <TouchableOpacity style={styles.containerAvt} onPress={() => handleToProfile(creater.id)}>
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
                            </TouchableOpacity>
                        </View>
                        <View>
                            {user.id === creater.id && (
                                <TouchableOpacity onPress={hiddenMenu}>
                                    <Image source={require('../../media/Dicons/ellipsis.png')} style={styles.ellips} />
                                </TouchableOpacity>
                            )}
                            {hidden && (
                                <Animated.View style={[styles.menu, { transform: [{ translateY: menu }], }]}>
                                    <View style={{ height: '100%', width: '100%', backgroundColor: '#fff', padding: 2, borderRadius: 5, borderWidth: 0.5, borderColor: '#fff' }}>
                                        <TouchableOpacity style={[styles.buttonMenu]}
                                            onPress={handleDelete}
                                        >
                                            <Text style={styles.textMenu}>Xóa</Text>
                                            <AntDesignIcon name='close' size={18} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonMenu}
                                            onPress={handleEdit}
                                        >
                                            <Text style={styles.textMenu}>
                                                Sửa
                                            </Text>
                                            <AntDesignIcon name='sync' size={18} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                            )}
                        </View>
                    </View>
                    {formatContent}
                    {media.length > 0 && <ItemImg image={media} />}
                    <ActionBar checkLike={checkLike} setCheckLike={setCheckLike} postId={id} type={reaction} comment_count={comment_count} share_count={share_count} like_count={like_count} />
                </>
            )}

        </Pressable>
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
        padding: 10,
    },
    home1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    buttonMenu: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-around',

    },
    textMenu: {
        fontWeight: 'bold',
        color: 'black'
    },
    menu: {
        padding: 5,
        backgroundColor: '#E9E6E6',
        zIndex: 999,
        position: 'absolute',
        width: 100,
        height: 75,

        right: 0,
        top: 15,
        borderWidth: 0.6,

    },
    sharedContent: {
        margin: 0,
    },
    sharedPost: {
        borderWidth: 0.2,
        borderTopEndRadius: 8,
        margin: 5,
        borderTopStartRadius: 8,
    },
    postInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },
    postDate: {
        marginRight: 10,
    },
    sharedPostContainer: {

    },
});
