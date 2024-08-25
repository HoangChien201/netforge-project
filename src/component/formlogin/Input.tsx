import { View, Text, StyleSheet, TextInput, Animated } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Image } from "react-native"
import Iconbutton from "../form/Iconbutton"
import { COLOR } from "../../constant/color"

type Props = {
  label: string,
  value: string,
  onchangText: (value: string) => void,
  requireField?: boolean,
  password?: boolean,
  iconE?: boolean,
  iconP?: boolean,
  iconPass?: boolean,
  invalid?: boolean,
  errorMessage?: string, // thêm prop errorMessage
}

const InputLogin = (props: Props) => {
  const { label, onchangText, value, requireField, password, iconE, iconP, iconPass, invalid, errorMessage } = props;
  const [hidePassword, setHidePassword] = useState<boolean | undefined>(password);
  const [showInvalid, setShowInvalid] = useState(invalid);
  const [isFocused, setIsFocused] = useState(false);
  const ref = React.useRef<TextInput>(null);

  useEffect(() => {
    setShowInvalid(invalid);
  }, [invalid]);

  const handleFocus = () => {
    if (ref.current) {
      setIsFocused(true)
      ref.current.setNativeProps({
        style: { borderColor: COLOR.PrimaryColor, borderBottomWidth: 1 }
      });
    }
  };

  const handleBlur = () => {
    if (ref.current) {
      setIsFocused(false)
      ref.current.setNativeProps({
        style: { borderColor: '#DDDDDD', borderBottomWidth: 1 }
      });
    }
  };

  function Secure() {
    setHidePassword(prevState => !prevState);
  }

  const EyePass = () => {
    return (
      <View style={{ position: "absolute", end: 10, top: 45 }}>
        <Iconbutton name={hidePassword ? 'eye-slash' : 'eye'} size={20} color='#DCDCDC' onPress={Secure} />
      </View>
    );
  };

  const onchantext = (value: string) => {
    onchangText(value);
    handleFocus();
  };

  return (
    <View style={[{ margin: 9 }, showInvalid && { marginBottom: 30 }]}>
      <Text style={styles.label}>{label} {requireField && <Text style={{ color: "#C30052" }}>*</Text>}</Text>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          showInvalid && styles.validation
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={" " + label}
        secureTextEntry={hidePassword}
        value={value}
        onChangeText={onchantext}
      />
      {iconE && <Image style={styles.iconMail} source={require('../../media/icon/Mail.png')} />}
      {iconPass && <Image style={styles.iconMail} source={require('../../media/icon/Password.png')} />}
      {iconP && <Image style={styles.iconUser} source={require('../../media/Dicons/user.png')} />}
      {password && <EyePass />}
      {showInvalid && errorMessage && (
        <Text style={styles.errorText}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default InputLogin;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    height: 50,
    paddingLeft: 35,
  },
  label: {
    width: 200,
    height: 21,
    fontFamily: "poppins",
    fontWeight: "400",
    lineHeight: 21,
    fontSize: 14,
    letterSpacing: 0.12,
    marginVertical: 5,
    marginLeft: 10,
    color: "black"
  },
  iconMail: {
    position: 'absolute',
    top: 45,
    start: 10
  },
  iconUser: {
    position: 'absolute',
    top: 22,
    start: 10,
    width: 15,
    height: 15
  },
  validation: {
    borderColor: "#C30052",
    borderBottomWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    fontWeight: "400",
    fontFamily: "poppins",
    position: "absolute",
    bottom: -20,
    left: 10,
  }
});
