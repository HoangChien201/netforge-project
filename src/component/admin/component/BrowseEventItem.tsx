import { FlatList, Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ButtonText from '../../events/component/ui/ButtonText'
import { COLOR } from '../../../constant/color'
import IconButton from '../../events/component/posts/IconButton'
import { AcceptanceBrowseEventHTTP, GetBrowseEventHTTP, RejectBrowseEventHTTP } from '../../../http/admin/BrowseHTTP'

interface EventItemProps {
    item:EventItemType,
    getBrowseEvent:any
}

export type EventItemType={
    id:number,
    image: string,
    name: string,
    participants?: Array<ImageProps>,
    address: string,
    date_start:string,
    description:string,
    status:number,
    price_ticket:number,
    topic:number,
}

export const MONTH_TEXT=['Jan','Feb','March','April','May','June','July','August','Sep','Oct','Nov','Dec']

const BrowseEventItem: React.FC<EventItemProps> = ({item,getBrowseEvent}) => {
    const { id,image, name, address,date_start } = item
    async function OnRejectEvent() {
        await RejectBrowseEventHTTP(item.id)
        getBrowseEvent()
    }

    async function OnAcceptanceEvent() {
        await AcceptanceBrowseEventHTTP(item.id)
        getBrowseEvent()
    }

    async function GetBrowseEvent() {
        const browseEvent=await GetBrowseEventHTTP()
    }
    return (

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
                <View style={styles.addressContainer}>
                    <Image source={require('../../../media/icon/map_icon.png')} />
                    <Text style={styles.address}>{address}</Text>
                </View>

                <View style={styles.controlBrowseContainer}>

                    <ButtonText
                        style={[styles.buttonReject, { backgroundColor: 'red' }]}
                        text='Từ chối'
                        textColor={'#fff'}
                        onPress={OnRejectEvent}
                    />
                    <ButtonText
                        style={[styles.buttonAcceptance, { backgroundColor: COLOR.primaryColor }]}
                        text='Chấp thuận'
                        textColor={'#fff'}
                        onPress={OnAcceptanceEvent}
                    />

                </View>
            </View>
    )
}

export default BrowseEventItem

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
        width: 300,
        height: 350,
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
    controlBrowseContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 44,
        marginVertical: 20
    },
    buttonReject: {
        width: '45%',
        height: 44,
        backgroundColor: 'red',
        borderRadius: 5
    },

    buttonAcceptance: {
        width: '45%',
        height: 44,
        backgroundColor: 'red',
        borderRadius: 5
    },
})