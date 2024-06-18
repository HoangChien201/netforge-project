import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { reaction } from '../../constant/emoji';
import * as Animatable from 'react-native-animatable';
import { likePost } from '../../http/userHttp/getpost';

const ActionBar = ({   setIsLike , isLike,type, postId, comment_count, share_count,index1,active,setActive }: {setActive:(value:number)=>void,index1:number,active:number|null,setIsLike:(value:boolean)=>void ,isLike:boolean,type: number, postId: number, comment_count: number, share_count: number }) => {
    const navigation = useNavigation();
    
    const [nameReaction, setNameReaction] = useState(null);
    const [numberLike, setNumberLike] = useState<number>(1000);
    const [number, setNumber] = useState<number | null>(type);
    const animationRef = useRef(null);

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

    function format(like: number) {
        if (like >= 1000) {
            return (like / 1000).toFixed(1) + 'K';
        } else {
            return like.toString();
        }
    }

    const OnPressIcon = () => {
        if (isLike) {
            animationRef.current?.fadeOutDown(500).then(() => {
                setIsLike(false);
                
            });
        } else {
            setActive(index1)
            setIsLike(true);
        }
    };

    const ViewReaction = (type: number) => {
        const reactionMap = reaction.find(item => item.type === type);
        if (reactionMap) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <TouchableOpacity onLongPress={OnPressIcon} onPress={() => setNumber(null)}>
                        <Image source={reactionMap.Emoji} style={{ width: 24, height: 24 }} />
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
                            <TouchableOpacity onLongPress={OnPressIcon} onPress={() => {
                                setNameReaction(require('../../media/Dicons/thumb-up.png'));
                                setNumber(1);
                                likepost(postId, 1);
                            }}>
                                <AntDesignIcon name='like2' size={24} color='#000' />
                            </TouchableOpacity>
                        </View> :
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            {ViewReaction(number)}
                        </View>
                    }
                    <Text style={styles.text}>{format(numberLike)}</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <AntDesignIcon name='message1' size={24} color='#000' style={styles.comment} />
                    <Text style={styles.text}>{comment_count ? comment_count : 0}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                    <AntDesignIcon name='sharealt' size={24} color='#000' style={styles.comment} />
                    <Text style={styles.text}>{share_count ? share_count : 0}</Text>
                </View>
            </View>
            {isLike &&index1===active &&
                <Animatable.View
                    ref={animationRef}
                    animation="fadeInUp"
                    duration={200}
                    style={{ flexDirection: "row", position: 'absolute', bottom: 40, width: "74%", backgroundColor: '#fff', padding: 7, borderRadius: 20 }}
                >
                    {reaction.map((item, index) => (
                        <TouchableOpacity key={index} style={{ paddingHorizontal: 8 }} onPress={() => {
                            setNumber(item.type);
                            setNameReaction(item.Emoji);
                            setIsLike(false);
                            likepost(postId, item.type);
                        }}>
                            <Image source={item.Emoji} style={{ width: 25, height: 25, marginVertical: 6 }} />

                        </TouchableOpacity>
                    ))}
                </Animatable.View>
            }
        </View>
    );
};

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
