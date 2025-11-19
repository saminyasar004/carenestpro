import SubscribeModal from "@/components/common/subscribe-modal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useSeekerDashboardStore } from "@/store/useSeekerDashboard";
import { useRouter } from "expo-router";
import { BadgeCheck, Bell, FolderOpen } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function HomePage() {
	const router = useRouter();
	const { user } = useAuthStore();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState(false);
	const { dashboardData, fetchDashboardData, isLoading, error } =
		useSeekerDashboardStore();

	useEffect(() => {
		console.log(user);
		setShowModal(true);
	}, []);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setShowModal(true);
		fetchDashboardData();
		setRefreshing(false);
	}, []);

	if (isLoading && !refreshing) {
		return (
			<SafeAreaView className="w-full h-full flex items-center justify-center">
				<Text className="text-base font-medium">
					Loading seeker dashboard...
				</Text>
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView className="w-full h-full flex items-center justify-center">
				<Text className="text-base font-medium text-red-500">
					{error}
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="w-full h-full">
			<View className="w-full pt-14 h-auto flex flex-col gap-3 bg-white p-5">
				<View className="w-full flex flex-row items-center justify-between">
					<View className="flex flex-row gap-2 items-center">
						<BadgeCheck size={24} color="#DDF3DF" fill="#8ED796" />
						<Text className="text-[#636363] text-base font-medium">
							Hello,{" "}
							{dashboardData.greeting_name || user?.full_name}!
						</Text>
					</View>
					<View>
						<Bell size={18} color="#797676" fill="#797676" />
					</View>
				</View>
			</View>
			<ScrollView
				className="p-5 pt-0 bg-white"
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={["#0D99C9"]}
					/>
				}
				contentContainerStyle={{
					flexGrow: 1,
				}}
				contentContainerClassName="gap-6"
			>
				<ImageBackground
					source={require("@/assets/images/wallet-history-banner-bg.png")}
					resizeMode="cover"
					className="w-full h-52 rounded-lg p-5"
				>
					<View className="w-full h-full rounded-lg flex flex-col gap-4 items-center">
						<View className="w-full flex flex-row gap-4 items-center">
							<View className="w-[48%] flex flex-col gap-2 flex-1">
								<Text className="text-xl font-medium text-[#0D99C9]">
									{dashboardData.new_care_provider_requests}
								</Text>
								<Text className="text-base text-wrap font-normal text-[#265977]">
									New Care Providers request
								</Text>
							</View>

							<View className="w-0.5 h-full bg-[#98C0D8]"></View>

							<View className="w-[48%] flex flex-col gap-2 pl-8">
								<Text className="text-xl font-medium text-[#0D99C9]">
									₦ {dashboardData.total_amount_spent}
								</Text>
								<Text className="text-base text-wrap font-normal text-[#265977]">
									Total Amount Spent
								</Text>
							</View>
						</View>

						<Button title="View Details" className="mt-4" />
					</View>
				</ImageBackground>

				<View className="w-full flex flex-row gap-3 items-center p-5 border border-[#F2F2F2] rounded-lg">
					<View className="w-[56%] flex flex-1 flex-row gap-3 items-center">
						<FolderOpen size={20} color="#0D99C9" />

						<View className="flex flex-col gap-1">
							<Text className="text-[#666666] text-lg font-medium">
								Verify Your Identity
							</Text>
							<Text className="text-[#999999] text-wrap text-sm font-normal">
								Upload a verifiable government ID
							</Text>
						</View>
					</View>

					<View className="flex items-end w-[40%]">
						<Button
							onPress={() =>
								router.push("/seeker/settings/verify-identity")
							}
							title="Verify ID"
							className="py-2 w-min px-4"
						/>
					</View>
				</View>

				<Text className="text-[#999999] text-base font-normal">
					What would you like to do today
				</Text>

				<View className="w-full flex flex-row gap-3">
					<Pressable
						onPress={() =>
							router.push("/seeker/(tabs)/home/care-providers")
						}
						className="w-[48%] bg-[#F3F9FC] border border-[#E6F2F9] rounded-lg flex flex-col gap-3 p-5"
					>
						<View className="bg-[#E6F2F9] border border-[#EAF4FA] rounded-full w-[50px] h-[50px] p-1">
							<Image
								source={require("@/assets/images/calendar.png")}
								className="w-full h-full"
							/>
						</View>

						<Text className="text-[#666666] text-xl font-medium">
							Book a Service
						</Text>

						<Text className="text-[#889FAD] text-base font-normal">
							Find Your Perfect Care Provider
						</Text>
					</Pressable>

					<View className="w-[48%] bg-[#F4FAF5] border border-[#EAF5EC] rounded-lg flex flex-col gap-3 p-5">
						<View className="bg-[#EAF6EB] border border-[#EAF5EC] rounded-full w-[50px] h-[50px] p-1">
							<Image
								source={require("@/assets/images/Mother walking with a baby stroller.png")}
								className="w-full h-full"
							/>
						</View>

						<Text className="text-[#666666] text-xl font-medium">
							Become a Care Provider
						</Text>

						<Text className="text-[#889FAD] text-base font-normal">
							Apply to Care for Families
						</Text>
					</View>
				</View>

				<View className="p-3 bg-[#FCFCFC] rounded-lg">
					<Text className="text-[#808080] text-base font-normal">
						Ongoing Activity
					</Text>

					<View className="w-full flex flex-row gap-4 items-center mt-5">
						<View className="flex flex-col gap-1 items-center">
							<Text className="text-[#B3B3B3] text-sm font-normal">
								Wed
							</Text>
							<Text className="text-[#666666] text-sm font-normal">
								12
							</Text>
						</View>
						<View className="border-l-4 border-[#0D99C9] rounded-lg p-4 bg-[#F5F5F5] flex flex-1 flex-row gap-4">
							<Image
								source={require("@/assets/images/avatar.jpg")}
								className="w-12 h-12 rounded-full"
							/>
							<View className="flex flex-col gap-0">
								<Text className="text-[#4D4D4D] text-base font-medium">
									Child care with Aleem Sarah
								</Text>
								<Text className="text-[#999999] text-sm font-normal">
									06:45 AM - 12.00 PM
								</Text>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>

			<SubscribeModal
				showModal={showModal}
				onClose={() => setShowModal(false)}
			/>
		</SafeAreaView>
	);
}
