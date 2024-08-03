import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkelotonHistory = () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <View style={styles.container}>
            {
                list.map((id) => {
                    return (
                        <View style={styles.wrapper} key={id}>
                            <SkeletonPlaceholder borderRadius={4} key={id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 48, width: 48, borderRadius: 50}}/>
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

export default SkelotonHistory

const styles = StyleSheet.create({
    container:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginStart: -20
    },
    wrapper:{
        marginBottom:10,
        marginStart:-10
    }
})