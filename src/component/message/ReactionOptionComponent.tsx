import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { EmojiReaction, reaction } from '../../constant/emoji'
import { reactionType } from './MessageItem'
import { useMyContext } from '../navigation/UserContext'
import { MessageCordinatesType } from '../../screens/message/MessageScreen'

const HEIGHT_DEFAULT = 40
const STATUS_ADD_REACTION = 1
const STATUS_CHANGE_REACTION = 2
const STATUS_REMOVE_REACTION = 3
const ReactionOptionComponent = ({ ontionOnpress, reactionOfMsg, messageCordinates,setSelectedMessage }: { ontionOnpress?: any, reactionOfMsg: Array<reactionType>, messageCordinates: MessageCordinatesType,setSelectedMessage:any }) => {
    const { user } = useMyContext()
    const [reactionActive, setReactionActive] = useState(reactionOfMsg ? reactionOfMsg.find(reaction => reaction.user.toString() === user.id.toString()) : undefined)
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
                status: STATUS_ADD_REACTION,
                reactionCurrent
            })

            return
        }

        //trường hợp chọn reaction đã chọn => xóa reaction
        if (+reactionActive.reaction === +index) {
            setReactionActive(undefined)
            ontionOnpress({
                status: STATUS_REMOVE_REACTION,
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
            status: STATUS_CHANGE_REACTION,
            reactionCurrent
        })
    }



    return (
        <View style={styles.container}>
            {
                EmojiReaction.map((reaction, index) => {
                    console.log('source',reaction.source);
                    
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={OptionOnPress.bind(this, index)}
                            style={[styles.reactionWrapper,
                            { backgroundColor: reactionActive?.reaction === index ? '#fff' : 'rgba(150,150,150,0)' }
                            ]
                            }>
                            <Image style={styles.reaction} source={reaction.source} />
                        </TouchableOpacity>

                    )
                })
            }

        </View>
    )
}

export default ReactionOptionComponent

const styles = StyleSheet.create({
    reactionWrapper: {

        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reaction: {
        width: 40,
        height: 40
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 50,
        flexDirection: 'row',
        gap: 8,
        padding: 8,
    }
})