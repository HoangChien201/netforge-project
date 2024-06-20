import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMeeting } from '@videosdk.live/react-native-sdk';
import ControlsContainer from './ControlsContainer';
import ParticipantList from '../../component/message/ParticipantList';

const MeetingView = () => {
    const { join, leave, toggleWebcam, toggleMic, meetingId,participants } = useMeeting({});
    const participantsArrId = [...participants.keys()];
  return (
    <View style={{ flex: 1 }}>
      {meetingId ? (
        <Text style={{ fontSize: 18, padding: 12 }}>
          Meeting Id :{meetingId}
        </Text>
      ) : null}
      <ParticipantList participants={participantsArrId}/>
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      />
    </View>
  )
}

export default MeetingView

const styles = StyleSheet.create({})