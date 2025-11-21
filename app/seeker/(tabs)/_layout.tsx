import NoRippleTabButton from "@/components/ui/no-rippler-pressable";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	House,
	Pyramid,
	ScrollText,
	Settings,
	Wallet,
} from "lucide-react-native";
import { SafeAreaView, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	const { bottom } = useSafeAreaInsets();

	// Typical comfortable tab bar height = 50–60 + bottom inset
	const tabBarHeight = bottom ? bottom + 58 : 68;

	console.log(tabBarHeight);

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
						height: tabBarHeight,
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
							pathname: "/seeker/home",
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
					name="requests"
					options={{
						title: "Requests",
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
