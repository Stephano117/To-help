import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

// Définir le type d'un message
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Ajouter le message de l'utilisateur à la liste des messages
    const userMessage: Message = { id: messages.length + 1, text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    // Envoyer le message à Botpress
    try {
      const response = await axios.post('https://chat.botpress.cloud/dd8e504b-a36a-4538-b787-abd19e97e81c/converse', {
        type: 'text',
        text: inputText,
        userId: 'user-id', // Remplacez par un ID utilisateur unique
      });

      // Ajouter la réponse du chatbot à la liste des messages
      const botMessage: Message = { id: messages.length + 2, text: response.data.responses[0].text, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erreur lors de la communication avec Botpress:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez un message..."
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;