import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const RootSecondly = () => {
  
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="[type]" options={{ headerShown: true }} />
    </Stack>
  );
 
}

export default RootSecondly

const styles = StyleSheet.create({})