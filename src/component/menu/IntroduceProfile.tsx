import { View, Text ,StyleSheet} from 'react-native'
import React,{useEffect,useState,useMemo} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { Color } from '../../../contanst/color';
import { getAllBillDeliveryByClientHTTP } from '../../../http/BillHTTP';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { billDeliveryResType } from '../../store/billDeliveryReducer';

const IntroduceProfile = ({valueBillClient}:{valueBillClient:Array<billDeliveryResType>}) => {
  

  const productSelled=useMemo(() => {
    return valueBillClient.reduce((prevValue,bill)=>{
      return prevValue+=bill.cart.reduce((prevValueCartItem,cartItem)=>{
        return prevValueCartItem+=cartItem.quantity
      },0)
    },0)
  }, 
  [valueBillClient])
  return (
    <View style={styles.introduceContainer}>
      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.icon}>
              <Icon name='box-open' size={24} color='#000'/>
            </View>
            <View>
              <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{productSelled}</Text>
              <Text>Product Sells</Text>
            </View>

          </View>
          <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.icon}>
              <Icon name='coins' size={24} color='#000'/>
            </View>
            <View>
              <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{valueBillClient && valueBillClient.length}bill+</Text>
              <Text>Earning</Text>
            </View>

          </View>
    </View>
  )
}

export default IntroduceProfile;

const styles=StyleSheet.create({
    introduceContainer: {
        width: '100%',
        height: 80,
        paddingHorizontal:20,
        backgroundColor: Color.primary150,
        borderRadius: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
      },
      icon:{
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'#fff',
        marginHorizontal:10
      }
})