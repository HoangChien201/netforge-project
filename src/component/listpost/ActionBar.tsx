import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef, memo, useLayoutEffect, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { reaction } from '../../constant/emoji';
import * as Animatable from 'react-native-animatable';
import { deleteLikePost, likePost, updateLikePost } from '../../http/userHttp/getpost';
import ModalShare from '../share-post/ModalShare';
import {  useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useSendNotification } from '../../constant/notify';

const ActionBar = memo(({ creater, like_count,type, postId, comment_count, share_count,checkLike,setCheckLike, share }: {setCheckLike:(Value:boolean)=>void,checkLike?:boolean,type: number, postId?: number, comment_count?: number, share_count?: number,like_count?:number,share?: number,creater?:any }) => {
    
    const [shares, setShare] = useState(share);
    const navigation = useNavigation();
    const user = useSelector((state:RootState)=>state.user.value)
    const [islike, setIsLike] = useState(false);
    const [numberLike, setNumberLike] = useState<number>(like_count);
    const [number, setNumber] = useState<number | null>(type);
    const animationRef = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const {sendNReaction} = useSendNotification()
    
    const toggleModal = () => {
   
      setModalVisible(!isModalVisible);
      setShare(share)
    };
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
      }
    useLayoutEffect(()=>{
        setNumber(type)
        setNumberLike(like_count)
    },[type,like_count])
    

    const deleteLike = async (idPost: number) => {
        try {
            const result:any = await deleteLikePost(idPost, user.id);

        } catch (error) {
            console.log("lỗi like post", error);
            throw error;
        }
    };
    const likepost = async (idPost: number, type: number) => {
        try {
            const result = await likePost(idPost, type);

        } catch (error) {
            console.log("lỗi like post", error);
            throw error;
        }
    }; 
    const updatePost = async (idPost: number, type: number) => {
        try {
            const result:any = await updateLikePost(idPost,user.id, type);

        } catch (error) {
            console.log("lỗi like post", error);
            throw error;
        }
    };

    function format(like: number) {
        if (like >= 1000) {
            return (like / 1000).toFixed(1) + 'K';
        } else {
            return like;
        }
    }

    const OnPressIcon = () => {
        if (islike && checkLike) {
            animationRef.current?.fadeOutDown(500).then(() => {
                setIsLike(false)
                setCheckLike(false)  
            });
        } else {
                setIsLike(true)
                setCheckLike(true)
  
        }
    };


    const ViewReaction = (type: number,postId:number) => {
        const reactionMap = reaction.find(item => item.type === type);
        if (reactionMap) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <TouchableOpacity style={{padding:9}} onLongPress={OnPressIcon} onPress={() => {
                          deleteLike(postId)
                          setNumber(null)
                          numberLike === null ? setNumberLike(0) : setNumberLike((pre)=>pre-1)
                          setIsLike(false)
                          setCheckLike(false)
                    }
                      }>
                        <Image source={reactionMap.Emoji} style={{ width: 23, height: 23 }} />
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center',flex:1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 50, marginRight: 5,flex:1 }}>
                    {number === null ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                            <Pressable style={{padding:9}} onLongPress={OnPressIcon} onPress={() => {
                                setNumber(1);
                                likepost(postId, 1);
                                numberLike === null ? setNumberLike(1) : setNumberLike(()=>{
                                    
                                    const pre1 =parseInt(numberLike)+1
                                    return pre1
                                })
                                sendNReaction({postId,receiver:creater.id,reactionType:1})
                                setIsLike(false)
                            }}>
                                <AntDesignIcon name='like2' size={22} color='#000' />
                            </Pressable>
                        </View> :
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {ViewReaction(number,postId)}
                        </View>
                    }
                    <Text style={styles.text}>{numberLike === null ? 0 : numberLike}</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('CommentsScreen',{postId})} style={{ flexDirection: 'row',padding:6, alignItems: 'center', marginHorizontal: 20,flex:1,justifyContent:'center' }}>
                    <AntDesignIcon name='message1' size={24} color='#000' style={styles.comment} />
                    <Text style={styles.text}>{comment_count ? comment_count : 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5,flex:1,padding:6,justifyContent:'center' }}>
                    <AntDesignIcon name='sharealt' size={22} color='#000' style={styles.comment} />
                    <Text style={styles.text}>{share_count ? share_count : 0}</Text>
                </TouchableOpacity>
                <ModalShare creater={creater} isVisible={isModalVisible} onClose={toggleModal} idPost={postId} share= {shares}/>
            </View>
            {(islike && checkLike)  &&
           
                <Animatable.View
                    ref={animationRef}
                    animation="fadeInUp"
                    duration={100}
                    style={{ flexDirection: "row", position: 'absolute', bottom: 40, width: "74%", backgroundColor: '#fff', padding: 7, borderRadius: 20 }}
                >
                    {reaction.map((item, index) => {
                    
                        return (
                            <TouchableOpacity key={index} style={{ paddingHorizontal: 8 }} onPress={() => {
                                setNumber(item.type);
                                setIsLike(false)
                                numberLike === null ? setNumberLike(1) : setNumberLike((pre)=>{
                                    if(number !== null){
                                        return pre
                                    }
                                    const pre1 =parseInt(numberLike)+1
                                    return pre1
                                }) 
                               number === null ? likepost(postId, item.type):updatePost(postId,item.type)
                               sendNReaction({postId,receiver:creater.id,reactionType:item.type})
                            }}>
                                <Image source={item.Emoji} style={{ width: 23, height: 23, marginVertical: 6 }} />
    
                            </TouchableOpacity>
                        )
                        
                    })}
                </Animatable.View>
               
            }
        </View>
    );
});

export default ActionBar;

const styles = StyleSheet.create({
    container: {
       
        marginHorizontal: 20,
        marginVertical: 15,
        height: 40,
    },
    icon: {
        marginTop: 5,
        marginEnd: 5,
    },
    comment: {
        marginEnd: 15,
        marginTop: 5,
        width: 24, height: 23,
    },
    text: {
        marginTop: 5,
        
    },
});
