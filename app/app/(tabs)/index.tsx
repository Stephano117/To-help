import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Agenda } from "react-native-calendars";

const index = () => {
  return (
    <View className='flex-1'>
      <Agenda />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})