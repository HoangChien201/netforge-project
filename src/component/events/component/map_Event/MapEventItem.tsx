import { StyleSheet, Text, View ,ImageProps} from 'react-native'
import React from 'react'
import EventItem from './EventItem'

const EVENTS: Array<CategoryEntity> = [
    {
        id: 1,
        image: require('../../../../media/quyet_icon/schedule.png'),
        name: 'Tên sự kiện',
        status: 'Thời gian',
        minute: 'Địa điểm',
    },
    {
        id: 2,
        image: require('../../../../media/quyet_icon/schedule.png'),
        name: 'Tên sự kiên 1',
        status: 'Thời gian 1',
        minute: 'Địa điểm 1',
    },
    {
        id: 3,
        image: require('../../../../media/quyet_icon/schedule.png'),
        name: 'Thời gian 2',
        status: 'Tên sự kiên 2',
        minute: 'Địa điểm 2',
    }
];
type CategoryEntity = {
    id: number,
    image: ImageProps,
    name: string,
    status: string,
    minute: string
}
const MapEventItem = () => {
    return (
        <View style={styles.container}>
            <EventItem EVENTS={EVENTS}/>
        </View>
    )
}

export default MapEventItem

const styles = StyleSheet.create({
    container:{
    }
})