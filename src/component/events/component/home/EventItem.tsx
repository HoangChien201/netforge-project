import { FlatList, Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ButtonIcon from '../ui/ButtonIcon'
import IconButton from '../posts/IconButton'
import { useNavigation } from '@react-navigation/native'

interface EventItemProps {
    id:number,
    image: string,
    name: string,
    participants: Array<ImageProps>,
    address: string,
    date_start:string,
    description:string,
    status:number,
    price_ticket:number,
    topic:number,
}

export type EventItemType={
    id:number,
    image: string,
    name: string,
    participants: Array<ImageProps>,
    address: string,
    date_start:string,
    description:string,
    status:number,
    price_ticket:number,
    topic:number,
}

export const MONTH_TEXT=['Jan','Feb','March','April','May','June','July','August','Sep','Oct','Nov','Dec']

const EventItem: React.FC<EventItemProps> = ({event}) => {
    const { id,image, name, participants, address,date_start } = event
    const navigation=useNavigation()
    function ItemOnPress(){
        navigation.navigate('EventDetailScreen',{
            id:id
        })
    }
    
    return (
        <TouchableOpacity onPress={ItemOnPress}>

            <View style={styles.container}>
                <View style={{ height: '50%' }}>
                    <View style={styles.flexRow}>
                        <View style={styles.calendarContainer}>
                            <Text style={styles.date}>{new Date(date_start).getDate()}</Text>
                            <Text style={styles.month}>{MONTH_TEXT[new Date(date_start).getMonth()+1]}</Text>
                        </View>
                        <View style={styles.saveContainer}>
                            <IconButton name='bookmark' size={18} color='#EB5757' />
                        </View>
                    </View>
                    <Image source={{uri:image}} style={styles.image} />
                </View>
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                {/* <View style={styles.participantsContainer}>
                    <FlatList
                        data={participants.filter((item, index) => { return index < 3 })}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ marginStart: index > 0 ? -8 : 0 }}>
                                    <Image source={item} style={styles.avatarParticipant} />
                                </View>
                            )
                        }}
                        horizontal={true}
                        keyExtractor={(item, index) => { return index.toString() }}

                    />
                    {
                        participants.length > 3 &&
                        <Text style={styles.amountParticipant}>+{participants.length - 3} going</Text>
                    }
                </View> */}
                <View style={styles.addressContainer}>
                    <Image source={require('../../../../media/icon/map_icon.png')} />
                    <Text style={styles.address}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default EventItem

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        paddingHorizontal: 9,
        marginTop: 5,
        width: '100%'
    },
    container: {
        width: 240,
        height: 255,
        borderRadius: 15,
        padding: 9,
    },
    image: {
        height: '100%',
        borderRadius: 15
    },
    calendarContainer: {
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    saveContainer: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    date: {
        color: '#F0635A',
        fontSize: 16,
        fontWeight: '600'
    },
    month: {
        color: '#F0635A',
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 18
    },
    participantsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        maxWidth: 120
    },
    avatarParticipant: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#fff',
    },
    amountParticipant: {
        color: '#3F38DD',
        fontSize: 12,
        marginStart: 10
    },
    addressContainer: {
        flexDirection: 'row'
    },
    address: {
        fontSize: 13,
        color: '#2B2849',
        fontWeight: '300',
        marginStart: 10
    },
})