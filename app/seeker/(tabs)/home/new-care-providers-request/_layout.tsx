import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewCareProvidersRequestLayout() {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";
	const { top } = useSafeAreaInsets();

	return (
		<>
			<StatusBar
				translucent={true}
				backgroundColor={isDark ? "transparent" : "#000"}
			/>

			{/* <View style={{ marginTop: top }} /> */}
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="[id]" options={{ title: "Job Details" }} />
			</Stack>
		</>
	);
}
