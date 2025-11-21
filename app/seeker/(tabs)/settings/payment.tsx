import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Payment() {
	const router = useRouter();
	const [isMakingPayment, setIsMakingPayment] = useState(false);

	const onSubmit = () => {
		const timer = setTimeout(() => {
			setIsMakingPayment(false);
		}, 8000);

		return () => {
			clearTimeout(timer);
		};
	};

	return (
		<SafeAreaView className="w-full h-full bg-white">
			<View className="w-full h-32 pt-14 flex flex-col gap-3 px-5 items-start">
				<View className="w-full flex flex-row items-center gap-3">
					<Pressable onPress={() => router.back()}>
						<ArrowLeft size={20} color="#636363" />
					</Pressable>
					<Text className="text-[#515151] text-2xl font-medium">
						Payment
					</Text>
				</View>
				<Text className="text-[#9B9B9B] text-sm font-normal">
					Kindly select preferred payment option
				</Text>
			</View>
			<ScrollView
				className="p-5 bg-white"
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 60,
				}}
				contentContainerClassName="gap-6"
			>
				<View className="bg-[#0D99C9] border border-[#2B91CF] rounded-lg p-4 flex flex-col gap-2">
					<Text className="text-white text-base font-medium">
						Full Payment
					</Text>
					<Text className="text-sm text-white font-normal">
						one-time charge payment gateway channel
					</Text>

					<Text className="text-white font-medium text-lg mt-6">
						₦1,500.00
					</Text>
					<Text className="text-xs font-normal text-[#D2F0FA]">
						₦12/mo
					</Text>

					<Button
						title={
							isMakingPayment
								? "Making Payment..."
								: "Make Payment"
						}
						onPress={onSubmit}
						className="bg-[#DAECF7] border border-[#CDE5F4] mt-6"
						textClassName="text-[#6CB3DD] font-normal text-base"
					/>
				</View>

				<View className="bg-[#F7FBFD] border border-[#C9E3F3] rounded-lg p-4 flex flex-col gap-2">
					<Text className="text-[#666666] text-base font-medium">
						Installment Deduction
					</Text>
					<Text className="text-sm text-[#999999] font-normal">
						Deducted from two (2) care service payout
					</Text>

					<Text className="text-[#4D4D4D] font-medium text-lg mt-6">
						₦1,500.00
					</Text>
					<Text className="text-xs font-normal text-[#808080]">
						₦12/mo
					</Text>

					<Button
						title={
							isMakingPayment
								? "Making Payment..."
								: "Make Payment"
						}
						onPress={onSubmit}
						className="bg-[#DAECF7] border border-[#CDE5F4] mt-6"
						textClassName="text-[#6CB3DD] font-normal text-base"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
