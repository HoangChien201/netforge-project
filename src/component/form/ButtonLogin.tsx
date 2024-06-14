import React from "react";
import { Image, Text, View } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { COLOR } from "../../constant/color";
import { valid } from "./Form";

type Props = {
    chilren: string,
    textColor: string,
    onPress: () => void,
    textLogin?: boolean
}

const ButtonLogin: React.FC<Props> = (props) => {
    const { chilren, textColor, onPress, textLogin } = props
    return (
        <View style={{ backgroundColor: COLOR.primary200, width: "80%", height: 50, borderRadius: 15, marginTop: 15 }}>
            <Pressable style={({ pressed }) => pressed ? styles.pressed : styles.pressed2} onPress={onPress}>
                {textLogin && <View></View>}
                <Text style={[styles.text, { color: textColor }]}>{chilren}</Text>
                <Image source={require("../../media/Dicons/right-arrow.png")} style={{ width: 25, height: 25, tintColor: "#fff" }} />
            </Pressable>
        </View>

    )
}

export default ButtonLogin

const styles = StyleSheet.create({
    pressed: {
        backgroundColor: "#FFB179",
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        paddingLeft: 20,
        alignItems: "center",
        borderRadius: 15,
        paddingRight: 20

    },
    pressed2: {
        backgroundColor: COLOR.primary200,
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        paddingLeft: 20,
        alignItems: "center",
        borderRadius: 15,
        paddingRight: 20

    },
    text: {
        fontFamily: "poppins",
        display: "flex",
        alignItems: "center",
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "center"
    }
})