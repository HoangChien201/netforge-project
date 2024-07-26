import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef, memo, useCallback, useMemo, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { reaction } from '../../constant/emoji';
import * as Animatable from 'react-native-animatable';
import { addLikeComments, deleteLikeComments, updateLikeComment } from '../../http/TuongHttp';
import { useMyContext } from '../navigation/UserContext';

const Reaction = memo(({ like_count, type, commentId, render, checkReaction, setCheckReaction }: {setCheckReaction:(Value:boolean)=>void,checkReaction?:boolean,type: number, commentId?: number,like_count?:number }) => {
    const [islike, setIsLike] = useState(false);
    const navigation = useNavigation();
    const { user } = useMyContext();
    const [numberLike, setNumberLike] = useState<number>(like_count);
    const [number, setNumber] = useState<number | null>(type);
    const animationRef = useRef(null);

    useLayoutEffect(() => {
        setNumber(type)
    }, [type])


    const DeleteLikeComment = async (commentId: number) => {
        try {
          
            const result: any = await deleteLikeComments(commentId, user.id);
            console.log(result);
            console.log('Xóa like thành công');


        } catch (error) {
            console.log("Lỗi khi xóa delete like", error);
            throw error;
        }
    };
    const addLikeComment = async (commentId: number, type: number) => {
        try {
            const result = await addLikeComments(commentId, type);
            
            console.log('Thêm like thành công');
            console.log(result);
        } catch (error) {
            console.log("Lỗi khi addlike", error);
            throw error;
        }
    };
    const updateLike = async (commentId: number, type: number) => {
        try {
            const result: any = await updateLikeComment(commentId, user.id, type);
            // console.log(result);
            // console.log(type);
            // console.log(commentId);
            // console.log(user.id);
            console.log('update like thành công');
        } catch (error) {
            console.log("Lỗi update like", error);
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
        if (islike && checkReaction) {
            animationRef.current?.fadeOutDown(500).then(() => {
                setIsLike(false);
               setCheckReaction(false)
               console.log('setcheck', setCheckReaction);
               console.log(checkReaction);
               
               


            });
        } else {
            setIsLike(true);
           setCheckReaction(true)
           console.log('setcheck2', setCheckReaction);
           console.log(checkReaction);
           

        }
    };


    const ViewReaction = (type: number, commentId: number) => {
        const reactionMap = reaction.find(item => item.type === type);
        if (reactionMap) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <TouchableOpacity onLongPress={OnPressIcon} onPress={() => {
                        DeleteLikeComment(commentId)
                        setNumber(null)
                        numberLike === null ? setNumberLike(0) : setNumberLike((pre) => parseInt(pre) - 1)
                        setIsLike(false)
                        setCheckReaction(false)                       
                    }
                    }>
                        <Image source={reactionMap.Emoji} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 50, marginRight: 5 }}>
                    {number === null ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                            <Pressable onLongPress={OnPressIcon} onPress={() => {
                                setNumber(1);
                                addLikeComment(commentId, 1);
                                numberLike === null ? setNumberLike(1) : setNumberLike(pre => (parseInt(pre.toString())) + 1)
                                setIsLike(false)
                            }}>
                                <AntDesignIcon name='like2' size={18} color='#000' />
                                {/* <Text style = {{ fontWeight: 'bold', fontSize: 14}}>Thích</Text> */}
                            </Pressable>
                        </View> :
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {ViewReaction(number, commentId)}
                        </View>
                    }
                    <Text style={styles.text}>{numberLike === null ? 0 : numberLike}</Text>
                </View>


            </View>
            {(islike && checkReaction) &&

                <Animatable.View
                    ref={animationRef}
                    animation="fadeInUp"
                    duration={100}
                    style={{
                        flexDirection: "row", position: 'absolute',
                        bottom: 30, right: -60,
                        backgroundColor: '#fff',
                        padding: 5,
                        borderRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                    }}
                >
                    {reaction.map((item, index) => {

                        return (
                            <TouchableOpacity key={index} style={{ paddingHorizontal: 5 }} onPress={() => {
                                setNumber(item.type);
                                setIsLike(false)
                                
                                    numberLike === null ? setNumberLike(1) : (numberLike == 0 && setNumberLike(pre=>pre+1) )
                                    number === null ? addLikeComment(commentId, item.type) : updateLike(commentId, item.type)
                             
                            }}>
                                <Image source={item.Emoji} style={{ width: 20, height: 20, marginVertical: 6 }} />
                            </TouchableOpacity>
                        )
                    })}
                </Animatable.View>

            }
        </View>
    );
});

export default Reaction;

const styles = StyleSheet.create({
    container: {
        marginLeft: 5
    },
    icon: {

    },
    text: {

    },
});
