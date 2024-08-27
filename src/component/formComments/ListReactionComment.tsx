import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { EmojiData } from '../../constant/emoji'
import { getLikeCommentHTTP } from '../../http/ChienHTTP'
import { socket } from '../../http/SocketHandle'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ShowReactionCommentComponent from './ShowReactionCommentComponent'
export const REACTIONS_IMAGE = [
    {
        id: "1",
        name: "Like",
        Emoji: require('../../media/Dicons/thumb-up.png'),
        type: 1
    },
    {
        id: "2",
        name: "Haha",
        Emoji: require('../../media/Dicons/happy-face.png'),
        type: 2
    },
    {
        id: "3",
        name: "Haha",
        Emoji: require('../../media/Dicons/smile.png'),
        type: 3
    },
    {
        id: "4",
        name: "Tim",
        Emoji: require('../../media/Dicons/heartF.png'),
        type: 4
    },
    {
        id: "5",
        name: "Wow",
        Emoji: require('../../media/Dicons/wow.png'),
        type: 5
    },
    {
        id: "6",
        name: "Angry",
        Emoji: require('../../media/Dicons/angry.png'),
        type: 6
    },
]

export type reactionComment = {
    "id": number,
    "comment": number,
    "user": {
        "id": number,
        "fullname": string,
        "avatar": string
    },
    "reaction": number,
    "create_at": string,
    "update_at": string
}
const ListReactionComment = ({ comment,reactions }: { comment: number,reactions:Array<number> }) => {
    

    function ShowReactionOnPress(){
        bottomSheetModalRef.current?.present();
    }
    //--------bottomsheet
    const [commentSelected, setCommentSelected] = useState()
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    // // callbacks
    // useEffect(() => {
    //     if (commentSelected) {
    //         bottomSheetModalRef.current?.present();
    //     }
    // }, [commentSelected]);

    const handleSheetChanges = useCallback((index: number) => {
        if (index < 0) {
            setCommentSelected(undefined)
        }
    }, []);
    //---------bottomsheet

    return (
        <View>

            <TouchableOpacity onPress={ShowReactionOnPress}>
                <View style={[styles.container]}>
                    {
                        reactions.map((item) => {
                            const indexReaction = REACTIONS_IMAGE.find(itemIndex => itemIndex.type === item)
                            return (
                                <Image source={indexReaction?.Emoji} style={styles.icon} key={indexReaction?.id} />
                            )
                        })
                    }

                </View>
            </TouchableOpacity>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <ShowReactionCommentComponent comment={comment} />
            </BottomSheetModal>
        </View>
    )
}

export default ListReactionComment

const styles = StyleSheet.create({
    container: {

        height: 25,
        width: 140,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent:'flex-end',
        paddingHorizontal: 5,
    },
    reaction: {
        height: 20,
        width: 20,
        borderRadius: 20
    },
    icon: {
        width: 18,
        height: 18,
        marginLeft: -2
    }
})