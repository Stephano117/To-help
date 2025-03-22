import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Agenda } from "react-native-calendars";

const items = {
    "2025-03-10": [
        {
            name: "Planchado 1",
            data: "lorem ipsum dolor sit amet  weriopoialkfl;k",
            providerName: "Big Parker",
            providerColor: "#FF5733",
        },
    ],
    "2025-03-12": [
        {
            name: "Planchado 2",
            data: "lorem ipsum dolor sit amet  weriopoialkfl;k",
            providerName: "Elon Musk",
            providerColor: "#33FF57",
        },
    ],
    "2025-03-14": [
        {
            name: "Manitas 3",
            data: "Test test this is a test",
            providerName: "James Brown",
            providerColor: "#3357FF",
        },
    ],
    "2025-03-22": [
        {
            name: "Planchado 3",
            data: "lorasdfasdfasdfk qeuwrqpieur  ja sd;fkja sd;fkljas det  weriopoialkfl;k",
            providerName: "Alex Bryan",
            providerColor: "#3357FF",
        },
    ],
    "2025-03-20": [
        {
            name: "Planchado 4",
            data: "lorem ipsum dolor sit amet  weriopoialkfl;k",
            providerName: "Harry Potter",
            providerColor: "#FF33A1",
        },
    ],
    "2025-04-05": [
        {
            name: "Planchado 5",
            data: "lorem ipsum dolor sit amet  weriopoialkfl;k",
            providerName: "John Doe",
            providerColor: "#A133FF",
        },
    ],
    "2025-04-15": [
        {
            name: "Planchado 6",
            data: "lorem ipsum dolor sit amet  weriopoialkfl;k",
            providerName: "John Doe",
            providerColor: "#33FFF5",
        },
    ],
};

interface Item {
    name: string;
    data: string;
    providerName: string;
    providerColor: string;
}
const index = () => {
    return (
        <View className='flex-1'>
            <Agenda
                items={items}
                renderItem={(item: any) => (
                    <TouchableOpacity
                        className="rounded-xl flex-row justify-between flex-1 mr-4 mt-6 p-4 bg-gray-50"
                        // onPress={() => handleItemPress(item)}
                    >
                        <View className="max-w-72">
                            <Text className="text-lg font-bold text-twprimary">
                                {item.name}
                            </Text>
                            <Text className="text-gray-500">{item.data}</Text>
                        </View>
                        <View>
                            <Text
                                className="p-3 font-bold text-white text-lg uppercase rounded-full text-center flex items-center justify-center"
                                style={{ backgroundColor: item.providerColor }}
                            >
                                {item.providerName
                                    .split(" ")
                                    .map((word: string) => word[0])
                                    .join("")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})