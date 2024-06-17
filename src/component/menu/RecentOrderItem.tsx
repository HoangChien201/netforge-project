import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color';
import { billDeliveryResType } from '../../store/billDeliveryReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const RecentOrderItem = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.brand}>
                    <Image style={styles.logo} source={require('../../../assets/images/logo/logo-main.png')} />
                    <Text style={styles.nameShop}>Fastfood Shop</Text>
                </View>
                <Text style={styles.total}>2.300.000 đ</Text>
            </View>
            <TouchableOpacity style={styles.detailConatainer}>
                <View style={styles.items}>
                    <Text style={styles.title}>Sản phẩm</Text>
                    <Text style={styles.detail}>1 x Burger bò phô mai</Text>

                </View>
                <View style={styles.orderTime}>
                    <Text style={styles.title}>Đơn đặt vào lúc</Text>
                    <Text style={styles.detail}>22:30 11/12/2023</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.status}>Đã giao</Text>
                <TouchableOpacity style={styles.repeatOrder}>
                    <Image style={{width:14,height:14,marginEnd:8}} source={require('../../../assets/images/icon/refresh.png')} />
                    <Text style={styles.repeat}>Đặt lại</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RecentOrderItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 5,
        elevation: 2
    },
    header: {
        height:60,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10
    },

    brand: {
        flexDirection:'row',
        alignItems:'center',
    },
    logo: {
        width:60,
        height:60,
        marginEnd:10
    },

    nameShop: {
        color:"#000",
        letterSpacing:0.24,
        fontWeight:'600',
        fontSize:18
    },

    total: {
        color:"#000",
        letterSpacing:0.24,
        fontWeight:'600',
        fontSize:18
    },

    detailConatainer: {
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:Color.line,
        flex:1,
        padding:10,
        justifyContent:'space-between'
    },

    items: {},
    orderTime: {},
    title: {
        textTransform:'uppercase',
        fontSize:15,
    },
    detail:{
        fontSize:15,
        color:"#000",
        fontWeight:'500'
    },

    footer: {
        height:60,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        padding:10
    },

    status: {
        fontSize:15
    },

    repeatOrder: {
        flexDirection:'row',
        alignItems:'center'
    },
    repeat: {
        fontSize:15,
        fontWeight:'600'
    },

})