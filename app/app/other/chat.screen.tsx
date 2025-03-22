import { StyleSheet, Text, View ,TextInput,Button} from 'react-native'
import React,{useState} from 'react'
import * as Speech from 'expo-speech';
import { router } from 'expo-router';

const Chat = () => {
  const [text, setText] = useState('');

  const speak = () => {
    if (text.trim()) {
      Speech.speak(text, {
        language: 'fr-FR', // Langue française
        rate: 1.0, // Vitesse de lecture
        pitch: 1.1, // Hauteur de la voix
      });
    } else {
      alert('Veuillez entrer un texte à lire.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Entrez un texte"
        value={text}
        onChangeText={setText}
      />
      <Button title="Lire le texte" onPress={speak} />
      <Button title="Lire le texte" onPress={()=>router.push('/other/voice.screen')} />
    </View>
  );

}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
})