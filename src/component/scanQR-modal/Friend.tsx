import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMyContext } from '../navigation/UserContext'
import { sendRequest } from '../../http/QuyetHTTP'
type Fri = {
  id: number
}
const Friend: React.FC<Fri> = ({ id }) => {
  const [textReqState, setTextReqState] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({});
  const [isYou, setIsYou] = useState(false);
  const status = 1;
  const { user } = useMyContext();
  useEffect(() => {
    if (user.id == id) {
      setIsYou(true);
    }
  })
  const sendRequestFriend = async (id: number, status: number) => {
    setDisabledButtons((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      const result = await sendRequest(id, status);
      // console.log('đã gửi lời mời');
      // console.log('id: '+ id + 'status: ' + status);
      if (result) {
        setTextReqState((prevState) => ({
          ...prevState,
          [id]: 'Đã gửi lời mời'
        }));
      }
    } catch (error) {
      setDisabledButtons((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  }
  return (
    <View style={styles.container}>
      {isYou == true ?
        <View style={styles.button} >
          <Text style={styles.text}>
            Oh..! Đây là bạn
          </Text>
        </View>
        :
        <TouchableOpacity style={styles.button}
          onPress={() => { sendRequestFriend(id, status) }} disabled={textReqState[id] === 'Đã gửi' || disabledButtons[id]} >
          <Text style={styles.text}>
            {textReqState[id] === 'Đã gửi lời mời' ? 'Đã gửi lời mời' : 'Gửi lời mời'}
          </Text>
        </TouchableOpacity>
      }

    </View>
  )
}

export default Friend

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#07A3B2',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    width: '78%'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }

})