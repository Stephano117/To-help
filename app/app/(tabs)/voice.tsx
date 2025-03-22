import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import LottieView from "lottie-react-native";
import Button from '@/components/onboarding/Button';
import { router } from 'expo-router';

const voice = () => {
    const [newMessage, setNewMessage] = useState("");
    return (
        <View className='flex-1 flex-col items-center justify-around h-screen bg-white'>
            <LottieView
                source={require("../../assets/Animation - 1742662337382.json")}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
            />
            <View className='mt-5 mx-5'>
                <Text className='text-twprimary text-center text-3xl font-pbold'>Welcome </Text>
                <Text className='text-gray-500 text-center font-pregular'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laboriosam est dolor commodi assumenda facere. Saepe minus officiis accusantium quisquam laborum laudantium atque molestiae nam possimus. Esse animi modi adipisci!
                </Text>
            </View>
            <View className='w-96' >
                <Button label='Start Voice' onHandle={() => router.push('/other/chat.screen')} type={true} />
            </View>
        </View>
    )
}

export default voice

const styles = StyleSheet.create({})