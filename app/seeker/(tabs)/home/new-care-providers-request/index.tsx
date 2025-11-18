import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { ArrowLeft, Info, Star } from "lucide-react-native";
import { useEffect } from "react";
import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function Index() {
	const router = useRouter();
	// const {
	// 	getPendingActivities,
	// 	getActiveActivities,
	// 	getClosedActivities,
	// 	pendingActivities,
	// 	activeActivities,
	// 	closedActivities,
	// 	isLoading,
	// 	error,
	// } = useActivitiesStore();

	useEffect(() => {
		// const fetchData = async () => {
		// 	await Promise.all([
		// 		getActiveActivities(),
		// 		getClosedActivities(),
		// 		getPendingActivities(),
		// 	]);
		// };
		// fetchData();
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="w-full h-24 pt-14 flex flex-col gap-3 bg-white px-5 items-center">
				<View className="w-full flex flex-row items-center gap-3">
					<Pressable onPress={() => router.back()}>
						<ArrowLeft size={20} color="#636363" />
					</Pressable>
					<Text className="text-[#515151] text-2xl font-medium">
						New care providers request
					</Text>
				</View>
			</View>
			<ScrollView
				className="p-5 bg-white"
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
				contentContainerClassName="gap-6"
			>
				<View className="w-full flex flex-row items-center justify-between gap-5 bg-[#EDF7EE] border border-[#DFF1E1] rounded-lg p-2">
					<View className="flex-1 flex-row items-center gap-3 pr-2">
						<Info size={16} color="#435F46" />
						<Text
							className="text-base text-wrap font-normal text-[#435F46]"
							// numberOfLines={1}
							// ellipsizeMode="tail"
						>
							You can only message 1 care provider on free plan
						</Text>
					</View>

					<Pressable>
						<Text className="text-primary underline text-base font-medium">
							Upgrade
						</Text>
					</Pressable>
				</View>

				{Array.from({ length: 8 }).map((_, index) => (
					<CareProviderCard key={index} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

function CareProviderCard() {
	const router = useRouter();

	return (
		<View className="p-4 bg-white border border-[#E6E6E6] rounded-lg flex flex-col gap-3">
			<View className="w-full flex flex-row items-start gap-3">
				<View className="w-14 h-14 rounded-full flex items-center justify-center">
					<Image
						source={require("@/assets/images/avatar.jpg")}
						className="w-full h-full rounded-full"
						resizeMode="cover"
					/>
				</View>

				<View className="flex flex-1 flex-col gap-1">
					<Text className="text-[#4D4D4D] text-xl font-medium">
						Aleem Sarah
					</Text>
					<Text className="text-[#808080] text-base font-normal">
						Old Dallas, Salford, UK{" "}
						<Text className="text-xs text-[#B3B3B3]">
							(45 minutes from location)
						</Text>
					</Text>
					<Text
						numberOfLines={3}
						ellipsizeMode="tail"
						className="text-sm font-normal text-[#999999]"
					>
						5 years of experience taking care of all children and
						running different errands, I am Patient
					</Text>
				</View>
			</View>

			<View className="w-full flex flex-row gap-3 items-center">
				<View className="w-[31%] flex flex-col gap-1 bg-[#FCFCFC] rounded-lg border border-[#F5F5F5] p-2">
					<Text className="text-[#999999] text-base font-normal">
						Experience
					</Text>
					<Text className="text-[#808080] text-lg font-medium">
						8 Years
					</Text>
				</View>

				<View className="w-[31%] flex flex-col gap-1 bg-[#FCFCFC] rounded-lg border border-[#F5F5F5] p-2">
					<Text className="text-[#999999] text-base font-normal">
						Rate
					</Text>
					<Text className="text-[#808080] text-lg font-medium">
						$135/hr
					</Text>
				</View>

				<View className="w-[31%] flex flex-col gap-1 bg-[#FCFCFC] rounded-lg border border-[#F5F5F5] p-2">
					<Text className="text-[#999999] text-base font-normal">
						Rating
					</Text>

					<View className="w-full flex flex-row items-center gap-3">
						<Text>5.0</Text>
						<View className="flex flex-row gap-1 items-center">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									size={10}
									color="#CB9E49"
									fill="#CB9E49"
								/>
							))}
						</View>
					</View>
				</View>
			</View>

			<View className="w-full flex flex-row items-center gap-3">
				<View className="w-[48%] flex items-center justify-center">
					<Button title="Message" />
				</View>

				<View className="w-[48%] flex items-center justify-center">
					<Button
						onPress={() => router.push("/seeker/requests/1")}
						title="View Details"
						variant="primary-outline"
					/>
				</View>
			</View>
		</View>
	);
}
