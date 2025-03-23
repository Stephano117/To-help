// app/index.tsx
import React, { useState, useEffect } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

interface TranscriptionResponse {
  text: string;
  error?: string;
}

export default function VoiceToTextScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'stopped'>('idle');
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Obtenir les permissions pour l'audio
    async function getPermission() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        console.log('Permission', permission);
        setAudioPermission(permission.granted);
      } catch (error) {
        console.log(error);
      }
    }

    getPermission();
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording(): Promise<void> {
    try {
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        
        setRecording(recording);
        setRecordingStatus('recording');
      }
    } catch (error) {
      console.error('Erreur lors du démarrage de l\'enregistrement:', error);
    }
  }

  async function stopRecording(): Promise<void> {
    try {
      if (recordingStatus === 'recording' && recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        
        setRecording(null);
        setRecordingStatus('stopped');
        
        // Envoyer l'audio au serveur Python si uri n'est pas null
        if (uri) {
          await sendAudioToServer(uri);
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'arrêt de l\'enregistrement:', error);
    }
  }

  async function sendAudioToServer(audioUri: string): Promise<void> {
    setIsLoading(true);
    try {
      // Créer un formulaire pour envoyer le fichier audio
      const formData = new FormData();
      formData.append('audio', {
        uri: audioUri,
        name: 'audio.m4a',
        type: 'audio/m4a',
      } as any);  // Le 'as any' est nécessaire car TypeScript est strict sur les types FormData

      // Envoyer la demande au serveur Python
      const response = await axios.post<TranscriptionResponse>(
        'http://192.168.1.134:5000/transcribe', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setTranscribedText(response.data.text);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'audio:', error);
      setTranscribedText('Erreur lors de la transcription');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convertisseur Vocal en Texte</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title={recordingStatus === 'recording' ? 'Arrêter l\'enregistrement' : 'Commencer l\'enregistrement'}
          onPress={recordingStatus === 'recording' ? stopRecording : startRecording}
          color={recordingStatus === 'recording' ? '#FF6347' : '#4682B4'}
        />
      </View>
      
      <View style={styles.transcriptionContainer}>
        <Text style={styles.label}>Transcription:</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#4682B4" />
        ) : (
          <Text style={styles.transcriptionText}>{transcribedText || 'Aucune transcription disponible'}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '80%',
  },
  transcriptionContainer: {
    marginTop: 20,
    width: '90%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transcriptionText: {
    fontSize: 18,
    lineHeight: 24,
  },
});