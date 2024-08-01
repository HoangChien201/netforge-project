import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import isEqual from 'lodash/isEqual';
import ModalPoup from '../component/Modal/ModalPoup';
import ModalFail from '../component/Modal/ModalFail';
import Loading from '../component/Modal/Loading';
import { emailPattern, fullNamePattern, phoneNumberPattern } from '../constant/valid';
import { getUSerByID, updateProfile } from '../http/PhuHTTP';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomDatePicker from '../component/profile/CustomDatePicker';
import CustomHeaderBar from '../component/profile/CustomHeaderBar';

import { Formik, FormikProps } from 'formik';
import GenderPicker from '../component/profile/GenderPicker';
import * as yup from 'yup';
import InputField from '../component/profile/InputField';
import AddressModal from '../component/profile/AddressModal';
import Icon from 'react-native-vector-icons/Ionicons';
import UpLoadAvatar from '../component/profile/UploadAvatar';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../component/store/store';
import { setUsers } from '../component/store/userSlice';

interface user {
  email: string;
  fullname: string;
  dateOfBirth: any | null;
  phone: null | number;
  address:string | null;
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
  // address: yup.string().nonNullable(),
  // gender: yup.string().oneOf(['--', 'Nam', 'Nữ', 'Khác'])
});

  const EditProfileScreen:React.FC = () => {
  const navigation=useNavigation()
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: {display:'none'}});
  }, []);

  const user = useSelector((state:RootState)=>state.user.value)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState<any>(null);
  const dateOfBirth = user?.dateOfBirth;
  const [isEditable, setIsEditable] = useState(false); // Trạng thái chỉnh sửa của InputField


  const [avatarPath, setAvatarPath] = useState<string>('');
  const [startDate, setStartDate] = useState(dateOfBirth);
  const [dateError, setDateError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(true);
  const formikRef = useRef<FormikProps<{ email: string; fullname: string; phone?: string; gender?:string; dateOfBirth?: any }>>(null);
  const [initialAvatar, setInitialAvatar] = useState('');

  // address
  const [selectedAddress, setSelectedAddress] = useState<string | null>(user.address || '');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [initialAddress, setInitialAddress] = useState(user.address || '');

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
            const response = await getUSerByID(user.id, user.token);
            setUserData(response);
            setAvatarPath(response.avatar);
        } catch (error) {
          console.log(error);
      };
      fetchUserData();
      }
  }, [setUserData, user])
  );


  useEffect(() => {
    if (userData && userData.address ) {
      setInitialAddress(userData.address);
    }
  }, [userData]);


  // avatar
  useEffect(() => {
    if (user && user.avatar ) {
      setInitialAvatar(user.avatar);
    }
  }, [user]);
  const handleImageSelect = (imagePath: string) => {
    setAvatarPath(imagePath);
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


const handleUpdateProfile = async (values: user) => {
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
      const updatedGender = gender || user.gender || ''; 
      const updatedAddress = selectedAddress !== null ? selectedAddress : '';
      const response = await updateProfile(
        user.id,
        email,
        fullname,
        startDate,
        phone,
        updatedAddress,
        updatedGender
      );
      if (response) {
        setUserData(response);

        dispatch(setUsers({
          ...user,
          email,
          fullname,
          dateOfBirth: startDate,
          phone,
          address: updatedAddress,
          gender: updatedGender
        }))
        
          setShowModal(true);
          setStatus(true);
          setIsLoading(false);
          setTimeout(() => {
              setShowModal(false);
              navigation.goBack();
              console.log(address);
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

  const initialValues = {
    email: user.email,
    fullname: user.fullname,
    dateOfBirth: user.dateOfBirth || null,
    phone: user.phone || null,
    address: user.address || null,
    gender: user.gender
  };

const handleBackPress = () => {
  if (!formikRef.current) return;
  const formikProps = formikRef.current;
  // Kiểm tra sự thay đổi giữa giá trị hiện tại và giá trị ban đầu
  const formChanged = !isEqual(formikProps.values, initialValues);
  const addressChanged = selectedAddress !== initialAddress;

  if (formChanged || addressChanged) {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn hủy bỏ thay đổi?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            navigation.goBack();
            setStartDate(initialDate);
            setDateError(null);
            formikProps.resetForm();
          },
        },
      ],
      { cancelable: true }
    );
  } else {
    navigation.goBack();
  }
};

  const resetAddressToInitial = () => {
    setSelectedAddress(initialAddress);
    formikRef.current?.setFieldValue('address', initialAddress);
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeaderBar onBackPress={handleBackPress} 
        onSavePress={() => formikRef.current?.handleSubmit()}  title='Chỉnh sửa thông tin'/>

      <UpLoadAvatar initialImage={avatarPath} onImageSelect={handleImageSelect} userId={user.id} />

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
              iconName='person-outline'
              placeholder='Nhập họ tên'/>

            <InputField
              label="Email"
              value={formikProps.values.email}
              onChangeText={formikProps.handleChange('email')}
              onBlur={formikProps.handleBlur('email')}
              invalid={formikProps.touched.email && !!formikProps.errors.email}
              editable={isEditable}
              iconName='mail-outline'
              placeholder='Nhập email'/>

            <InputField
              label="Số điện thoại"
              value={formikProps.values.phone}
              onChangeText={formikProps.handleChange('phone')}
              onBlur={formikProps.handleBlur('phone')}
              keyboardType="phone-pad"
              invalid={formikProps.touched.phone && !!formikProps.errors.phone}
              iconName='phone-portrait-outline'
              placeholder='Nhập số điện thoại'/>
              

            
      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{flexDirection:'row', alignItems:'center', maxWidth: '85%',  minHeight:60,}}>
          <Icon name="location-outline" size={20} color="#000" style={styles.iconAddress} />
          <Text style={[styles.input, !formikProps.values.address && styles.placeholderText]}>
              {selectedAddress || 'Chọn địa chỉ'}
          </Text>
        </TouchableOpacity>

        <AddressModal
          isVisible={isModalVisible}
          onSelectAddress={(address) => {
            setSelectedAddress(address);
          }}
          onCloseModal={() => setIsModalVisible(false)}
          selectedAddress={selectedAddress}
          resetToInitial={resetAddressToInitial}
        />
      </View>
            <GenderPicker
              value={formikProps.values.gender}
              onValueChange={formikProps.handleChange('gender')}
              invalid={formikProps.touched.gender && !!formikProps.errors.gender}
            />
            
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor:'#fff'
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
    margin:9,
    justifyContent:'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    height: 60,
    overflow: 'hidden',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 35,
  },
  editAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    marginTop: 10,
    borderColor:'#fff'
  },
  iconCamera: {
    width:28,
    height:28,
    position: 'absolute',
    bottom: 5,
    left: 60,
    backgroundColor:'#ddd',
    borderRadius: 14,
    justifyContent:'center',
    alignItems:'center',
    
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    fontWeight:'500',
    
  },
  iconAddress: {
    marginHorizontal:10
  },
  placeholderText: {
    color: '#333',
  },
});

export default EditProfileScreen;


