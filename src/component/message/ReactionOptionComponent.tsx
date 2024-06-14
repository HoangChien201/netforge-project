import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { EmojiReaction } from '../../constant/emoji'

const HEIGHT_DEFAULT = 40
const ReactionOptionComponent = ({ show,ontionOnpress }: { show: boolean,ontionOnpress:any }) => {
    const opacityCurrent = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    
    function OptionOnPress(index:number){
        console.log('reaction');
        
        const reaction=index
        ontionOnpress(reaction)
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
            opacity:opacityCurrent,
            height:show ? HEIGHT_DEFAULT :0
          },]}>
            {
                EmojiReaction.map((reaction, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={OptionOnPress.bind(this,index)}>
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
    reaction: {
        fontSize: 25
    },
    container: {
        position: "absolute",
        top: -50,
        left: 10,
        height: 0,
        width: 200,
        backgroundColor: 'rgba(99,99,99,0.8)',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})