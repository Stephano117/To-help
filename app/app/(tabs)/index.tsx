import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Agenda } from "react-native-calendars";
import { router } from 'expo-router';

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
    const handleAddEvent = () => {
        router.push('/other/AddAgenda')
    };

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
            {/* Bouton flottant pour ajouter un événement */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={handleAddEvent}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#5B3E90',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        right: 20,
        elevation: 8, // Pour l'ombre sur Android
        shadowColor: '#000', // Pour l'ombre sur iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    floatingButtonText: {
        fontSize: 30,
        color: '#FFF',
    },
});