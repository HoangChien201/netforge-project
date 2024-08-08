import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const SkelotonComment = () => {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder >
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18, width: 250 }}></Text>
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18, width: 100 }}></Text>
                        </View>

                    </View>

                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
                <View style={styles.content}>

                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>

                <View style={styles.option}>

                </View>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
                <View style={styles.comment}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={styles.contentComment}>
                            
                        </View>

                    </View>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
                <View style={styles.comment}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={styles.contentComment}>
                            
                        </View>

                    </View>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
                <View style={styles.comment}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={styles.contentComment}>
                            
                        </View>

                    </View>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
                <View style={styles.comment}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={styles.contentComment}>
                            
                        </View>

                    </View>
            </SkeletonPlaceholder>

        </View>
    )
}

export default SkelotonComment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        height:"100%"
    },
    option: {
        height: 40,
        width: "100%",

    },
    content: {
        height: 80,
        width: "100%",
        marginVertical: 10
    },
    comment: {
        height: 100,
        flexDirection:"row",
        alignItems:'center'
    },
    contentComment:{ 
        marginLeft: 20,
        width:200,
        height:60,
        borderRadius:20
     }
})