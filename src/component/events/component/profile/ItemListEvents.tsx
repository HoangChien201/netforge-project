import { StyleSheet, Text, View, Image, TouchableOpacity, ImageProps, FlatList } from 'react-native'
import React from 'react'

type EventEntity = {
    id: number,
    image: ImageProps,
    time: string,
    title: string,
}
interface ItemRenderProp{
    id?: number,
    image?: ImageProps,
    time: string,
    title: string,
}


const EVENTS: Array<EventEntity > = [
    {
        id: 1,
        image: require('../../../../media/icon/image_86.png'),
        time: '1st  May- Sat -2:00 PM',
        title: 'A virtual evening of smooth jazz',
    },
    {
        id: 2,
        image: require('../../../../media/icon/image_86.png'),
        time: '1st  May- Sat -2:00 PM',
        title: 'Jo malone london’s mother’s dayyyyyyyyyy',
    },
    {
        id: 3,
        image: require('../../../../media/icon/image_86.png'),
        time: '1st  May- Sat -2:00 PM',
        title: "Women's leadership conferenceeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
        id: 4,
        image: require('../../../../media/icon/image_86.png'),
        time: '1st  May- Sat -2:00 PM',
        title: "Women's leadership conference",
    },
    {
        id: 5,
        image: require('../../../../media/icon/image_86.png'),
        time: '1st  May- Sat -2:00 PM',
        title: "Women's leadership conference",
    },
    {
        id: 6,
        image: require('../../../../media/icon/image_86.png'),
        time: '1st  May- Sat -2:00 PM',
        title: "Women's leadership conference",
    }

    ];

    const ItemRender:React.FC<ItemRenderProp>=({ image, time, title })=>{
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.imgEvent} source={image} />
            <View style={styles.textContainer}>
                <Text style={styles.txtTime}>{time}</Text>
                <Text style={styles.txtTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
    }

const ItemListEvents = () => {
    return (
        <View>
            <FlatList
                data={EVENTS}
                renderItem={({ item }) => {
                    return (
                    <ItemRender image= {item.image} time={item.time} 
                        title={item.title} />
                    )
            }}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator= {false}/>
        </View>
    )
}

export default ItemListEvents

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor:"#FFFFFF",
        paddingVertical:10,
        flex:1,
    },
    imgEvent: {
        width:100,
        height:100,
        borderRadius:10,
    },
    textContainer: {
        marginLeft: 10,
        flex:1
    },
    txtTime: {
        fontSize:14,
        textTransform: "uppercase",
        fontWeight:'400',
        color:'#5669FF',
        
    },
    txtTitle: {
        fontSize:18,
        fontWeight:'500',
        lineHeight:25,
        color:'#120D26',
    }

})