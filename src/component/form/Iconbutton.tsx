import { TouchableOpacity, View } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import React from "react";

type Props = {
    name:string,
    size:number,
    onPress:()=>void,
    color:string
}

const Iconbutton = (props:Props) =>{
    const {name,size,color,onPress,} = props;
    return(
        <TouchableOpacity onPress={onPress}>
            <View >
                <Icon name={name} size={size} color={color}></Icon>
            </View>
        </TouchableOpacity>
    )
}
export default Iconbutton