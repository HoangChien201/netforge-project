import { Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { COLOR } from '../constant/color';
import ModalFail from '../component/Modal/ModalFail';
import ButtonLogin from '../component/form/ButtonLogin';
import InputLogin from '../component/formlogin/Input';
import Loading from '../component/Modal/Loading';
import { changePassword } from '../http/PhuHTTP';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../component/store/store';
import { deleteUser } from '../component/store/userSlice';

interface resetPass {
    newPassword: string,
    confirmPassword: string,
    oldPassword: string
}
export type valid = {
    newPassword: string | null,
    confirmPassword: string | null,
    oldPassword: string | null,
}

const ChangePassword = () => {
    const navigation = useNavigation()
    const isFocus = useIsFocused()
    const user = useSelector((state: RootState) => state.user.value)
    const dispatch = useDispatch()
    const token = user?.token;

    useEffect(() => {
        if (isFocus) {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'none',
                }
            });
        }
    }, [isFocus]);

    const [isLoading, setIsLoading] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [showModalFailChange, setShowModalFailChange] = useState(false);
    const [showModalFailOldPassword, setShowModalFailOldPassword] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [valueF, setValueF] = useState<resetPass>({ newPassword: "", confirmPassword: "", oldPassword: "" });
    const [valid, setValid] = useState<valid>({ newPassword: null, confirmPassword: null, oldPassword: null });

    function onChangText(key: string, values: string) {
        setValueF({
            ...valueF,
            [key]: values
        })
    }

    const showModalFalse = () => {
        setShowModalFailChange(true);
        setTimeout(() => {
            setShowModalFailChange(false)
            setIsLoading(false);
        }, 2000);
    }

    const LogoutHandle = () => {
        setShowModalSuccess(false);
        dispatch(deleteUser());
    }

    const handleNoLogOut = () => {
        setShowModalSuccess(false);
        navigation.goBack();
    }

    const handleChangePassword = async () => {
        const { newPassword, confirmPassword, oldPassword } = { ...valueF };
        let isValidNewPass = newPassword.trim().length > 0;
        let isValidConfirmPass = confirmPassword.trim().length > 0;
        let isValidConfirmPassNew = confirmPassword.trim() === newPassword.trim();
        let isValidOldPassword = oldPassword.trim().length > 0;
        let isValidNewPassLength = newPassword.trim.length >= 6;

        if (!isValidOldPassword) {
            setValid({
                oldPassword: isValidNewPass ? null : 'Vui lòng nhập mật khẩu cũ!',
                newPassword: null,
                confirmPassword: null,
            });
            return
        } else if (!isValidNewPass){
            setValid({
                oldPassword: null,
                newPassword: isValidNewPass ? null : 'Vui lòng nhập mật khẩu mới!',
                confirmPassword: null
            });
            return
        } 
        // else if (!isValidNewPassLength) {
        //     setValid({
        //         oldPassword: null,
        //         newPassword: isValidNewPassLength ? null : 'Mật khẩu phải có 6 ký tự trở lên!',
        //         confirmPassword: null
        //     });
        //     return
        // }
        else if (!isValidConfirmPass) {
            setValid({
                oldPassword: null,
                newPassword: null,
                confirmPassword: isValidConfirmPass ? null : 'Vui lòng nhập lại mật khẩu mới!'
            });
            return
        } else if (!isValidConfirmPassNew) {
            setValid({ 
                confirmPassword: isValidConfirmPassNew ? null : 'Nhập lại mật khẩu mới không khớp!', 
                newPassword: null, 
                oldPassword: null });
            return
        } else {
            setValid({ oldPassword: null, newPassword: null, confirmPassword: null });
            if (isValidNewPass && isValidConfirmPass && isValidOldPassword) {
                try {
                    const response = await changePassword(oldPassword, confirmPassword, token);
                    setIsLoading(true);
                    const status = response.status;
                    if (status === -2) {
                        setShowModalFailOldPassword(true)
                        setTimeout(() => {
                            setShowModalFailOldPassword(false);
                            setIsLoading(false);

                        }, 2000);
                    }
                    else if (status === 1) {
                        if (newPassword === oldPassword) {
                            // Alert.alert("Lỗi", "Mật khẩu mới không thể giống mật khẩu cũ!");
                            // return;
                            setShowModalError(true);
                            setTimeout(() => {
                                setShowModalError(false)
                                setIsLoading(false);
                            }, 2000);
                            return;
                        }
                        setShowModalSuccess(true);
                        setIsLoading(false);
                    }
                } catch (error) {
                    showModalFalse();
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading} />
            <View>
                <View style={{ marginTop: 16 }}>
                    {/* <Text style={styles.txt2}>
                    Vui lòng cập nhập lại mật khẩu mới của bạn.</Text>    */}
                </View>
                {/* <InputLogin errorMessage={valid.password} invalid={!!valid.password} label="Mật khẩu" value={valueF.password} onchangText={onChangText.bind(this, 'password')} iconPass password={true} /> */}
                <InputLogin errorMessage={valid.oldPassword} invalid={!!valid.oldPassword} label="Mật khẩu hiện tại" value={valueF.oldPassword} onchangText={onChangText.bind(this, 'oldPassword')} iconPass password={true} />
                <InputLogin errorMessage={valid.newPassword} invalid={!!valid.newPassword} label="Mật khẩu mới" value={valueF.newPassword} onchangText={onChangText.bind(this, 'newPassword')} iconPass password={true} />
                <InputLogin errorMessage= {valid.confirmPassword} invalid={!!valid.confirmPassword} label="Nhập lại mật khẩu mới" value={valueF.confirmPassword} onchangText={onChangText.bind(this, 'confirmPassword')} iconPass password={true} />
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingVertical: 20,
                }}></View>
            <View style={styles.btnResetPass}>
                <ButtonLogin
                    textLogin
                    chilren="Cập nhật"
                    textColor="#fff"
                    onPress={handleChangePassword}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalSuccess}
                onRequestClose={() => setShowModalSuccess(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center", justifyContent: 'center' }}>
                            <Image source={require('../media/Dicons/check.png')} style={{ height: 120, width: 120 }} />
                            <Text style={{ marginVertical: 30, fontSize: 18, textAlign: "center", fontFamily: "popins", fontWeight: '600' }}>
                                Đổi mật khẩu thành công!{'\n'}Bạn có muốn đăng xuất không?
                            </Text>
                        </View>
                        {/* <Text style={styles.modalText}>Đổi mật khẩu thành công. Bạn có muốn đăng xuất không?</Text> */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => handleNoLogOut()}>
                                <Text style={styles.buttonText}>Không</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={() => LogoutHandle()}>
                                <Text style={[styles.buttonText, { color: '#fff' }]}>Có</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {showModalError && (
                <ModalFail text="Mật khẩu mới không thể giống mật khẩu cũ!" visible={true} />
            )}
            {showModalFailChange && (
                <ModalFail text="Đổi mật khẩu thất bại!" visible={showModalFailChange} />
            )}
            {showModalFailOldPassword && (
                <ModalFail text="Mật khẩu cũ không đúng!" visible={showModalFailOldPassword} />
            )}
        </View>
    );
};

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "#ffff",
        padding: 18
    },
    viewAll: {
        flex: 1,
    },
    viewContent: {
        backgroundColor: "#ffff",
        flex: 1,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        padding: 18
    },
    txt1: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 36,
        paddingLeft: 30
    },
    txt2: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#4e4b66'
    },
    image: {
        width: 20,
        height: 15,
        tintColor: "white"
    },
    viewToolbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingTop: 20,
    },
    btnResetPass: {
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        padding: 12,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700'
    },
    buttonConfirm: {
        backgroundColor: COLOR.PrimaryColor,
    },
});
