import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

//deep
export const getUrlAsync = async () => {
    // Get the deep link used to open the app
    const url = await Linking.getInitialURL();
    if (url) {
        AsyncStorage.setItem('deeplink', url);
    }
};