import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Stack } from 'expo-router';
import Input from '@/components/module/Input';
import Button from '@/components/onboarding/Button';
// import DateTimePicker from '@react-native-community/datetimepicker';

const AddAgenda = () => {
    // États pour le dropdown
    const [selectedValue, setSelectedValue] = useState("Option 1");
    const [showDropdown, setShowDropdown] = useState(false);

    // États pour le time picker
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [time, setTime] = useState(new Date());

    // Options pour le dropdown
    const dropdownOptions = ["Option 1", "Option 2", "Option 3"];

    // Gestion du time picker
    const handleTimeChange = (event : any, selectedTime : any) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    return (
        <>
            {/* Configuration de l'en-tête */}
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View>
                            <Text className='text-xl font-pmedium'>Nouvelle Agenda</Text>
                        </View>
                    ),
                    headerBackVisible: true,
                    headerShadowVisible: false,
                }}
            />

            {/* Contenu principal */}
            <ScrollView className='flex-1 bg-white'>
                {/* Section de bienvenue */}
                <View className='mx-5 mt-8'>
                    <Text className='text-twprimary text-3xl font-pbold'>Welcome</Text>
                    <Text className='text-gray-500 font-pregular'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta tempora alias libero maiores deserunt.
                    </Text>
                </View>

                {/* Champ de titre */}
                <View className='mx-5 mt-5'>
                    <Input plach='Titre' />
                </View>

                {/* Champ de description */}
                <View className='mx-5 mt-4'>
                    <Input plach='Description' />
                </View>

                {/* Champ de lieu */}
                <View className='mx-5 mt-4'>
                    <Input plach='Lieu' />
                </View>

                {/* Dropdown et Time Picker */}
                <View className='mx-5 mt-4 flex flex-row items-center justify-between gap-x-4'>
                    {/* Dropdown personnalisé */}
                    <View className='w-48'>
                        <TouchableOpacity
                            onPress={() => setShowDropdown(true)}
                            style={styles.dropdownButton}
                        >
                            <Text>{selectedValue}</Text>
                        </TouchableOpacity>

                        {/* Modal pour le dropdown */}
                        <Modal
                            visible={showDropdown}
                            transparent={true}
                            animationType="slide"
                            onRequestClose={() => setShowDropdown(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    {dropdownOptions.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setSelectedValue(option);
                                                setShowDropdown(false);
                                            }}
                                            style={styles.dropdownOption}
                                        >
                                            <Text>{option}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </Modal>
                    </View>

                    {/* Time Picker */}
                    <View className='w-48'>
                        <TouchableOpacity
                            onPress={() => setShowTimePicker(true)}
                            style={styles.timePickerButton}
                        >
                            <Text>{time.toLocaleTimeString()}</Text>
                        </TouchableOpacity>

                        {/* Afficher le time picker */}
                        {/* {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )} */}
                    </View>
                </View>

                {/* Bouton d'ajout */}
                <View className='mx-4 mt-10'>
                    <Button label='Ajouter' type={true} />
                </View>
            </ScrollView>
        </>
    );
};

export default AddAgenda;

// Styles
const styles = StyleSheet.create({
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    timePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    dropdownOption: {
        padding: 10,
    },
});