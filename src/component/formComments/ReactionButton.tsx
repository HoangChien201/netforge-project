import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { addLikeComments } from '../../http/TuongHttp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReactionButton = ({ isVisible, onClose, onSelectReaction, comment, render }) => {
    const reactions = [
        { id: 1, name: 'like', source: require('../../media/Dicons/thumb-up.png')},
        { id: 2, name: 'haha', source: require('../../media/Dicons/happy-face.png')},
        { id: 3, name: 'happy', source: require('../../media/Dicons/smile.png') },
        { id: 4, name: 'love', source: require('../../media/Dicons/heartF.png')},
        { id: 5, name: 'wow', source: require('../../media/Dicons/wow.png')},
        { id: 6, name: 'nóng giận', source: require('../../media/Dicons/angry.png')},

    ];
    
    const handleReactionSelect = async (reaction) => { 
        onSelectReaction(reaction);
        onClose();
     try {
        const data = {
            comment: comment.id,
            reaction: reaction.id
           }
            const reponse = await addLikeComments(data.comment, data.reaction);
            render()
            
     } catch (error) {
        console.log('like comment:',error);
        
     }
    };
    return (
       <>
       {
        isVisible &&(
         <TouchableOpacity
         onPress={onClose}
            style = {{position: 'absolute', zIndex: 1, left: 20}}
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
                <View style={[styles.reactionPopupContainer]}>
                    {reactions.map(reaction => (
                        <TouchableOpacity key={reaction.id} onPress={() => handleReactionSelect(reaction)}>
                            <Image source={reaction.source} style={styles.reactionIcon} />
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
        )
       }
       </>
    )
}

export default ReactionButton

const styles = StyleSheet.create({

    modalOverlay: {
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        left: 20,
       
    },
    reactionPopupContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    reactionIcon: {
        width: 22,
        height: 22,
        marginHorizontal: 5,
    },
})