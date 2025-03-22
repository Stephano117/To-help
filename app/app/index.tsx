import Button from "@/components/onboarding/Button";
import IndexScreen from "@/screen/home/index.screen";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white flex-1">
      <IndexScreen />
    </SafeAreaView>
  );
}
