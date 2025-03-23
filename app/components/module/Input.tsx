import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  searchText?: string;
  plach?: string;
  setSearchText?: (text: string) => void;
}

const Input: React.FC<SearchBarProps> = ({ searchText, setSearchText, plach }) => {
  return (
    <View className="w-full">
      <View className="flex-row items-center bg-neutral-100 rounded-xl p-4 space-x-5 pl-6">
        <TextInput
          placeholder={plach}
          placeholderTextColor={"gray"}
          className="flex-1 text-base mb-1 pl-2 tracking-wider"
          onChangeText={setSearchText}
          value={searchText}
        />
        {/* <View className="mr-4">
          <Feather name="search" size={24} color="gray" />
        </View> */}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});