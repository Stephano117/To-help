import GeminiChat from "@/components/Gemini";
import Button from "@/components/onboarding/Button";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FlashMessage from "react-native-flash-message";


export default function Voice() {
    return (
        <View style={styles.container}>
            <GeminiChat />
            <FlashMessage position={"top"} />
            <Button label="notification" onHandle={() => router.push('/other/test')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});