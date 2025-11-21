import { useRouter } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import { useState } from "react";
import {
	Image,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";

export default function Message() {
	const router = useRouter();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		// // await fetchMessages();
		// setRefreshing(false);

		const timer = setTimeout(() => {
			setRefreshing(false);
		}, 8000);

		return () => {
			clearTimeout(timer);
		};
	};

	return (
		<SafeAreaView className="w-full h-full">
			<View className="w-full h-40 pt-14 flex flex-col gap-3 bg-[#F3FAFC] p-5 items-center">
				<View className="w-full flex flex-row items-center gap-3">
					<Pressable onPress={() => router.back()}>
						<ArrowLeft size={20} color="#636363" />
					</Pressable>
					<Text className="text-[#515151] text-2xl font-medium">
						Message
					</Text>
				</View>

				<View className="relative flex-1 flex-row items-center">
					<TextInput
						className="bg-white border-[#DEF0F7] border w-full rounded-md h-12 px-4 pl-12 text-foreground placeholder:text-[#CCCCCC]"
						placeholder="Search for message"
						style={{
							textAlignVertical: "center",
						}}
					/>
					<Pressable
						style={({ pressed }) => ({
							opacity: pressed ? 0.7 : 1,
							transform: [{ scale: pressed ? 0.98 : 1 }],
						})}
						className="absolute left-4"
					>
						<Search size={18} color="#C4C4C4" />
					</Pressable>
				</View>
			</View>
			<ScrollView
				className="p-5 bg-white"
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 60,
				}}
				contentContainerClassName="gap-6"
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={["#0D99C9"]}
						tintColor="#0D99C9"
					/>
				}
			>
				{refreshing && (
					<View className="w-full h-full flex items-center justify-center">
						<Text className="text-primary/50 font-medium">
							Loading conversations...
						</Text>
					</View>
				)}

				{!refreshing && (
					<View className="w-full h-full flex items-center justify-center">
						<Text className="text-red-500/50 font-medium">
							Couldn't find any conversations
						</Text>
					</View>
				)}

				{/* {Array.from({ length: 20 }).map((_, index) => (
					<Pressable
						key={index}
						onPress={() =>
							router.push("/seeker/(tabs)/message/[id]")
						}
					>
						<MessageCard />
					</Pressable>
				))} */}
			</ScrollView>
		</SafeAreaView>
	);
}

function MessageCard() {
	return (
		<View className="w-full flex flex-1 flex-row items-start justify-between gap-4">
			{/* image */}
			<View className="w-12 h-12 flex items-center justify-center">
				<Image
					source={require("@/assets/images/avatar.jpg")}
					resizeMethod="resize"
					className="w-full h-full rounded-full"
				/>
			</View>

			{/* middle content */}
			<View className="flex flex-1 flex-col gap-1">
				<Text className="text-base font-medium text-[#666666]">
					Aleem Sarah
				</Text>
				<Text className="text-[#B3B3B3] font-normal text-sm">
					The dishes have been washed and I only need to take out the
					trash
				</Text>
			</View>

			<Text className="text-[#999999] font-normal text-sm">10.00 PM</Text>
		</View>
	);
}
