import NoRippleTabButton from "@/components/ui/no-rippler-pressable";
import { useAuthStore } from "@/store/authStore";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	House,
	Pyramid,
	ScrollText,
	Settings,
	Wallet,
} from "lucide-react-native";
import { useEffect } from "react";
import { SafeAreaView, useColorScheme, View } from "react-native";

export default function TabsLayout() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";
	const { user } = useAuthStore();

	useEffect(() => {
		if (user?.user_type === "seeker") {
			router.push("/seeker/(tabs)/home");
		} else {
			router.push("/provider/(tabs)/home");
		}
	}, []);

	return (
		<SafeAreaView className="w-full h-full">
			<StatusBar
				translucent={true}
				backgroundColor={isDark ? "transparent" : "#000"}
			/>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						height: 80,
						paddingTop: 0,
						paddingBottom: 0,
						marginBottom: 0,
						marginTop: 0,
						backgroundColor: "#fff",
						borderTopWidth: 1,
						borderTopColor: "#F2F2F2",
					},
					tabBarActiveTintColor: "#1F6E9D",
					tabBarInactiveTintColor: "#8B8DA7",
					tabBarButton: (props) => <NoRippleTabButton {...props} />,
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						href: {
							pathname: "/provider/home",
							params: {},
						},
						tabBarIcon: ({ color, focused }) => (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
									borderTopWidth: 1,
									borderTopColor: focused
										? "#1F6E9D"
										: "transparent",
									paddingTop: 5,
									paddingBottom: 5,
									width: 60,
									height: 35,
									position: "absolute",
									top: -5,
								}}
							>
								<House color={color} size={22} />
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="activities"
					options={{
						title: "Activities",
						tabBarButton: (props) => (
							<NoRippleTabButton {...props} />
						),
						tabBarIcon: ({ color, focused }) => (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
									borderTopWidth: 1,
									borderTopColor: focused
										? "#1F6E9D"
										: "transparent",
									paddingTop: 5,
									paddingBottom: 5,
									width: 60,
									height: 35,
									position: "absolute",
									top: -5,
								}}
							>
								<Pyramid color={color} size={22} />
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="wallet"
					options={{
						title: "Wallet",
						tabBarButton: (props) => (
							<NoRippleTabButton {...props} />
						),
						tabBarIcon: ({ color, focused }) => (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
									borderTopWidth: 1,
									borderTopColor: focused
										? "#1F6E9D"
										: "transparent",
									paddingTop: 5,
									paddingBottom: 5,
									width: 60,
									height: 35,
									position: "absolute",
									top: -5,
								}}
							>
								<Wallet color={color} size={22} />
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="message"
					options={{
						title: "Message",
						tabBarButton: (props) => (
							<NoRippleTabButton {...props} />
						),
						tabBarIcon: ({ color, focused }) => (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
									borderTopWidth: 1,
									borderTopColor: focused
										? "#1F6E9D"
										: "transparent",
									paddingTop: 5,
									paddingBottom: 5,
									width: 60,
									height: 35,
									position: "absolute",
									top: -5,
								}}
							>
								<ScrollText color={color} size={22} />
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarButton: (props) => (
							<NoRippleTabButton {...props} />
						),
						tabBarIcon: ({ color, focused }) => (
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
									borderTopWidth: 1,
									borderTopColor: focused
										? "#1F6E9D"
										: "transparent",
									paddingTop: 5,
									paddingBottom: 5,
									width: 60,
									height: 35,
									position: "absolute",
									top: -5,
								}}
							>
								<Settings color={color} size={22} />
							</View>
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}
