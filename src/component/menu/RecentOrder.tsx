import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ViewAll from '../ViewAll'
import RecentOrderItem from './RecentOrderItem'
import { ScrollView } from 'react-native-gesture-handler'
import { listCart } from '../../../contanst/contanst'
import { billDeliveryResType } from '../../store/billDeliveryReducer'

const RecentOrder = ({valueBillClient}:{valueBillClient:Array<billDeliveryResType>}) => {

    return (
        <View style={{flex:1}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Our Menu</Text>
                <ViewAll />
            </View>
            <FlatList
                data={valueBillClient}
                renderItem={({item})=><RecentOrderItem bill={item}/>}
                keyExtractor={(item)=>item._id}
            />
        </View>
    )
}

export default RecentOrder;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: '#000',
    },
})