import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
interface CategoryItemProp {
    image: ImageProps,
    name: string,
    backgroundColor:string
}

const CategoryItem: React.FC<CategoryItemProp> = ({ image, name,backgroundColor }) => {
    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:backgroundColor}]}>
            <Image source={image} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        height:40,
        minWidth:100,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:'row',
        paddingHorizontal:10,
        marginEnd:10
    },
    image: {
        marginEnd:10
    },
    name: {
        color:'#fff',
        fontSize:15,
        fontWeight:'400'
    },
})