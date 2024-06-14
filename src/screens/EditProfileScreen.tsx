import React, {useState, useEffect, useCallback, useContext, useRef} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import ModalPoup from '../component/Modal/ModalPoup';
import ModalFail from '../component/Modal/ModalFail';
import Loading from '../component/Modal/Loading';
import { emailPattern, fullNamePattern, phoneNumberPattern } from '../constant/valid';
import { updateProfile } from '../http/PhuHTTP';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { ProfileRootStackEnum } from '../component/stack/ProfileRootStackParams';
import CustomDatePicker from '../component/profile/CustomDatePicker';
import CustomHeaderBar from '../component/profile/CustomHeaderBar';

import { Formik, FormikProps } from 'formik';
import GenderPicker from '../component/profile/GenderPicker';
import * as yup from 'yup';
import InputField from '../component/profile/InputField';
import AddressModal from '../component/profile/AddressModal';

interface user {
  email: string;
  fullname: string;
  dateOfBirth: any | null;
  phone: null | number;
  address:null | string;
  gender:string | null;
}

const validationSchema = yup.object().shape({
  phone: yup.string()
    .matches(phoneNumberPattern, 'Số điện thoại không hợp lệ!')
    .nullable(''),
  email: yup.string()
    .matches(emailPattern, 'Email không hợp lệ!')
    .required('Email là bắt buộc'),
  fullname: yup.string()
    .matches(fullNamePattern, 'Tên không hợp lệ!')
    .required('Tên là bắt buộc'),
  address: yup.string(),
  gender: yup.string().oneOf(['--', 'Nam', 'Nữ', 'Khác'])
});

  const EditProfileScreen:React.FC = () => {
  const navigation:NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const dateOfBirth = user.dateOfBirth;
  console.log("dateOfBirth",dateOfBirth);
  console.log("fullname: ",user.fullname);
  console.log("email nè: ", user.email);
  console.log("phone nè: ", user.phone);

  const [startDate, setStartDate] = useState(dateOfBirth);
  const [dateError, setDateError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(true);
  const formikRef = useRef<FormikProps<{ email: string; fullname: string; phone?: string; gender?:string; dateOfBirth?: any }>>(null);

  // address
  const [selectedAddress, setSelectedAddress] = useState<string|null>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
  };

  const [initialDate, setInitialDate] = useState(user.dateOfBirth);

  const showModalFalse =() => {
    setShowModal(true);
    setStatus(false);
    setTimeout(() => {
        setShowModal(false);
        setIsLoading(false);
    }, 2000);
}

const initialValues = {
  email: user.email,
  fullname: user.fullname,
  dateOfBirth: user.dateOfBirth || null,
  phone: user.phone || null,
  address: user.address,
  gender: user.gender
};


const handleUpdateProfile = async (values: user) => {
      console.log('lỗi nừ');
    setIsLoading(true);
    const currentDate = new Date();
    if (startDate > currentDate) {
      setDateError('Ngày không hợp lệ, hãy chọn một ngày trong quá khứ hoặc hiện tại.');
      setIsLoading(false);
      return;
    } else {
        setDateError(null); 
    }
   
    try {
      const { email, fullname, phone, gender,address} = values;
        // Kiểm tra và thay thế các giá trị null
    //const updatedPhone = phone ?? ''; 
    const updatedGender = gender ?? ''; 
    const updatedAddress = selectedAddress || address || ''; 
    
    const response = await updateProfile(
      user.id,
      email,
      fullname,
      startDate,
      phone,
      updatedAddress,
      updatedGender
    );
      //const response = await updateProfile(user.id, email, fullname, startDate, phone ?? null, selectedAddress ?? null ,gender ?? null);
      console.log(response)
      if (response) {
          setShowModal(true);
          setStatus(true);
          setIsLoading(false);
          setTimeout(() => {
              setShowModal(false);
              navigation.navigate(ProfileRootStackEnum.ProfileScreen);
          }, 2000);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
          showModalFalse();
      } else {
          showModalFalse();
      }
      console.log("Error update profile:", error);
    }
  };


  const handleBackPress = () => {
    navigation.navigate(ProfileRootStackEnum.ProfileScreen);
    setStartDate(initialDate);
    setDateError(null);
    formikRef.current?.resetForm();
};


  return (
    <View style={styles.container}>
      <CustomHeaderBar onBackPress={handleBackPress} 
        onSavePress={() => formikRef.current?.handleSubmit()}  title='Chỉnh sửa hồ sơ'/>

    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdateProfile}>

      {(formikProps) => {
        if (!formikProps) return null; 
        return (
        <KeyboardAvoidingView style={styles.viewContent}>
            <Loading isLoading={isLoading} />
            
            <InputField
              label="Họ tên"
              value={formikProps.values.fullname}
              onChangeText={formikProps.handleChange('fullname')}
              onBlur={formikProps.handleBlur('fullname')}
              invalid={formikProps.touched.fullname && !!formikProps.errors.fullname}
              imageSource={require('../media/Dicons/user.png')}/>

            <InputField
              label="Email"
              value={formikProps.values.email}
              onChangeText={formikProps.handleChange('email')}
              onBlur={formikProps.handleBlur('email')}
              invalid={formikProps.touched.email && !!formikProps.errors.email}
              imageSource={require('../media/icon/Mail.png')}/>

            <InputField
              label="Số điện thoại"
              value={formikProps.values.phone}
              onChangeText={formikProps.handleChange('phone')}
              onBlur={formikProps.handleBlur('phone')}
              keyboardType="phone-pad"
              invalid={formikProps.touched.phone && !!formikProps.errors.phone}
              imageSource={require('../media/icon/Mail.png')}/>

            <View style={styles.addressContainer}>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text>Chọn địa chỉ...</Text>
              </TouchableOpacity>
              <Text>Địa chỉ đã chọn: {selectedAddress}</Text>
              <AddressModal
                isVisible={isModalVisible}
                onSelectAddress={handleSelectAddress}
                onCloseModal={handleCloseModal}
                selectedAddress=''/>
            </View>

            <GenderPicker
              value={formikProps.values.gender}
              onValueChange={formikProps.handleChange('gender')}
              invalid={formikProps.touched.gender && !!formikProps.errors.gender}/>
            
            <CustomDatePicker
              selectedDate={startDate}
              onDateChange={(date) => {
                setStartDate(date);
                formikProps.setFieldValue('dateOfBirth', date);
                setDateError(null);
              }}
              error={dateError}/>
              {dateError && <Text style={styles.errorText}>{dateError}</Text>}

          {status ? (
            <ModalPoup text="Cập nhập thành công!" visible={showModal} />
          ) : (
            <ModalFail text="Cập nhập thất bại!" visible={showModal} />
          )}
        </KeyboardAvoidingView>
          );
        }}
    </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  viewAll: {
    flex: 1,
  },
  viewContent: {
    backgroundColor: '#ffff',
    flex: 1,
    padding: 18,
  },
  txt1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 36,
    paddingLeft: 30,
  },
  txt2: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#4e4b66',
  },
  image: {
    width: 20,
    height: 15,
    tintColor: 'white',
  },
  viewToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
  },
  addressContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 35,
  }
});

export default EditProfileScreen;


