import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const VoiceRecognitionScreen: React.FC = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Démarrer l'enregistrement
    const startRecording = async () => {
        try {
            console.log('Demande de permissions audio...');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Démarrage de l\'enregistrement...');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            console.log('Enregistrement démarré');
        } catch (err) {
            console.error('Erreur lors du démarrage de l\'enregistrement:', err);
        }
    };

    // Arrêter l'enregistrement
    const stopRecording = async () => {
        console.log('Arrêt de l\'enregistrement...');
        setIsRecording(false);
        if (recording) {
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            const uri = recording.getURI();
            console.log('Enregistrement arrêté. URI:', uri);
            if (uri) {
                await sendAudioToServer(uri);
            }
            setRecording(null);
        }
    };

    // Envoyer l'audio au serveur
    const sendAudioToServer = async (audioUri: string) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('audio', {
            uri: audioUri,
            name: 'recording.wav',
            type: 'audio/wav',
        } as any);
        formData.append('duration', '5'); // Durée de l'enregistrement
        formData.append('engine', 'google'); // Moteur de reconnaissance vocale

        try {
            const response = await fetch('http://192.168.83.70:3000/api/recognize', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                setTranscription(result.text);
            } else {
                console.error('Erreur lors de la transcription:', result.message);
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'audio:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reconnaissance vocale</Text>
            <Button
                title={isRecording ? 'Arrêter l\'enregistrement' : 'Démarrer l\'enregistrement'}
                onPress={isRecording ? stopRecording : startRecording}
            />
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {transcription && (
                <View style={styles.transcriptionContainer}>
                    <Text style={styles.transcriptionText}>Texte transcrit:</Text>
                    <Text style={styles.transcription}>{transcription}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    transcriptionContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    transcriptionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    transcription: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default VoiceRecognitionScreen;