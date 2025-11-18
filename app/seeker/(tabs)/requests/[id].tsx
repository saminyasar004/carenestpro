import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { baseURL } from "@/config";
import { cn } from "@/lib";
import { useActivitiesStore } from "@/store/activitiesStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Toast } from "toastify-react-native";

export default function RequestsDetails() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const {
		getClosedActivityDetails,
		submitClosedActivityDetails,
		isLoading,
		error,
		setError,
	} = useActivitiesStore();

	const [details, setDetails] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [currentPageError, setCurrentPageError] = useState<string | null>(
		null
	);

	const [rating, setRating] = useState(0);
	const [reviewCareSeeker, setReviewCareSeeker] = useState("");

	const onSubmit = async () => {
		try {
			if (!rating) {
				Toast.error("Please select a rating");
				return;
			}
			if (!reviewCareSeeker) {
				Toast.error("Please write a review");
				return;
			}

			const response = await submitClosedActivityDetails({
				booking_id: Number(id),
				rating: Number(rating),
				comment: reviewCareSeeker,
			});

			if (response && response.status === 200) {
				Toast.success("Review submitted successfully");
				router.back();
			}
		} catch (err: any) {
			console.log("Error occured submitting review: ", err.message);
			Toast.error(
				err?.response?.data?.detail ||
					"Failed to submit review. Please try again later."
			);
		}
	};

	useEffect(() => {
		if (error) {
			Toast.error(error);
			setError(null);
		}
	}, [error]);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				setLoading(true);
				const res = await getClosedActivityDetails(Number(id));
				setDetails(res);
			} catch (err: any) {
				setCurrentPageError("Failed to load activity details");
			} finally {
				setLoading(false);
			}
		};
		fetchDetails();
	}, [id]);

	if (loading) {
		return (
			<View className="flex-1 items-center justify-center bg-white">
				<ActivityIndicator size="large" color="#0D99C9" />
				<Text className="mt-3 text-[#666] text-base">
					Loading details...
				</Text>
			</View>
		);
	}

	if (currentPageError || !details) {
		return (
			<View className="flex-1 items-center justify-center bg-white px-6">
				<Text className="text-red-500 text-lg mb-2">
					{currentPageError || "No details found"}
				</Text>
				<Pressable
					onPress={() => router.back()}
					className="bg-[#0D99C9] px-4 py-2 rounded-md mt-2"
				>
					<Text className="text-white font-medium">Go Back</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="w-full h-30 pt-14 flex flex-row gap-3 bg-[#F3FAFC] p-5 items-center">
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
					<Text className="text-lg font-medium text-[#4D4D4D]">
						{details.job_details}
					</Text>

					{/* Seeker Info */}
					<View className="w-full flex flex-row items-center gap-6 py-3">
						<View className="w-16 h-16 flex items-center justify-center">
							<Image
								source={
									details.seeker.profile_image_url
										? {
												uri: `${baseURL}${
													details.seeker
														.profile_image_url
												}`,
											}
										: require("@/assets/images/avatar.jpg")
								}
								className="w-full h-full rounded-full"
							/>
						</View>
						<View className="flex flex-1 flex-col gap-0">
							<View className="flex flex-row gap-1">
								<Text className="text-[#2CCA3B] text-lg font-medium">
									Care seeker -
								</Text>
								<Text className="text-[#4D4D4D] font-medium text-lg">
									{details.seeker.full_name}
								</Text>
							</View>
							<Text className="text-[#808080] font-medium text-base">
								{details.seeker_location}
							</Text>
							<Text className="text-[#808080] font-normal text-sm">
								Joined {details.seeker_join_date}
							</Text>
						</View>
					</View>

					{/* Summary Info */}
					<View className="w-full flex flex-row items-center gap-1">
						<InfoBox
							title="Date range for task"
							value={details.date_range_for_task}
							className="flex-1"
						/>
						<InfoBox
							title="Rate"
							value={`$${details.rate_per_hour}/hr`}
							className="w-[100px]"
						/>
						<RatingBox
							rating={details.seeker_average_rating}
							className="w-[20px]"
						/>
					</View>

					<View className="w-full flex flex-col gap-2 relative">
						<Textarea
							label="Review the care seeker"
							placeholder="Input feedback of your time with caregiver"
							value={reviewCareSeeker}
							onChange={(text: any) => setReviewCareSeeker(text)}
							inputStyle="min-h-[150px] pb-10"
						/>

						{/* Stars */}
						<StarRating
							rating={rating}
							onChange={setRating}
							className="absolute bottom-4 left-4"
						/>
					</View>

					{details.review_from_seeker && (
						<>
							<Text className="text-[#666666] font-normal text-base">
								Testimonials
							</Text>

							<View className="w-full flex items-center border border-border rounded-md">
								<Text>{details.review_from_seeker}</Text>
							</View>
						</>
					)}
					<Button
						onPress={onSubmit}
						title={isLoading ? "Submitting..." : "Submit"}
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
