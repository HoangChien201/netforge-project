import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { reaction } from '../../constant/emoji';
import * as Animatable from 'react-native-animatable';

const ActionBar = ({type}:{type:number}) => {
    const [islike, setIsLike] = useState<boolean>(false);
    const [nameReaction, setNameReaction] = useState(null);
    const [numberLike, setNumberLike] = useState<number>(1000);
    const [number, setNumber] = useState<number>(type);
    const animationRef = useRef(null);

    function format(like: number) {
        if (like === 1000) {
            return 1 + 'K';
        } else if (like === 10000) {
            return 10 + 'k';
        } else {
            return like;
        }
    }

    const OnPressIcon = () => {
        if (islike) {

            animationRef.current?.fadeOutDown(500).then(() => {
                setIsLike(false);
            });
        } else {
            setIsLike(true);
        }
    };
    const ViewReaction = (type: number) => {
        switch (type) {
            case 1:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <TouchableOpacity onLongPress={OnPressIcon} onPress={() => { setNameReaction(null) }}>
                            <Image source={reaction[0].Emoji} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <TouchableOpacity onLongPress={OnPressIcon} onPress={() => { setNameReaction(null) }}>
                            <Image source={reaction[1].Emoji} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 3:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <TouchableOpacity onLongPress={OnPressIcon} onPress={() => { setNameReaction(null) }}>
                            <Image source={reaction[2].Emoji} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 4:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <TouchableOpacity onLongPress={OnPressIcon} onPress={() => { setNameReaction(null) }}>
                            <Image source={reaction[3].Emoji} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 5:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <TouchableOpacity onLongPress={OnPressIcon} onPress={() => { setNameReaction(null) }}>
                            <Image source={reaction[4].Emoji} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 6:
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <TouchableOpacity onLongPress={OnPressIcon} onPress={() => { setNameReaction(null) }}>
                            <Image source={reaction[5].Emoji} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                )
                break;

            default: null
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 50, marginRight: 5 }}>
                    {number === null ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                            <TouchableOpacity onLongPress={OnPressIcon} onPress={() => {
                                setNameReaction(require('../../media/Dicons/thumb-up.png'))
                                setNumber(1)
                            }}>
                                <Image source={require('../../media/Dicons/like.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View> : ViewReaction(number) 

                    }
                    <Text style={styles.text}>{format(numberLike)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                    <Image source={require('../../media/Dicons/chat-bubble.png')} style={styles.comment} />
                    <Text style={styles.text}>100</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                    <Image source={require('../../media/Dicons/send.png')} style={styles.comment} />
                    <Text style={styles.text}>100</Text>
                </View>
            </View>
            {
                islike &&
                <Animatable.View
                    ref={animationRef}
                    animation="fadeInUp"
                    duration={500}
                    style={{ flexDirection: "row", position: 'absolute', bottom: 40, width: "84%", backgroundColor: '#fff', padding: 7, borderRadius: 20 }}
                >
                    {
                        reaction.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ paddingHorizontal: 8 }} onPress={() => {
                                    setNumber(item.type)
                                    setNameReaction(item.Emoji);
                                    setIsLike(false);
                                }}>
                                    <Image source={item.Emoji} style={{ width: 25, height: 25, marginVertical: 6 }} />
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </Animatable.View>
            }
        </View>
    );
}

export default ActionBar;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        marginHorizontal: 20,
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
