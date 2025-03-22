import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface CustomerButtonProps {
    onHandle: () => void;
    label: string;
    type: boolean;
}

const Button: React.FC<CustomerButtonProps> = ({ label, type, onHandle }) => {
    return (
        <>
            {type ? (
                <TouchableOpacity onPress={onHandle} className='bg-twprimary w-full rounded-xl px-8 py-4 shadow-black shadow-sm'>
                    <Text className='text-xl text-twtertiary font-pmedium text-center'>
                        {label}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={onHandle} className='bg-white border-2 border-twprimary w-full rounded-xl px-8 py-4 shadow-black shadow-sm'>
                    <Text className='text-xl text-twprimary font-pmedium text-center'>
                        {label}
                    </Text>
                </TouchableOpacity>
            )}
        </>

    )
}

export default Button

const styles = StyleSheet.create({})