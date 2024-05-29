import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOR } from '../../constant/color'
import { Image } from 'react-native';

const User = ({type,setType}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Public');

    const options = [
        { label: 'Public', value: 1 },
        { label: 'Private', value: 2 },
        { label: 'Friend', value: 3 }
    ];
    useEffect(() => {
        // Dựa vào giá trị type nhận được từ props để chọn option mặc định
        const defaultOption = options.find(option => option.value === type);
        setSelectedOption(defaultOption ? defaultOption.label : ''); // Nếu không tìm thấy option tương ứng, selectedOption sẽ là chuỗi rỗng
    }, [type]);
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectOption = (option) => {
        setSelectedOption(option.label);
        setType(option.value);
        setDropdownVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.userInfor}>
                <Image style={styles.userInforAvatar} source={require('../../media/quyet_icon/event.jpg')}/>
                <Text style={styles.userInforName}>Quyết đẹp trai</Text>
            </View>
            <View style={styles.type}>
                <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                    <View style={styles.buttonType}>
                        <Text style={styles.buttonText}>{selectedOption}</Text>
                        <Image style={styles.buttonTypeIcon} source={require('../../media/quyet_icon/down_w.png')} />
                    </View>

                </TouchableOpacity>
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.dropdownOption}
                                onPress={() => selectOption(option)}
                            >
                                <Text style={styles.optionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    userInfor: {
        width: '70%',
        flexDirection:'row',
        alignItems:'center',
    },
    userInforAvatar: {
        width: 50,
        height: 50,
        borderRadius:100,
    },
    userInforName: {
        width: '70%',
        color:'black',
        fontWeight:'400',
        fontSize:18,
        marginTop:15,
        marginStart: 10
    },
    type: {
        width: '30%',
        zIndex: 999
    },
    dropdownButton: {
        padding: 10,
        backgroundColor: COLOR.PrimaryColor,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
    },
    buttonType:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    buttonTypeIcon:{
        height:20,
        width: 20,
    },
    buttonTypeText:{
        height:20,
        width: 20,
    },
    dropdown: {
        marginTop: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position:'absolute',
        width:100
    },
    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    optionText: {
        color: '#333',
    },
})