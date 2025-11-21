import { Button } from "@/components/ui/button";
import {
	NearestCareProvidersPayload,
	useNearestCareProvidersStore,
} from "@/store/nearestCareProvidersStore";
import { useRouter } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
	Image,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function Index() {
	const router = useRouter();
	const {
		fetchNearestCareProviders,
		nearestCareProviders,
		isLoading,
		error,
	} = useNearestCareProvidersStore();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await fetchNearestCareProviders();
		setRefreshing(false);
	}, []);

	useEffect(() => {
		console.log(nearestCareProviders);
	}, [nearestCareProviders]);

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="w-full h-24 pt-14 flex flex-col gap-3 bg-white px-5 items-center">
				<View className="w-full flex flex-row items-center gap-3">
					<Pressable onPress={() => router.back()}>
						<ArrowLeft size={20} color="#636363" />
					</Pressable>
					<Text className="text-[#515151] text-2xl font-medium">
						Care provider requests
					</Text>
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
					/>
				}
			>
				{isLoading && !refreshing ? (
					<View className="w-full h-full flex items-center justify-center">
						<Text className="text-base font-medium text-[#0D99C9]">
							Loading...
						</Text>
					</View>
				) : error ? (
					<View className="w-full h-full flex items-center justify-center">
						<Text className="text-base font-medium text-red-500">
							{error}
						</Text>
					</View>
				) : nearestCareProviders.length > 0 ? (
					nearestCareProviders.map((careProvider) => (
						<CareProviderCard
							key={careProvider.id}
							careProvider={careProvider}
						/>
					))
				) : (
					<View className="w-full h-full flex items-center justify-center">
						<Text className="text-base font-medium text-[#0D99C9]">
							No care providers found
						</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

function CareProviderCard({
	careProvider,
}: {
	careProvider: NearestCareProvidersPayload;
}) {
	const router = useRouter();

	return (
		<View className="p-4 bg-white border border-[#E6E6E6] rounded-lg flex flex-col gap-3">
			<View className="w-full flex flex-row items-start gap-3">
				<View className="w-14 h-14 rounded-full flex items-center justify-center">
					<Image
						source={
							careProvider.user.profile_image_url
								? {
										uri: careProvider.user
											.profile_image_url,
									}
								: require("@/assets/images/avatar.jpg")
						}
						className="w-full h-full rounded-full"
						resizeMode="cover"
					/>
				</View>

				<View className="flex flex-1 flex-col gap-1">
					<Text className="text-[#4D4D4D] text-xl font-medium">
						{careProvider.user.full_name}
					</Text>
					<Text className="text-[#808080] text-base font-normal">
						{careProvider.city}, {careProvider.country}
					</Text>
					<Text
						numberOfLines={3}
						ellipsizeMode="tail"
						className="text-sm font-normal text-[#999999]"
					>
						{careProvider.profile_title}
					</Text>
				</View>
			</View>

			<View className="w-full flex flex-row gap-3 items-center">
				<View className="w-[31%] flex flex-col gap-1 bg-[#FCFCFC] rounded-lg border border-[#F5F5F5] p-2">
					<Text className="text-[#999999] text-base font-normal">
						Experience
					</Text>
					<Text className="text-[#808080] text-lg font-medium">
						{careProvider.years_of_experience > 1
							? `${careProvider.years_of_experience} years`
							: `${careProvider.years_of_experience} year`}
					</Text>
				</View>

				<View className="w-[31%] flex flex-col gap-1 bg-[#FCFCFC] rounded-lg border border-[#F5F5F5] p-2">
					<Text className="text-[#999999] text-base font-normal">
						Rate
					</Text>
					<Text className="text-[#808080] text-lg font-medium">
						₦{careProvider.hourly_rate}/hr
					</Text>
				</View>

				<View className="w-[31%] flex flex-col gap-1 bg-[#FCFCFC] rounded-lg border border-[#F5F5F5] p-2">
					<Text className="text-[#999999] text-base font-normal">
						Rating
					</Text>

					<View className="w-full flex flex-row items-center gap-3">
						<Text>{careProvider.average_rating}</Text>
						<View className="flex flex-row gap-1 items-center">
							{Array.from({
								length: parseInt(
									careProvider.average_rating.toString()
								),
							}).map((_, i) => (
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
						onPress={() =>
							router.push(
								"/seeker/(tabs)/home/care-providers/[id]"
							)
						}
						title="View Details"
						variant="primary-outline"
					/>
				</View>
			</View>
		</View>
	);
}
