import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SearchComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <Image source={require('../../../../media/icon/search_icon.png')} style={styles.searchIcon} />
                <TextInput placeholder='Search' style={styles.inputSearch} placeholderTextColor={"#fff"}/>
            </View>
            <TouchableOpacity style={styles.filterContainer}>
                <Image source={require('../../../../media/icon/filter_icon.png')} />
                <Text style={styles.filter}>Filters</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        height: 32,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical:20
    },
    searchIcon: {

    },
    inputSearch: {
        height: "100%"
    },
    filterContainer: {
        flexDirection: 'row',
        width: 75,
        height: 32,
        borderRadius: 50,
        backgroundColor: '#524CE0',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    filter: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '300'
    },
})