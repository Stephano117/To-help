import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/onboarding/Button'

const SecondPage = () => {
  const { type } = useLocalSearchParams()

  const imageSwitch = (name: string) => {
    if (name === 'Mona') {
      return require('../../assets/images/active-listening.png');
    }else{
      return require('../../assets/images/speaking.png');
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
            >
              <Text className='text-xl font-pmedium'>{type}</Text>
            </View>
          ),
          headerBackVisible: true,
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView className='flex-1 bg-white flex-col items-center justify-evenly' >
        <View className='mx-5'>
          <Text className='text-gray-500 font-pregular'>
            Lorem ipsum dolor sit.
          </Text>
        </View>
        <View className='flex flex-row items-center justify-center mt-12'>
          <Image source={imageSwitch(type as any)} className='size-60' resizeMode='contain' />
        </View>
        <View className='mt-5 mx-5'>
          <Text className='text-twprimary text-center text-3xl font-pbold'>Welcome </Text>
          <Text className='text-gray-500 text-center font-pregular'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laboriosam est dolor commodi assumenda facere. Saepe minus officiis accusantium quisquam laborum laudantium atque molestiae nam possimus. Esse animi modi adipisci!
          </Text>
        </View>
        <View className='flex flex-row justify-center gap-20 '>
          <View className='w-40' >
            <Button label='Non' onHandle={() => router.push('/(tabs)')} />
          </View>
          <View className='w-40'>
            <Button label='Oui' type={true} onHandle={() => router.push('/(tabs)')} />
          </View>
        </View>
      </SafeAreaView>
    </>

  )
}

export default SecondPage

const styles = StyleSheet.create({})