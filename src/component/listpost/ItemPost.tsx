import React, { memo, useEffect, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ActionBar from './ActionBar';
import { DateOfTimePost } from '../../format/DateOfTimePost';
import ItemImg from './ItemImg';
import { SharePost } from '../../http/userHttp/getpost';
import { ProfileRootStackEnum } from '../stack/ProfileRootStackParams';
import { emotions } from '../../constant/emoji';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ItemPost = memo(({ data, setShowModalEdit, setSelectedId, setShowDelete }) => {

    const user = useSelector((state : RootState)=>state.user.value)

    const [checkLike, setCheckLike] = useState(false);
    const [datas, setData] = useState(data);
    const [shareId, setshareId] = useState(null);
    const [postsShares, setPostShare] = useState({});
    const [renderShare, setRenderShare] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const loggedInUserId = user?.id;

    useEffect(() => {
        setData(data)
    }, [data])

    const { creater, share_count, reaction, content, media, comment_count, create_at, id, like_count, share, emotion } = datas;

    useEffect(() => {
        setRenderShare(false)
        if (share) {
            setshareId(share);
            const getPostShare =  async () => {
                const token = await AsyncStorage.getItem('userToken');
                const result = await SharePost(share.id);
                setPostShare(result);
                setRenderShare(true)
            }
            getPostShare();
        }
    }, [share]);

    const hiddenMenu = () => {
        setIsModalVisible(true);
    };

    const hiddenMenu1 = () => {
        setIsModalVisible(false);
    };


    const formatContent = useMemo(() => {
        const format = content?.split(/@\[([^\]]+)\]\(\d+\)/g);
        return (
            <View style={{ marginHorizontal: 20, paddingBottom: media?.length > 0 ? 0 : 10, flexDirection: 'row', flexWrap: 'wrap' }}>
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

    const ViewReaction = () => {
        const reactionMap = emotions.find(item => item.type === emotion);
        if (reactionMap) {
            return (
                <>
                    <Text style={{ color: '#000', marginLeft: 5, fontWeight: '400' }}>{reactionMap.Emoji}{" "}{reactionMap.title}</Text>
                </>
            );
        }
        return null;
    };

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
        setSelectedId(datas);
        setShowModalEdit(true);

        hiddenMenu1();
        //setHidden(false);

    };

    const handleDelete = () => {
        setSelectedId(id);
        setShowDelete(true);

        hiddenMenu1();
        //setHidden(false);
    };

    return (
        <Pressable onPress={handleItemPress} style={{ margin: 5, marginBottom: 6, backgroundColor: "#fff" }}>
            {shareId && renderShare ? (
                <>
                    <View style={styles.home1}>
                        <View style={styles.containerAvt}>
                            <TouchableOpacity onPress={() => handleToProfile(creater.id)} style={styles.containerAvt}>
                                {creater.avatar &&
                                    <Image source={{ uri: creater.avatar }} style={styles.avt} />
                                }
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.nameUser}>{creater.fullname === null ? "Người dùng" : creater.fullname}</Text>
                                        <ViewReaction />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
                                        <Text style={{ marginRight: 10 }}>{DateOfTimePost(create_at)}</Text>
                                        <Image source={require('../../media/icon/icon-hour-light.png')} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {user?.id === creater.id && (
                                <TouchableOpacity onPress={hiddenMenu}>
                                    <Image source={require('../../media/Dicons/ellipsis.png')} style={styles.ellips} />
                                </TouchableOpacity>
                            )}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isModalVisible}
                                onRequestClose={() => setIsModalVisible(false)}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={hiddenMenu1}>
                                    <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                                        <TouchableOpacity style={styles.buttonMenu} onPress={handleDelete}>
                                            <View style={{ marginHorizontal: 10, marginRight: 20, backgroundColor: 'rgba(0,0,0,0.2)', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                                <AntDesignIcon name='close' size={18} color="black" />
                                            </View>
                                            <Text style={styles.textMenu}>Xóa bài viết</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonMenu} onPress={handleEdit}>
                                            <View style={{ marginHorizontal: 10, marginRight: 20, backgroundColor: 'rgba(0,0,0,0.2)', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                                <AntDesignIcon name='sync' size={18} color="black" />
                                            </View>
                                            <Text style={styles.textMenu}>Sửa bài viết</Text>

                                        </TouchableOpacity>

                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </Modal>
                        </View>
                    </View>
                    {content.length > 0 && (
                        <View style={styles.sharedContent}>
                            {formatContent}
                        </View>
                    )}
                    {
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
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.nameUser, { marginTop: postsShares?.creater?.fullname ? 0 : 15 }]}>{postsShares?.creater?.fullname || "Người dùng"}</Text>
                                                <ViewReaction />
                                            </View>

                                            <View style={styles.postInfo}>
                                                <Text style={styles.postDate}>{postsShares?.create_at ? DateOfTimePost(postsShares?.create_at) : null}</Text>
                                                {postsShares?.create_at ? <Image source={require('../../media/icon/icon-hour-light.png')} /> : null}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {postsShares?.content?.length > 0 ? (
                                <View style={styles.sharedPostContainer}>
                                    {formatContents}
                                </View>
                            ) : (
                                <View style={{ padding: 5 }}>
                                    <Text style={{ textAlign: 'center' }}>Bài viết này đã được xóa</Text>
                                </View>
                            )}
                            {postsShares?.media?.length > 0 && <ItemImg image={postsShares?.media} />
                            }
                        </View>
                    }
                    <ActionBar creater={creater} share={share.id} checkLike={checkLike} setCheckLike={setCheckLike} postId={id} type={reaction} comment_count={comment_count} share_count={share_count} like_count={like_count} />
                </>
            ) : (
                <>
                    <View style={styles.home}>
                        <View style={styles.containerAvt}>
                            <TouchableOpacity style={styles.containerAvt} onPress={() => handleToProfile(creater.id)}>
                                {creater?.avatar && 
                                    <Image source={{ uri: creater.avatar }} style={styles.avt} />
                                }                                
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.nameUser}>{creater?.fullname === null ? "Người dùng" : creater?.fullname}</Text>
                                        <ViewReaction />
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3 }}>
                                        <Text style={{ marginRight: 10 }}>{DateOfTimePost(create_at)}</Text>
                                        <Image source={require('../../media/icon/icon-hour-light.png')} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {user?.id === creater.id && (
                                <TouchableOpacity onPress={hiddenMenu}>
                                    <Image source={require('../../media/Dicons/ellipsis.png')} style={styles.ellips} />
                                </TouchableOpacity>
                            )}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isModalVisible}
                                onRequestClose={() => setIsModalVisible(false)}
                            >
                                <TouchableOpacity style={styles.modalOverlay} onPress={hiddenMenu1}>
                                    <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                                        <TouchableOpacity style={styles.buttonMenu} onPress={handleDelete}>
                                            <View style={{ marginHorizontal: 10, marginRight: 20, backgroundColor: 'rgba(0,0,0,0.2)', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                                <AntDesignIcon name='close' size={18} color="black" />
                                            </View>
                                            <Text style={styles.textMenu}>Xóa bài viết</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonMenu} onPress={handleEdit}>
                                            <View style={{ marginHorizontal: 10, marginRight: 20, backgroundColor: 'rgba(0,0,0,0.2)', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                                <AntDesignIcon name='sync' size={18} color="black" />
                                            </View>
                                            <Text style={styles.textMenu}>Sửa bài viết</Text>

                                        </TouchableOpacity>

                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </Modal>
                        </View>
                    </View>
                    {formatContent}
                    {media.length > 0 && <ItemImg image={media} />}
                    <ActionBar creater={creater} checkLike={checkLike} setCheckLike={setCheckLike} postId={id} type={reaction} comment_count={comment_count} share_count={share_count} like_count={like_count} />
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
        alignItems: 'center'

    },
    textMenu: {
        fontWeight: 'bold',
        color: 'black',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,

        width: '100%',

    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
