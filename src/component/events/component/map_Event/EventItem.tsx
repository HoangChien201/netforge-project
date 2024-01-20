import { StyleSheet, Text, View, ImageProps, TouchableOpacity, Image, FlatList, ImageSourcePropType } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'

const EventItem = ({EVENTS}) => {
    return (
        <View style={styles.container}>
            <Swiper
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsButtons={false}
                showsPagination={false}
            >
                {EVENTS.map((item: { image: ImageSourcePropType | undefined; status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; minute: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined }) => (
                    <TouchableOpacity style={styles.containerUser}>
                        <Image style={styles.imageUser} source={item.image} />
                        <View style={styles.containerText}>
                            <View style={styles.ConStatus}>
                                <View style={styles.location}>
                                    <Image style={styles.imgTime} source={require('../../../../media/quyet_icon/Location.png')} />
                                    <Text style={styles.Status}>{item.status}</Text>
                                </View>
                                <Text style={styles.NameUser}>{item.name}</Text>
                                <View style={styles.location}>
                                    <Image style={styles.imgTime} source={require('../../../../media/quyet_icon/Location.png')} />
                                    <Text style={styles.textTime}>{item.minute}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bookmark}>
                            <View style={styles.backgroundBookmark} >
                                <Image style={styles.iconBookmark} source={require('../../../../media/quyet_icon/Path_33968.png')} />
                            </View>

                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </Swiper>
        </View >
    )
}

export default EventItem

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        marginStart: 10,
        marginEnd: 10,
        alignItems: 'center',
        flex: 1

    },
    bookmark: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: 50,

    },
    iconBookmark: {
        height: 24,
        width: 24,
    },
    backgroundBookmark:{
        backgroundColor: '#E8E8E8',
        padding: 5,
        borderRadius:6,
        margin:5
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgTime: {
        height: 14,
        width: 14,
        marginEnd: 2
    },
    imageUser: {
        width: 80,
        height: 80,
        marginStart: 4
    },
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between'
    },
    containerText: {
        flexDirection: 'row',
        height: '100%',
        width: '65%',
        textAlign: 'center',
        alignItems: 'center',

    },
    NameUser: {
        fontWeight: '500',
        fontSize: 16,
        color: '#000',
        lineHeight: 18.23,


    },
    Status: {
        fontSize: 14,
        color: '#3C3E56',
        lineHeight: 23,
    },
    textTime: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18.23,
        color: '#3C3E56',

    },
    ConStatus: {
        flexDirection: 'column',
        marginStart: 10,
        justifyContent: 'space-between',
        height: '80%',

    }
});