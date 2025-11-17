import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { Star } from "lucide-react-native";
import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function NearCareProviders() {
	const router = useRouter();

	return (
		<SafeAreaView className="w-full h-full bg-white">
			<View className="w-full h-24 pt-14 flex flex-col gap-3 px-5 items-center">
				<View className="w-full flex flex-row items-center justify-between gap-3">
					<Text className="text-[#515151] text-2xl font-medium">
						Care Providers near you
					</Text>
					<Pressable
						className="text-primary"
						onPress={() => router.push("/seeker/summary")}
					>
						<Text className="text-primary text-base font-medium">
							Continue
						</Text>
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
			>
				{Array.from({ length: 8 }).map((_, index) => (
					<CareProviderCard key={index} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

function CareProviderCard() {
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
						Old Dallas, Salford, UK
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
					<Button title="Interested" />
				</View>

				<View className="w-[48%] flex items-center justify-center">
					<Button title="Not Interested" variant="primary-outline" />
				</View>
			</View>
		</View>
	);
}
