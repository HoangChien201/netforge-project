import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { format, differenceInMilliseconds, parseISO } from 'date-fns';

import ItemImg from './ItemImg';
import ActionBar from './ActionBar';
import { FormatTime } from '../../format/FormatDate';
import { DateOfTimePost } from '../../format/DateOfTimePost';

const ItemPost = (props) => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const {data} = props;
   
   
    const {creater,comment,reaction,content,media,type,create_at} = data.item;
 
    
    const [apiTime, setApiTime] = useState<string>(create_at);
  

    return (
        <TouchableOpacity onPress={()=>{
    
            console.log("like");
            
        }} activeOpacity={1}>
            <View style={styles.home}>
                <View style={styles.containerAvt}>
                    <Image source={require('../../media/icon/phuking.jpg')} style={styles.avt} />
                    <View >
                        <Text style={styles.nameUser}>{creater.fullname === null ? "Người dùng":creater.fullname}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
                            <Text style={{marginRight:10}}>{DateOfTimePost(create_at)} giờ</Text>
                            <Image source={require('../../media/icon/icon-hour-light.png')}/>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image source={require('../../media/Dicons/ellipsis.png')} style={styles.ellips}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginHorizontal:20,paddingBottom:media ? 0 :20}}>
                <Text style={{color:'black'}}>{content}</Text>
            </View>
           {media.length > 0 ?    <ItemImg image={media}/> : null}
            <ActionBar type={reaction}/>
            

        </TouchableOpacity>
    )
}

export default ItemPost

const styles = StyleSheet.create({
    avt: {
        width: 50, // Chiều rộng của hình ảnh
        height: 50, // Chiều cao của hình ảnh
        borderRadius: 50,
        resizeMode: 'cover',
        marginRight: 10

    },
    containerAvt: {
        flexDirection: 'row',
        
    },
    nameUser: {
        fontWeight: 'bold',
        color: 'black'
        , fontFamily: ''
    },
    ellips:{
        width:20,
        height:20
    },
    home:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding: 20,

    }

})
