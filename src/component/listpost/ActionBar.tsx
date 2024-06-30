import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef, memo, useCallback, useMemo, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { reaction } from '../../constant/emoji';
import * as Animatable from 'react-native-animatable';
import { deleteLikePost, likePost, updateLikePost } from '../../http/userHttp/getpost';
import { useMyContext } from '../navigation/UserContext';

const ActionBar = memo(({onPressProfile, like_count,type, postId, comment_count, share_count,checkLike,setCheckLike }: {setCheckLike:(Value:boolean)=>void,checkLike?:boolean,type: number, postId?: number, comment_count?: number, share_count?: number,like_count?:number }) => {
    const [islike, setIsLike] = useState(false);
    const navigation = useNavigation();
    const {user}= useMyContext()
    const [numberLike, setNumberLike] = useState<number>(like_count);
    const [number, setNumber] = useState<number | null>(type);
    const animationRef = useRef(null);
    function navigationScreen(screen: string) {
        navigation.navigate(`${screen}`)
      }
    useLayoutEffect(()=>{
        setNumber(type)
    },[type])
    

    const deleteLike = async (idPost: number) => {
        try {
            console.log("user_idde",user.id);
            console.log("ahihi", idPost);
            const result:any = await deleteLikePost(idPost, user.id);
            if (result) {
                console.log("ahihi", idPost);
            }
        } catch (error) {
            console.log("lỗi like post", error);
            throw error;
        }
    };
    const likepost = async (idPost: number, type: number) => {
        try {
            const result = await likePost(idPost, type);
            if (result) {
                console.log("ahihi", idPost);
            }
        } catch (error) {
            console.log("lỗi like post", error);
            throw error;
        }
    }; 
    const updatePost = async (idPost: number, type: number) => {
        try {
            const result:any = await updateLikePost(idPost,user.id, type);
            if (result) {
                console.log("ahihi", idPost);
            }
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
                setIsLike(false);
                setCheckLike(false)
                
                
            });
        } else {
                setIsLike(true);
                setCheckLike(true)
  
        }
    };


    const ViewReaction = (type: number,postId:number) => {
        const reactionMap = reaction.find(item => item.type === type);
        if (reactionMap) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <TouchableOpacity onLongPress={OnPressIcon} onPress={() => {
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 50, marginRight: 5 }}>
                    {number === null ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                            <Pressable onLongPress={OnPressIcon} onPress={() => {
                                setNumber(1);
                                likepost(postId, 1);
                                numberLike === null ? setNumberLike(1) : setNumberLike(pre=>pre+1)
                                setIsLike(false)
                            }}>
                                <AntDesignIcon name='like2' size={22} color='#000' />
                            </Pressable>
                        </View> :
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {ViewReaction(number,postId)}
                        </View>
                    }
                    <Text style={styles.text}>{numberLike === null ? 0 : format(numberLike)}</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('CommentsScreen',{postId, numberLike, onPressProfile})} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <AntDesignIcon name='message1' size={24} color='#000' style={styles.comment} />
                    <Text style={styles.text}>{comment_count ? comment_count : 0}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                    <AntDesignIcon name='sharealt' size={22} color='#000' style={styles.comment} />
                    <Text style={styles.text}>{share_count ? share_count : 0}</Text>
                </View>
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
                                numberLike === null ? setNumberLike(1) : setNumberLike(pre=>pre+1) 
                               number === null ? likepost(postId, item.type):updatePost(postId,item.type)
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
        marginEnd: 5,
        marginTop: 5,
        width: 23, height: 23,
    },
    text: {
        marginTop: 5,
    },
});
