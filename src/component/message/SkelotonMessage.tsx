import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkelotonMessage = () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <View style={styles.container}>
            {
                list.map((id) => {
                    return (
                        <View style={styles.wrapper} key={id}>
                            <SkeletonPlaceholder borderRadius={4} key={id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18, width: 250 }}></Text>
                                        <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18, width: 250 }}></Text>
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                        </View>
                    )
                })
            }


        </View>

    )
}

export default SkelotonMessage

const styles = StyleSheet.create({
    container:{
    },
    wrapper:{
        marginBottom:10
    }
})