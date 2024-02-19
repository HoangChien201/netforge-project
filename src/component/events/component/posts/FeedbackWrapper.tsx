import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import IconButton from './IconButton'
import { PostsItemType } from './PostsItem'

const FeedbackWrapper = ({posts}:{posts:PostsItemType}) => {
    const navigation=useNavigation()

    const {like,...remaining} = posts
    const [isLike, setIsLike] = useState(!!like)
    const [quantityLike,setQuantityLike]=useState(Math.floor(Math.random()*10))

    function IconLikeOnPress() {
        if(isLike){
            setIsLike(false)
            setQuantityLike(prev=>{
                return prev-1
            })
        }else{
            setIsLike(true)
            setQuantityLike(prev=>{
                return prev+1
            })

        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.flexRow]}>
                <View style={[styles.flexRow, { width: 80 }]}>
                    <IconButton name='heart' size={24} color={isLike ? '#ED2E7E' : '#ccc'} style={styles.icon} onPress={IconLikeOnPress}/>
                    <Text >{quantityLike}</Text>
                </View>
                <View style={styles.flexRow}>
                    {
                        <TouchableOpacity style={styles.icon} >
                            <Image source={require('../../../../media/icon/icon-comment-light.png')}/>
                        </TouchableOpacity>
                    }
                    <Text>{2}</Text>
                </View>
            </View>

        </View>
    )
}

export default FeedbackWrapper

const styles = StyleSheet.create({
    container: {
        height: 78,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: "center",

    },
    icon: {
        marginEnd: 5,
    }
})
