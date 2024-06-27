import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { addLikeComments } from '../../http/TuongHttp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReactionButton = ({ isVisible, onClose, onSelectReaction, comment }) => {
    const reactions = [
        { id: 1, name: 'like', source: require('../../media/Dicons/thumb-up.png')},
        { id: 2, name: 'haha', source: require('../../media/Dicons/happy-face.png')},
        { id: 3, name: 'happy', source: require('../../media/Dicons/smile.png') },
        { id: 4, name: 'love', source: require('../../media/Dicons/heartF.png')},
        { id: 5, name: 'wow', source: require('../../media/Dicons/wow.png')},
        { id: 6, name: 'hot', source: require('../../media/Dicons/angry.png')},

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
            console.log(reponse);
            console.log('idcomment',comment.id);
            console.log('Selected Reaction ID:', reaction.id);
     } catch (error) {
        console.log('like comment:',error);
        
     }
    };
    return (

        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            animationType="fade"
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.reactionPopupContainer}>
                    {reactions.map(reaction => (
                        <TouchableOpacity key={reaction.id} onPress={() => handleReactionSelect(reaction)}>
                            <Image source={reaction.source} style={styles.reactionIcon} />
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>

    )
}

export default ReactionButton

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reactionPopupContainer: {
        height: 50,
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    reactionIcon: {
        width: 25,
        height: 25,
        marginHorizontal: 5,
    },
})