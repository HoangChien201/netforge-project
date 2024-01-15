import { FlatList, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

export type CategoryEntity={
    image:ImageProps,
    name:string,
    backgroundColor:string
}

const CATEGORIES:Array<CategoryEntity> = [
    {
        image: require('../../../../media/icon/volleyball_icon.png'),
        name: 'Sports',
        backgroundColor: '#F0635A',
    },
    {
        image: require('../../../../media/icon/music_icon.png'),
        name: 'Music',
        backgroundColor: '#F59762',
    },
    {
        image: require('../../../../media/icon/food_icon.png'),
        name: 'Food',
        backgroundColor: '#29D697',
    },
    {
        image: require('../../../../media/icon/art_icon.png'),
        name: 'Art',
        backgroundColor: '#46CDFB',
    },
]

const CategoryComponent = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={CATEGORIES}
                renderItem={({item}) => {
                    const {image,name,backgroundColor}={...item}
                    return (
                        <CategoryItem image={image} name={name} backgroundColor={backgroundColor} />
                    )
                }}
                keyExtractor={(item:CategoryEntity)=>item.name}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}

export default CategoryComponent

const styles = StyleSheet.create({
    container: {
    }
})