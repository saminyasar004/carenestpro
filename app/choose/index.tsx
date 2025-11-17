import SafeView from "@/components/layout/safe-view";
import { Header } from "@/components/ui/header";
import { useRouter } from "expo-router";
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

	return (
		<SafeAreaView className="w-full h-full bg-white">
			<Header
				title="Welcome to CareNestPro"
				subtitle="Where Families find trusted Care and professionals build Careers"
				showBackButton={false}
			/>
			<ScrollView
				className="py-0 w-full bg-white"
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 60,
				}}
				contentContainerClassName="gap-6"
			>
				<SafeView className="w-full h-full p-6 gap-8">
					<View className="w-full h-auto flex flex-1 flex-col gap-8">
						<Pressable
							onPress={() => {
								router.push({
									pathname: "/(public)/splash",
									params: {
										choosedType: "seeker",
									},
								});
							}}
							className="w-full h-auto bg-white border border-[#C5C5C5] rounded-lg flex flex-row gap-2 items-center"
						>
							<View className="flex items-center">
								<Image
									source={require("@/assets/images/care-seeker-avatar.png")}
									className="w-[120px] h-[85px]"
									resizeMode="contain"
								/>
							</View>

							<Text className="text-[#C5C5C5] text-2xl font-medium">
								I am a Care Seeker
							</Text>
						</Pressable>

						<Pressable
							onPress={() => {
								router.push({
									pathname: "/(public)/splash",
									params: {
										choosedType: "provider",
									},
								});
							}}
							className="w-full h-auto bg-white border border-[#C5C5C5] rounded-lg flex flex-row gap-2 items-center"
						>
							<View className="flex items-center">
								<Image
									source={require("@/assets/images/care-provider-avatar.png")}
									className="w-[120px] h-[85px]"
									resizeMode="contain"
								/>
							</View>

							<Text className="text-[#C5C5C5] text-2xl font-medium">
								I am a Care Provider
							</Text>
						</Pressable>
					</View>
				</SafeView>
			</ScrollView>
		</SafeAreaView>
	);
}
