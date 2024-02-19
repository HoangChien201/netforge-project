import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllEventHTTP } from '../../../../http/chien_event/EventHTTP';
import { EventItemType } from '../home/EventItem';

type EventEntity = {
    id: number,
    image: string,
    time: string,
    title: string,
}
interface ItemRenderProp {
    id?: number,
    image?: string,
    time: string,
    title: string,
}


const ItemRender: React.FC<ItemRenderProp> = ({ image, time, title }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.imgEvent} source={{uri:image}} />
            <View style={styles.textContainer}>
                <Text style={styles.txtTime}>{time}</Text>
                <Text style={styles.txtTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ItemListEvents = () => {
    const [listEvent, setListEvent] = useState([])

    async function GetEvent() {
        const events = await GetAllEventHTTP()
        setListEvent([...events])
    }
    useEffect(() => {
        GetEvent()
    }, [])
    return (
        <View>
            <FlatList
                data={listEvent}
                renderItem={({ item }:{item:EventItemType}) => {
                    return (
                        <ItemRender image={item.image} time={item.date_start}
                            title={item.name} />
                    )
                }}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false} />
        </View>
    )
}

export default ItemListEvents

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        paddingVertical: 10,
        flex: 1,
    },
    imgEvent: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1
    },
    txtTime: {
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: '400',
        color: '#5669FF',

    },
    txtTitle: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 25,
        color: '#120D26',
    }

})