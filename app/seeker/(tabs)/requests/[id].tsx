import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
import {
	FlatList,
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function ActivityDetails() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	// const [details, setDetails] = useState<any>(null);
	// const [loading, setLoading] = useState(true);

	const testimonials = [
		{
			id: "1",
			text: `"Sarah was an absolute blessing for our family during a challenging time. She cared for our 6 and 9 year old while I recovered from surgery, and I couldn't have asked for better care."`,
			author: "Nora Wilson",
		},
		{
			id: "2",
			text: `"Gabriel was wonderful with our toddler — patient, structured, and fun! Highly recommend him for any family."`,
			author: "Gabriel's Client",
		},
		{
			id: "3",
			text: `"Maya helped our kids learn and grow with her creative educational games. She became part of the family."`,
			author: "Maya's Client",
		},
	];

	// const onSubmit = async () => {
	// 	try {
	// 		if (!rating) {
	// 			Toast.error("Please select a rating");
	// 			return;
	// 		}
	// 		if (!reviewCareSeeker) {
	// 			Toast.error("Please write a review");
	// 			return;
	// 		}

	// 		const response = await submitClosedActivityDetails({
	// 			booking_id: Number(id),
	// 			rating: Number(rating),
	// 			comment: reviewCareSeeker,
	// 		});

	// 		if (response && response.status === 200) {
	// 			Toast.success("Review submitted successfully");
	// 			router.back();
	// 		}
	// 	} catch (err: any) {
	// 		console.log("Error occured submitting review: ", err.message);
	// 		Toast.error(
	// 			err?.response?.data?.detail ||
	// 				"Failed to submit review. Please try again later."
	// 		);
	// 	}
	// };

	// useEffect(() => {
	// 	if (error) {
	// 		Toast.error(error);
	// 		setError(null);
	// 	}
	// }, [error]);

	// useEffect(() => {
	// 	const fetchDetails = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const res = await getClosedActivityDetails(Number(id));
	// 			setDetails(res);
	// 		} catch (err: any) {
	// 			setCurrentPageError("Failed to load activity details");
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	fetchDetails();
	// }, [id]);

	// if (loading) {
	// 	return (
	// 		<View className="flex-1 items-center justify-center bg-white">
	// 			<ActivityIndicator size="large" color="#0D99C9" />
	// 			<Text className="mt-3 text-[#666] text-base">
	// 				Loading details...
	// 			</Text>
	// 		</View>
	// 	);
	// }

	// if (currentPageError || !details) {
	// 	return (
	// 		<View className="flex-1 items-center justify-center bg-white px-6">
	// 			<Text className="text-red-500 text-lg mb-2">
	// 				{currentPageError || "No details found"}
	// 			</Text>
	// 			<Pressable
	// 				onPress={() => router.back()}
	// 				className="bg-[#0D99C9] px-4 py-2 rounded-md mt-2"
	// 			>
	// 				<Text className="text-white font-medium">Go Back</Text>
	// 			</Pressable>
	// 		</View>
	// 	);
	// }

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="w-full h-30 pt-14 flex flex-row gap-3 bg-white p-5 items-center">
				<Pressable onPress={() => router.back()}>
					<ArrowLeft size={20} color="#636363" />
				</Pressable>
				<Text className="text-[#515151] text-2xl font-medium">
					Details
				</Text>
			</View>

			{/* Content */}
			<ScrollView
				className="px-5 bg-white"
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
				contentContainerClassName="gap-6"
			>
				<View className="w-full flex flex-1 flex-col gap-3">
					{/* Seeker Info */}
					<View className="w-full flex flex-row items-center gap-6 py-3">
						<View className="w-16 h-16 flex items-center justify-center">
							<Image
								source={require("@/assets/images/avatar.jpg")}
								className="w-full h-full rounded-full"
							/>
						</View>
						<View className="flex flex-1 flex-col gap-0">
							<View className="flex flex-row gap-1">
								<Text className="text-[#4D4D4D] font-medium text-lg">
									Aleem Sarah
								</Text>
							</View>
							<Text className="text-[#808080] font-medium text-base">
								Old Dallas, Salford, UK
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

					{/* Summary Info */}
					<View className="w-full flex flex-row items-center gap-1">
						<InfoBox
							title="Experience"
							value={"8 years"}
							className="flex-1"
						/>
						<InfoBox
							title="Rate"
							value={`$34/hr`}
							className="w-[100px]"
						/>
						<RatingBox rating={5} className="w-[20px]" />
					</View>

					<View className="w-full flex flex-col gap-2">
						<View className="bg-[#F3F9FC] p-3 rounded-lg flex flex-col gap-3">
							<Text className="text-lg text-[#4F6774] font-medium">
								About
							</Text>
							<Text className="text-[#738894] text-base font-normal">
								Dedicated childcare provider with extensive ways
								of managing daily routines for multiple
								children. Skilled in age-appropriate activities,
								behavioural guidance, and emergency response.
								Strong communication with parents, maintains
								detailed care logs, and priorities safety above
								all. Trustworthy, energetic, and passionate
								about supporting children's emotional and
								physical development.
							</Text>
						</View>
					</View>

					<View className="w-full mt-3">
						<Text className="text-base font-medium text-[#808080] mb-2">
							Testimonials
						</Text>
						<FlatList
							data={testimonials}
							keyExtractor={(item) => item.id}
							horizontal
							showsHorizontalScrollIndicator={false}
							ItemSeparatorComponent={() => (
								<View style={{ width: 12 }} />
							)}
							renderItem={({ item }) => (
								<View className="w-72 rounded-lg border border-[#E6E6E6] bg-white p-4 shadow-sm">
									<Text
										numberOfLines={4}
										ellipsizeMode="tail"
										className="text-gray-500 text-base"
									>
										{item.text}
									</Text>
									<View className="w-full flex flex-row items-center justify-between gap-3 py-3">
										<Text className="font-semibold text-[#666666]">
											{item.author}
										</Text>
										<Pressable>
											<Text className="text-primary font-medium">
												Read more
											</Text>
										</Pressable>
									</View>
								</View>
							)}
						/>
					</View>

					<Button
						// onPress={onSubmit}
						title="Message"
						className="mt-8"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

interface StarRatingProps {
	rating: number;
	onChange: (value: number) => void;
	className?: string;
}

const StarRating = ({ rating, onChange, className }: StarRatingProps) => {
	return (
		<View className={cn("flex flex-row gap-2 mt-3", className)}>
			{[1, 2, 3, 4, 5].map((index) => (
				<TouchableOpacity key={index} onPress={() => onChange(index)}>
					<Star
						size={16}
						strokeWidth={1.5}
						color={index <= rating ? "#CB9E49" : "#CFCFCF"}
						fill={index <= rating ? "#CB9E49" : "transparent"}
					/>
				</TouchableOpacity>
			))}
		</View>
	);
};

function InfoBox({
	title,
	value,
	className,
}: {
	title: string;
	value: string;
	className?: string;
}) {
	return (
		<View
			className={cn(
				"border border-[#F5F5F5] rounded-lg bg-white p-3 flex flex-col gap-2",
				className
			)}
		>
			<Text className="text-[#999999] font-medium text-sm">{title}</Text>
			<Text className="text-[#808080] text-base font-medium">
				{value}
			</Text>
		</View>
	);
}

function RatingBox({
	rating,
	className,
}: {
	rating: number;
	className?: string;
}) {
	return (
		<View
			className={cn(
				"flex-1 border border-[#F5F5F5] rounded-lg bg-white p-3 flex flex-col gap-2",
				className
			)}
		>
			<Text className="text-[#999999] font-medium text-sm">Rating</Text>
			<View className="flex flex-row items-center gap-1">
				<Text className="text-[#808080] text-sm font-medium">
					{rating}
				</Text>
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						size={10}
						fill={i < Math.round(rating) ? "#CB9E49" : "#E6E6E6"}
						color={i < Math.round(rating) ? "#CB9E49" : "#E6E6E6"}
					/>
				))}
			</View>
		</View>
	);
}
