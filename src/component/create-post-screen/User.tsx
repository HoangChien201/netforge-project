import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../constant/color'
import { Image } from 'react-native';
import ICON from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
const User = ({setPermission}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Bạn bè');
    const [selectIcon,setSelectIcon] = useState('team');
   const user = useSelector((state:RootState)=>state.user?.value)
    
    const options = [
        { label: 'Bạn bè', value: 1 , Icon:'team'},
        { label: 'Cá nhân', value: 2 ,Icon:'user'}
    ];

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectOption = (option) => {
        setSelectedOption(option.label);
        setPermission(option.value);
        setDropdownVisible(false);
        setSelectIcon(option.Icon)
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfor}>
                {user?.avatar && <Image style={styles.userInforAvatar} source={{uri: user?.avatar}}/>  }
                <Text style={styles.userInforName}>{user?.fullname}</Text>
            </View>
            <View style={styles.type}>
                <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                    <View style={styles.buttonType}>
                        <ICON name={selectIcon} size={18} color={COLOR.primary300}/>
                        <Text style={styles.buttonText}>{selectedOption}</Text>
                        <ICON name='down' size={16} color={COLOR.primary150} />
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
        width: 40,
        height: 40,
        borderRadius:100,
        borderColor:COLOR.PrimaryColor1,
        borderWidth:1
    },
    userInforName: {
        width: '70%',
        color:'black',
        fontWeight:'400',
        fontSize:18,

        marginStart: 10
    },
    type: {
        width: '30%',
        zIndex: 999
    },
    dropdownButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLOR.PrimaryColor,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight:'400'
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