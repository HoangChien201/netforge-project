import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonProfile = () => {
    return (
            <SkeletonPlaceholder borderRadius={4}>
                <View style={styles.container}>
                    {/* Banner */}
                    <SkeletonPlaceholder.Item
                        width="100%"
                        height={200}/>
                    
                    {/* Avatar */}
                    <SkeletonPlaceholder.Item
                        position="absolute"
                        bottom={380}
                        left={20}
                        width={100}
                        height={100}
                        borderRadius={50}
                        borderWidth={5}
                        borderColor="#d0d0d0" 
                    />
    
                    {/* Name and other details */}
                    <View style={styles.detailsContainer}>
                        {/* name */}
                        <SkeletonPlaceholder.Item
                            width={200}
                            height={28}
                            borderRadius={10}
                            marginTop={10}
                        />
                        {/* button header */}
                        <SkeletonPlaceholder.Item
                            width={'100%'}
                            height={40}
                            borderRadius={10}
                            marginTop={15}
                        />
                        <SkeletonPlaceholder.Item
                            width={'100%'}
                            height={40}
                            borderRadius={10}
                            marginTop={15}
                        />
                    </View>
                    {/* tab bar */}
                    <SkeletonPlaceholder.Item
                        marginTop={15}
                        height={50}/>
                    <View style={{paddingHorizontal: 20,}}>
                        <SkeletonPlaceholder.Item
                            marginTop={15}
                            marginBottom={5}
                            width={100}
                            height={28}/>
                        <SkeletonPlaceholder.Item
                            marginTop={10}
                            width={'100%'}
                            height={20}
                            marginBottom={5}/>
                        <SkeletonPlaceholder.Item
                            marginTop={10}
                            width={'100%'}
                            height={20}
                            marginBottom={5}/>
                        <SkeletonPlaceholder.Item
                            marginTop={10}
                            width={'100%'}
                            height={20}
                            marginBottom={5}/>
                    </View> 
                </View>
            </SkeletonPlaceholder>
    )
}

export default SkeletonProfile

const styles = StyleSheet.create({
        container: {
            position: 'relative',
        },
        detailsContainer: {
            marginTop: 60,
            paddingHorizontal: 20,
        },
})