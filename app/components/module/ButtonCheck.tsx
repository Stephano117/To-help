import { Image, StyleSheet, Text, TouchableOpacity, View,ImageSourcePropType } from 'react-native'
import React from 'react'

interface propstype  {
    imageSource: ImageSourcePropType;
    label: string;
    onHandle: () => void;
}
const ButtonCheck: React.FC<propstype> = ({ imageSource, onHandle,label, ...props }) => {
  return (
    <TouchableOpacity onPress={onHandle} className='bg-twsecondary rounded-lg shadow-black shadow-xl p-5 w-52'>
        <Image source={imageSource} className='size-36' resizeMode='contain' />
        <Text className='text-twprimary font-black mt-2'>{label}</Text >
    </TouchableOpacity>
  )
}

export default ButtonCheck

const styles = StyleSheet.create({})