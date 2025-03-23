import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

// Configurer les notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function NotificationScreen() {
    useEffect(() => {
        // Demander la permission pour les notifications
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission for notifications not granted!');
            }
        };

        requestPermissions();
    }, []);

    const triggerNotification = async () => {
        // Faire vibrer le téléphone
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        // Jouer un son
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../../assets/notification.wav')); // Remplacez par le chemin de votre fichier son
        await soundObject.playAsync();

        for (let i = 0; i < 4; i++) {
            // Envoyer une notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Notification Title',
                    body: 'Mihinana vary',
                    sound: true,
                    vibrate: [2, 250, 250, 250], // Jouer un son par défaut
                },
                trigger: { seconds: 1 }, // La notification sera déclenchée après 1 seconde
            });
        };
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notification Screen</Text>
            <Button title="Trigger Notification" onPress={triggerNotification} />
        </View>
    );
}