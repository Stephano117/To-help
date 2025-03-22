
import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import Voice from '@react-native-community/voice'


const VoiceRecorder: React.FC = () => {
  const [isListening, setIsListening] = useState(false)
  const [recordedText, setRecordedText] = useState('');

const startRec = async () => {
    try {
        await Voice.start('en-US');
        setIsListening(true);
        setRecordedText('')
    } catch (e) {
        console.error("Error ", e);
    }
}

const stopRec = async () => {
    try {
        await Voice.stop();
        setIsListening(false);
    } catch (e) {
        console.error("Error ", e);
    }
}

Voice.onSpeechResults = (event) => {
    const {value} = event;
    if(value){
        setRecordedText(value[0]);
        stopRec();
    }
}

  return (
    <View>
      <Button
        title={isListening ? 'Stop Recording' : 'Start Recording'}
        onPress={isListening ? stopRec : startRec}
      />
      <Text> text : {recordedText}</Text>
    </View>
  );
};

export default VoiceRecorder;