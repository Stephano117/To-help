import { StyleSheet, Text, View, ScrollView, StatusBar, FlatList } from 'react-native'
import React from 'react'
import ButtonCheck from '@/components/module/ButtonCheck'
import Button from '@/components/onboarding/Button'
import { router } from 'expo-router'

const IndexScreen = () => {

    const DATA = [
        { "id": 1, "name": "Mona", "image": require("../../assets/images/people.png") },
        { "id": 2, "name": "Marenina", "image": require("../../assets/images/deaf (1).png") },
        { "id": 3, "name": "Jamba", "image": require("../../assets/images/blind.png") },
        { "id": 4, "name": "Tsisy Tanana", "image": require("../../assets/images/abuse.png") },
    ]

    const Route = (name: string) => {
        if (name === "Tsisy Tanana") {
            router.push( `/second/${name}` as any)
        }else if (name === "Mona") {
            router.push( `/second/${name}` as any)
        }else if (name === "Marenina") {
            router.push('/(tabs)')
        }else if (name === "Jamba") {
            router.push('/chat-voice')
        }
    }

    return (
        <ScrollView className='flex-1 h-screen'>
            <StatusBar barStyle={"dark-content"} />
            <View className='h-screen flex-col justify-evenly items-center pb-6'>
                <View className='mx-5 mt-8'>
                    <Text className='text-twprimary text-3xl font-pbold'>Welcome </Text>
                    <Text className='text-gray-500 font-pregular'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta tempora alias libero maiores deserunt. Minima iure commodi quae doloribus porro soluta fugit consectetur doloremque, praesentium mollitia possimus hic iste?</Text>
                </View>
                <View className='mx-5 mt-5'>
                    <Text className='text-twprimary text-3xl font-pbold'>Choice dibly </Text>

                    <View className='flex flex-wrap flex-row gap-2'>
                        {DATA.map(data => (
                            <ButtonCheck onHandle={ () => Route(data.name)} key={data.id} label={data.name} imageSource={data.image} />
                        ))}
                    </View>

                </View>
                {/* <View className='mt-9 mx-4 flex flex-col items-center justify-end'>
                    <Button label='test' />
                </View> */}
            </View>
        </ScrollView>
    )
}

export default IndexScreen

const styles = StyleSheet.create({})