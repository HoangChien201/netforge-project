import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useLayoutEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Input from '../../../screen/user/component/Input'
import { RootState } from '../../store/store'
import { Color } from '../../../contanst/color'
import SelectDropdown from 'react-native-select-dropdown'
import { valueFormEdit } from '../../../screen/user/profile/EditProfileScreen'

const ICON_MAN = require('../../../assets/images/icon/man.png')
const ICON_WOMAN = require('../../../assets/images/icon/woman.png')

const FormEditProfile = ({updateValue,valueForm}:{updateValue:any,valueForm:valueFormEdit}) => {

    const navigation = useNavigation();
    const [gender,setGender] = useState('Nam')

    function OnUpdateValue(key:string,value:string) {
        updateValue(key,value)
    }

    function onSelectDropDown(selectedItem: any, index: number) {
        setGender(selectedItem)
        updateValue('gender',selectedItem)
    }

    const InputComponent=useCallback(({ image, placeholder, value, onChangeTextField }: { image: any, placeholder: string, value: string, onChangeTextField: any })=> {
        return (
            <View style={styles.inputContainer}>
                <Image source={image} />
                <Input
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={Color.placeholderTextColor}
                    onChangeTextField={onChangeTextField} 
                    
                    />
            </View>
        )
    },[])
    return (
        <View style={styles.container}>
            <InputComponent
                image={require('../../../assets/images/icon/icon-account.png')}
                value={valueForm.fullname}
                onChangeTextField={OnUpdateValue.bind(this,'fullname')}
                placeholder='Lê Hoàng Chiến'
            />
            
            <InputComponent
                image={require('../../../assets/images/icon/email_rounded.png')}
                value={valueForm.email}
                onChangeTextField={OnUpdateValue.bind(this,'email')}
                placeholder='hoangchien11522@gmail.com'
                
            />

            <InputComponent
                image={require('../../../assets/images/icon/call_rounded.png')}
                value={valueForm.phone}
                onChangeTextField={OnUpdateValue.bind(this,'phone')}
                placeholder='0368670025'
            />

            <View style={styles.inputContainer}>
                <Image source={gender === 'Nam' ? ICON_MAN : ICON_WOMAN} />
                <SelectDropdown
                    data={['Nam', 'Nữ']}
                    onSelect={onSelectDropDown}
                    buttonStyle={styles.input}
                    selectedRowStyle={{}}
                    buttonTextStyle={styles.text}
                    defaultButtonText={valueForm.gender}
                    rowStyle={{ backgroundColor: "#fff", borderColor: "#fff", width: 100 }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdown}
                />
            </View>
        </View>
    )
}

export default FormEditProfile

const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Color.placeholderTextColor,
    },
    input: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 10,
        height: 55,
        backgroundColor: '#fff',

    },
    text: {
        textAlign: 'left',
        color: Color.placeholderTextColor,
        fontSize: 16,
    },
    iconArrowDown: {
        position: "absolute",
        right: 10,
    },
    dropdown: {
        borderRadius: 10,
        width: 100
    }
})