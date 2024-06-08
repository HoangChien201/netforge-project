import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const LikeHistories = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Lịch sử thích</Text>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.infor}>
                    <Image source={require('../../media/quyet_icon/smile_p.png')} style={styles.avatar} />
                    <Icon name='like1' size={18} color={'blue'} style={styles.icon} />
                </View>
                <View style={styles.contain}>
                    <Text>Contain</Text>
                </View>
            </View>
        </View>
    )
}

export default LikeHistories

const styles = StyleSheet.create({
    container: {

    },
    header: {
        marginStart: 10
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500'
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        
    },
    infor: {
        alignItems: 'center',
        justifyContent: 'center',
        width:'20%',
        marginStart:10
    },
    avatar: {

    },
    icon: {
        position:'absolute',
        end:10,
        bottom:6
    },
    contain: {
        width:'75%'
    }
})