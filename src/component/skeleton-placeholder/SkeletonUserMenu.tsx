import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonUserMenu = () => {
    return (
        <SkeletonPlaceholder borderRadius={4}>
            <View style={styles.profileUser}>
                <View style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.detail}></Text>
                    <Text style={styles.detail}></Text>
                    <Text style={styles.detail}></Text>
                    <Text style={styles.detail}></Text>
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}

export default SkeletonUserMenu

const styles = StyleSheet.create({
    profileUser: {
        borderRadius: 20,
        height: 155,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    avatar: {
        height: 93,
        width: 93,
        marginRight: 16,
        borderRadius: 10,
    },
    detail: {
        fontWeight: '400',
        fontSize: 14,
        color: '#808080',
        width: '100%',
        marginBottom:5
    },
})