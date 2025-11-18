import { Tab, Tabs } from "@/components/ui/tabs";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function Requests() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="w-full h-24 pt-14 flex flex-col gap-3 bg-white px-5 items-center">
				<View className="w-full flex flex-row items-center gap-3">
					<Pressable onPress={() => router.back()}>
						<ArrowLeft size={20} color="#636363" />
					</Pressable>
					<Text className="text-[#515151] text-2xl font-medium">
						Requests
					</Text>
				</View>
			</View>

			{/* Loading Spinner */}
			{/* {isLoading ? (
				<View className="flex-1 items-center justify-center bg-white">
					<ActivityIndicator size="large" color="#0D99C9" />
					<Text className="mt-3 text-[#666] text-base">
						Loading...
					</Text>
				</View>
			) : error ? (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-red-500 text-lg font-medium mb-2">
						{error}
					</Text>
					<Pressable
						onPress={() => {
							getActiveActivities();
							getClosedActivities();
							getPendingActivities();
						}}
						className="bg-[#0D99C9] px-4 py-2 rounded-md mt-2"
					>
						<Text className="text-white font-medium">Retry</Text>
					</Pressable>
				</View>
			) : ( */}
			<ScrollView
				className="p-5 bg-white"
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
				contentContainerClassName="gap-6"
			>
				<Tabs>
					{/* Active Tab */}
					<Tab title={`Active (2)`}>
						<View className="w-full flex py-5 flex-col gap-3">
							{/* {activeActivities.length > 0 ? (
								activeActivities.map((item) => (
									<ActiveTabItemCard
										key={item.id}
										item={item}
									/>
								))
							) : (
								<Text className="text-center text-[#999]">
									No active activities
								</Text>
							)} */}
							<ActiveTabItemCard />
						</View>
					</Tab>

					{/* Closed Tab */}
					<Tab title={`Closed (3)`}>
						<View className="w-full flex py-5 flex-col gap-3">
							{/* {closedActivities.length > 0 ? (
								closedActivities.map((item) => (
									<ClosedTabItemCard
										key={item.id}
										item={item}
									/>
								))
							) : (
								<Text className="text-center text-[#999]">
									No closed activities
								</Text>
							)} */}
							<ClosedTabItemCard />
						</View>
					</Tab>

					{/* Pending Tab */}
					<Tab title={`Pending (4)`}>
						<View className="w-full flex py-5 flex-col gap-3">
							{/* {pendingActivities.length > 0 ? (
								pendingActivities.map((item) => (
									<PendingTabItemCard
										key={item.id}
										item={item}
									/>
								))
							) : (
								<Text className="text-center text-[#999]">
									No pending activities
								</Text>
							)} */}
							<PendingTabItemCard />
						</View>
					</Tab>
				</Tabs>
			</ScrollView>
			{/* )} */}
		</SafeAreaView>
	);
}

function ActiveTabItemCard() {
	// const startTime = item.start_time
	// 	? format(parse(item.start_time, "HH:mm:ss", new Date()), "h:mm a")
	// 	: "";
	// const endTime = item.end_time
	// 	? format(parse(item.end_time, "HH:mm:ss", new Date()), "h:mm a")
	// 	: "";

	return (
		<View className="w-full flex flex-row gap-4 items-center">
			<View className="flex flex-col gap-1 items-center">
				<Text className="text-[#B3B3B3] text-sm font-normal">
					Wed
					{/* {new Date(item.date).toLocaleDateString("en-US", {
						weekday: "short",
					})} */}
				</Text>
				<Text className="text-[#666666] text-sm font-normal">
					12
					{/* {new Date(item.date).getDate()} */}
				</Text>
			</View>
			<View className="border-l-4 border-[#0D99C9] rounded-lg p-4 bg-[#F5F5F5] flex flex-1 flex-row gap-4">
				<Image
					source={
						// item.seeker.profile_image_url
						// 	? {
						// 			uri: `${baseURL}${item.seeker.profile_image_url}`,
						// 		}
						// 	:
						require("@/assets/images/avatar.jpg")
					}
					className="w-12 h-12 rounded-full"
				/>
				<View className="flex flex-col gap-0">
					<Text className="text-[#4D4D4D] text-base font-medium">
						Child care with Aleemd Sarah
						{/* {item.title} */}
					</Text>
					<Text className="text-[#999999] text-sm font-normal">
						06:45 AM - 12.00 PM
						{/* {startTime} - {endTime} */}
					</Text>
				</View>
			</View>
		</View>
	);
}

function ClosedTabItemCard() {
	const router = useRouter();

	return (
		<Pressable onPress={() => router.push(`/seeker/requests/1`)}>
			<View className="w-full flex flex-col gap-3 border border-[#E6E6E6] bg-white rounded-lg p-4">
				<Text className="text-[#4D4D4D] text-base font-medium">
					Lorem ipsum dolor sit amet.
					{/* {item.job_details.title} */}
				</Text>
				<Text className="text-[#999999] text-sm font-normal">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Doloribus voluptatum distinctio magnam hic deserunt
					accusantium quos quod. Doloribus sunt, at libero, cupiditate
					repudiandae, eos esse accusamus nisi modi consequuntur
					aliquam!
					{/* {item.job_details.summary} */}
				</Text>
			</View>
		</Pressable>
	);
}

function PendingTabItemCard() {
	return (
		<Pressable className="w-full bg-white border border-[#E6E6E6] p-3 rounded-lg flex flex-col gap-2">
			<Text className="text-[#808080] text-sm font-medium">
				Posted 3 min ago
				{/* Posted {item.job_details.posted_ago} */}
			</Text>
			<Text className="text-[#4D4D4D] text-base font-medium">
				{/* {item.job_details.title} */}
				Lorem ipsum dolor sit amet.
			</Text>
			<Text className="text-[#999999] text-base font-medium">
				{/* {item.job_details.summary} */}
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
				reprehenderit, incidunt alias adipisci repudiandae eos est illum
				harum nesciunt amet necessitatibus rerum voluptatem voluptatibus
				ducimus dolores eaque, iure dignissimos modi.
			</Text>
		</Pressable>
	);
}
