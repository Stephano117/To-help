import { FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";


const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 72,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accuel",
          headerShown: false,
          tabBarIcon: ({color, focused }) => (
            <View className="flex flex-col items-center justify-center gap-y-0.5">
                <FontAwesome6 name="calendar" size={22} color={focused ? "#5B3E90" : 'gray'} />
              {focused && (
                <View className="bg-twprimary w-3 h-1.5 rounded-full" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="voice"
        options={{
          title: "Voice",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center gap-y-0.5">
                <MaterialIcons className="ml-1.5" name="record-voice-over" size={22} color={focused ? "#5B3E90" : 'gray'}/>
              {focused && (
                <View className="bg-twprimary w-3 h-1.5 rounded-full" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center justify-center gap-y-0.5">
                <Fontisto name="map" size={20} color={focused ? "#5B3E90" : 'gray'}/>
              {focused && (
                <View className="bg-twprimary w-3 h-1.5 rounded-full" />
              )}
            </View>
          ),
        }}
      />

      

     
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
