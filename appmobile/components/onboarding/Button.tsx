import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface CustomerButtonProps {
    onHandle: () => void;
    label: string;
    type: boolean;
}

const Button: React.FC<CustomerButtonProps> = ({ label, type, onHandle }) => {
    return (
        <TouchableOpacity className='bg-twsecondary px-8 py-4'>
            <Text>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({})