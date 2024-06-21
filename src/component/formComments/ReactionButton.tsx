import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { EmojiData } from '../../constant/emoji'

const ReactionButton = ({isVisible, onClose }) => {
    const [selectedReaction, setSelectedReaction] = useState(null);
    const handleReaction = (reaction) => {
        switch (reaction) {
            case 1:
                return console.log('like');
            case 2:
                return console.log('dislike');
            case 3:
                return console.log('wow');
            case 4:
                return console.log('haha');
            case 5:
                return console.log('Phẫn mộ');
            default:
                return console.log('Phẫn mộ');

        }
    }
    return (
        
       
                <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
                onRequestClose={onClose}
            >
                <TouchableOpacity style={styles.modalBackground}>
                    <View style={styles.reactionContainer}>
                        <TouchableOpacity onPress={() => handleReaction(1)} >
                            <Text>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction(2)}>
                        <Text>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction(3)}>
                        <Text>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction(4)}>
                        <Text>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction(5)}>
                        <Text>Like</Text>
                        </TouchableOpacity>
                       
                    </View>
                </TouchableOpacity>
            </Modal>
            
        
    )
}

export default ReactionButton

const styles = StyleSheet.create({})