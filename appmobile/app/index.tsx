import Button from "@/components/onboarding/Button";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-twprimary flex-1">
      <StatusBar style="light" />
      <View className="flex flex-col items-center justify-center gap-y-5">
        <Button label="Test" type={true}  />
      </View>
    </SafeAreaView>
  );
}
