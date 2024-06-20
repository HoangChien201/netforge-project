import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { EmojiReaction } from '../../constant/emoji'
import { MESSAGES_DEFAULT, user } from '../../screens/message/MessageScreen'
import { reactionType } from './MessageItem'

const HEIGHT_DEFAULT = 40
const STATUS_ADD_REACTION=1
const STATUS_CHANGE_REACTION=2
const STATUS_REMOVE_REACTION=3
const ReactionOptionComponent = ({ show, ontionOnpress, reactionOfMsg }: { show: boolean, ontionOnpress: any, reactionOfMsg: Array<reactionType> }) => {
    const opacityCurrent = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const [reactionActive, setReactionActive] = useState(reactionOfMsg ?  reactionOfMsg.find(reaction => reaction.user.toString() === user.id.toString()) : undefined)
    //get react of user
    useEffect(() => {

    }, [reactionOfMsg])



    function OptionOnPress(index: number) {
        const reactionCurrent = {
            user: user.id,
            reaction: index
        }
        //trường hợp chưa chọn reaction
        if (!reactionActive) {
            setReactionActive(() => {
                return reactionCurrent
            })
            ontionOnpress({
                status:STATUS_ADD_REACTION,
                reactionCurrent
            })
            return
        }

        //trường hợp chọn reaction đã chọn => xóa reaction
        if (+reactionActive.reaction === +index) {
            setReactionActive(undefined)
            ontionOnpress({
                status:STATUS_REMOVE_REACTION,
                reactionCurrent
            })
            return
        }

        //trường hợp chọn reaction khác
        setReactionActive((prevValue) => {
            if (prevValue)
                return { ...prevValue, ...reactionCurrent }
        })
        ontionOnpress({
            status:STATUS_CHANGE_REACTION,
            reactionCurrent
        })
    }

    useEffect(() => {
        //show
        if (show) {
            Animated.timing(opacityCurrent, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start();
            return
        }

        //close
        Animated.timing(opacityCurrent, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
        }).start();
    }, [show]);


    return (
        <Animated.View style={[styles.container, {
            opacity: opacityCurrent,
            height: show ? HEIGHT_DEFAULT : 0
        },]}>
            {
                EmojiReaction.map((reaction, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={OptionOnPress.bind(this, index)}
                            style={[styles.reactionWrapper,
                            { backgroundColor: reactionActive?.reaction === index ? 'rgba(99,99,99,1)' : 'rgba(150,150,150,0)' }
                            ]
                            }>
                            <Text style={styles.reaction}>{reaction}</Text>
                        </TouchableOpacity>

                    )
                })
            }

        </Animated.View>
    )
}

export default ReactionOptionComponent

const styles = StyleSheet.create({
    reactionWrapper: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reaction: {
        fontSize: 25
    },
    container: {
        width: 200,
        backgroundColor: 'rgba(150,150,150,1)',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10
    }
})