import { Button } from "@/components/ui/button";
import DateInput from "@/components/ui/date-input";
import MultiSelectComponent from "@/components/ui/dropdown";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import TimeInput from "@/components/ui/time-input";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib";
import { useCareSeekerStore } from "@/store/careSeekerStore";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useRouter } from "expo-router";
import { Info } from "lucide-react-native";
import { useState } from "react";
import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import { Portal } from "react-native-portalize";
import { twMerge } from "tailwind-merge";
import { Toast } from "toastify-react-native";

export default function Page() {
	const router = useRouter();

	const { careSeekerData, updateCareSeekerData, isLoading } =
		useCareSeekerStore();

	const [showModal, setShowModal] = useState<boolean>(false);

	const onSubmit = async () => {
		try {
			console.log("Submitting schedule details...");
			const schedule = careSeekerData.job_data.schedule;
			const budget = careSeekerData.job_data.budget;

			if (!schedule.job_type) {
				Toast.error("Please select a job type");
				return;
			}
			if (!schedule.start_date) {
				Toast.error("Please select a start date");
				return;
			}
			if (!schedule.start_time) {
				Toast.error("Please select a start time");
				return;
			}
			if (!schedule.end_time) {
				Toast.error("Please select an end time");
				return;
			}
			if (!budget.price_min || !budget.price_max) {
				Toast.error("Please set your minimum and maximum hourly rate");
				return;
			}

			if (schedule.job_type === "reoccuring") {
				if (!schedule.end_date) {
					Toast.error("Please select an end date");
					return;
				}
				if (!schedule.repeat_every.count) {
					Toast.error("Please specify how often to repeat");
					return;
				}
				if (!schedule.repeat_every.period) {
					Toast.error("Please select a repeat frequency");
					return;
				}
				if (!schedule.repeat_on || schedule.repeat_on.length === 0) {
					Toast.error("Please select at least one repeat day");
					return;
				}
			}

			console.log("Validation passed ✅", careSeekerData);
			setShowModal(false);
			router.push({
				pathname: "/signup",
				params: {
					role: "seeker",
				},
			});
		} catch (err: any) {
			console.log("Error on submit:", err.message);
			Toast.error("Something went wrong. Please try again.");
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header
				title="Elderly care details"
				subtitle="Kindly select options to help us understand your preferences"
			/>
			<ScrollView
				className="p-5 bg-white"
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 60,
				}}
			>
				<View className="w-full h-16 flex-row flex-wrap items-center justify-center gap-3 p-1.5 rounded-md border-[0.5px] border-[#CCCCCC]">
					<Pressable
						style={({ pressed }) => ({
							opacity: pressed ? 0.7 : 1,
							transform: [{ scale: pressed ? 0.98 : 1 }],
						})}
						onPress={() =>
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										job_type: "reoccuring",
									},
								},
							})
						}
						className={twMerge(
							"h-full w-[48%] flex items-center justify-center p-3 rounded-md",
							careSeekerData.job_data.schedule.job_type ===
								"reoccuring"
								? "bg-primary"
								: "bg-transparent"
						)}
					>
						<View>
							<Text
								className={twMerge(
									"text-foreground font-normal text-lg",
									careSeekerData.job_data.schedule
										.job_type === "reoccuring"
										? "text-white"
										: ""
								)}
							>
								Reoccuring
							</Text>
						</View>
					</Pressable>

					<Pressable
						style={({ pressed }) => ({
							opacity: pressed ? 0.7 : 1,
							transform: [{ scale: pressed ? 0.98 : 1 }],
						})}
						onPress={() =>
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										job_type: "one-off",
									},
								},
							})
						}
						className={twMerge(
							"h-full w-[48%] flex items-center justify-center p-3 rounded-md",
							careSeekerData.job_data.schedule.job_type ===
								"one-off"
								? "bg-primary"
								: "bg-transparent"
						)}
					>
						<View>
							<Text
								className={twMerge(
									"text-foreground font-normal text-lg",
									careSeekerData.job_data.schedule
										.job_type === "one-off"
										? "text-white"
										: ""
								)}
							>
								One - Off
							</Text>
						</View>
					</Pressable>
				</View>

				{careSeekerData.job_data.schedule.job_type === "reoccuring" ? (
					<Reoccuring />
				) : (
					<OneOff />
				)}

				<Pressable
					style={({ pressed }) => ({
						opacity: pressed ? 0.7 : 1,
						transform: [{ scale: pressed ? 0.98 : 1 }],
					})}
					onPress={() => setShowModal(true)}
					className="bg-primary items-center py-3 rounded-lg w-full mt-6"
				>
					<Typography
						variant="subtitle"
						className="text-center text-lg text-white font-semibold"
					>
						Next
					</Typography>
				</Pressable>
			</ScrollView>
			<SignupModal
				showModal={showModal}
				onClose={() => {
					setShowModal(false);
					onSubmit();
				}}
			/>
		</SafeAreaView>
	);
}

const Reoccuring = () => {
	const { careSeekerData, updateCareSeekerData } = useCareSeekerStore();

	const [selectedRepeat, setSelectedRepeat] = useState<string[]>(
		careSeekerData.job_data.schedule.repeat_on || []
	);

	const days = [
		{ short: "S", name: "Sunday" },
		{ short: "M", name: "Monday" },
		{ short: "T", name: "Tuesday" },
		{ short: "W", name: "Wednesday" },
		{ short: "T", name: "Thursday" },
		{ short: "F", name: "Friday" },
		{ short: "S", name: "Saturday" },
	];

	const handleDayToggle = (day: string) => {
		let updatedDays: string[];

		if (selectedRepeat.includes(day)) {
			updatedDays = selectedRepeat.filter((d) => d !== day);
		} else {
			updatedDays = [...selectedRepeat, day];
		}

		setSelectedRepeat(updatedDays);

		updateCareSeekerData({
			job_data: {
				...careSeekerData.job_data,
				schedule: {
					...careSeekerData.job_data.schedule,
					repeat_on: updatedDays,
				},
			},
		});
	};

	return (
		<View className="w-full flex flex-col gap-3 py-5">
			<DateInput
				label="Start Date"
				placeholder="Select date"
				value={careSeekerData.job_data.schedule.start_date as any}
				onChange={(value: any) => {
					updateCareSeekerData({
						job_data: {
							...careSeekerData.job_data,
							schedule: {
								...careSeekerData.job_data.schedule,
								start_date: value,
							},
						},
					});
				}}
			/>

			<DateInput
				label="End Date"
				placeholder="Select date"
				value={careSeekerData.job_data.schedule.end_date as any}
				onChange={(value: any) => {
					updateCareSeekerData({
						job_data: {
							...careSeekerData.job_data,
							schedule: {
								...careSeekerData.job_data.schedule,
								end_date: value,
							},
						},
					});
				}}
			/>

			<View className="w-full flex flex-row gap-3 items-center">
				<View className="w-[48%] flex-1 flex items-center">
					<Input
						label="Repeat every"
						labelStyle="font-medium text-base"
						placeholder="Specify No of times"
						inputStyle="h-14"
						value={
							careSeekerData.job_data.schedule.repeat_every
								.count as any
						}
						onChangeText={(value: any) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										repeat_every: {
											...careSeekerData.job_data.schedule
												.repeat_every,
											count: value,
										},
									},
								},
							});
						}}
					/>
				</View>

				<View className="w-[48%] flex-1 flex items-center">
					<MultiSelectComponent
						list={[
							"Weekly",
							"Monthly",
							"Quarterly",
							"Yearly",
							"Custom",
						]}
						placeholder="Weekly"
						value={
							careSeekerData.job_data.schedule.repeat_every.period
						}
						onChange={(value: any) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										repeat_every: {
											...careSeekerData.job_data.schedule
												.repeat_every,
											period: value,
										},
									},
								},
							});
						}}
					/>
				</View>
			</View>

			<View className="w-full flex flex-col gap-3 py-3">
				<Text className="text-[#4D4D4D] font-medium text-base">
					Repeat
				</Text>

				<View className="w-full flex flex-row gap-2 items-center justify-around flex-wrap">
					{days.map((day, index) => (
						<Pressable
							key={index}
							onPress={() => handleDayToggle(day.name)}
							style={({ pressed }) => ({
								opacity: pressed ? 0.7 : 1,
								transform: [{ scale: pressed ? 0.98 : 1 }],
							})}
						>
							<View
								className={cn(
									"w-8 h-8 rounded-full flex items-center justify-center border border-[#E6E6E6]",
									selectedRepeat.includes(day.name)
										? "border-primary bg-primary/10"
										: ""
								)}
							>
								<Text
									className={cn(
										"text-sm font-medium",
										selectedRepeat.includes(day.name)
											? "text-primary"
											: "text-foreground"
									)}
								>
									{day.short}
								</Text>
							</View>
						</Pressable>
					))}
				</View>
			</View>

			<View className="w-full flex flex-row gap-3 items-center">
				<View className="w-[48%] flex-1 flex items-center">
					<TimeInput
						label="Start Time"
						placeholder="Select Time"
						value={
							careSeekerData.job_data.schedule.start_time as any
						}
						onChange={(value: any) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										start_time: value,
									},
								},
							});
						}}
					/>
				</View>

				<View className="w-[48%] flex-1 flex items-center">
					<TimeInput
						label="End Time"
						placeholder="Select Time"
						value={careSeekerData.job_data.schedule.end_time as any}
						onChange={(value: any) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										end_time: value,
									},
								},
							});
						}}
					/>
				</View>
			</View>

			<Text className="font-normal text-[#4D4D4D] text-base">
				How much would you be offering
				<Text className="text-[#808080]"> (per hour)</Text>
			</Text>

			<View className="p-3 rounded-lg border border-[#F2F2F2] flex flex-col gap-3">
				<View className="bg-green-500/10 w-min flex-row flex items-center p-2 gap-1 rounded-md">
					<Info size={16} color="#70CC7A" />

					<Text className="text-[#70CC7A] font-normal text-sm">
						average range in your area is ₦32 - ₦55
					</Text>
				</View>

				<View className="relative flex flex-1 items-center justify-center pr-9">
					<MultiSlider
						isMarkersSeparated={true}
						customMarkerLeft={(e) => (
							<CustomSliderMarkerLeft
								currentValue={e.currentValue}
							/>
						)}
						customMarkerRight={(e) => (
							<CustomSliderMarkerRight
								currentValue={e.currentValue}
							/>
						)}
						enabledOne={true}
						enabledTwo={true}
						min={10}
						max={3000}
						step={10}
						values={[
							Number(careSeekerData.job_data.budget.price_min) ||
								10,
							Number(careSeekerData.job_data.budget.price_max) ||
								3000,
						]}
						sliderLength={320}
						onValuesChange={(values) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									budget: {
										...careSeekerData.job_data.budget,
										price_min: values[0].toString(),
										price_max: values[1].toString(),
									},
								},
							});
						}}
					/>

					<View className="w-full flex flex-row items-center justify-between bg-red-500">
						<Text className="text-[#808080] text-sm absolute -top-3 left-0">
							₦10
						</Text>
						<Text className="text-[#808080] text-sm absolute -top-3 -right-5">
							₦3000
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const CustomSliderMarkerLeft = ({ currentValue }: any) => {
	return (
		<View className="relative">
			<View className="absolute -top-8 -left-1">
				<Text className="text-black text-base">${currentValue}</Text>
			</View>

			<View
				style={{
					width: 18,
					height: 18,
					borderWidth: 1,
					borderRadius: 10,
					borderColor: "#0D99C9",
					backgroundColor: "#FFFFFF",
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					top: -8,
					left: 0,
					zIndex: 10,
				}}
			></View>
		</View>
	);
};

const CustomSliderMarkerRight = ({ currentValue }: any) => {
	return (
		<View className="relative">
			<View className="absolute -top-8 -left-1">
				<Text className="text-black text-base">${currentValue}</Text>
			</View>

			<View
				style={{
					width: 18,
					height: 18,
					borderWidth: 1,
					borderRadius: 10,
					borderColor: "#0D99C9",
					backgroundColor: "#FFFFFF",
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					top: -8,
					left: 0,
					zIndex: 10,
				}}
			></View>
		</View>
	);
};

const OneOff = () => {
	const { careSeekerData, updateCareSeekerData } = useCareSeekerStore();

	return (
		<View className="w-full flex flex-col gap-3 py-5">
			<DateInput
				label="Date"
				placeholder="Select date"
				value={careSeekerData.job_data.schedule.start_date as any}
				onChange={(value: any) => {
					updateCareSeekerData({
						job_data: {
							...careSeekerData.job_data,
							schedule: {
								...careSeekerData.job_data.schedule,
								start_date: value,
							},
						},
					});
				}}
			/>

			<View className="w-full flex flex-row gap-3 items-center">
				<View className="w-[48%] flex-1 flex items-center">
					<TimeInput
						label="Start Time"
						placeholder="Select Time"
						value={
							careSeekerData.job_data.schedule.start_time as any
						}
						onChange={(value: any) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										start_time: value,
									},
								},
							});
						}}
					/>
				</View>

				<View className="w-[48%] flex-1 flex items-center">
					<TimeInput
						label="End Time"
						placeholder="Select Time"
						value={careSeekerData.job_data.schedule.end_time as any}
						onChange={(value: any) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									schedule: {
										...careSeekerData.job_data.schedule,
										end_time: value,
									},
								},
							});
						}}
					/>
				</View>
			</View>

			<Text className="font-normal text-[#4D4D4D] text-base">
				How much would you be offering
				<Text className="text-[#808080]"> (per hour)</Text>
			</Text>

			<View className="p-3 rounded-lg border border-[#F2F2F2] flex flex-col gap-3">
				<View className="bg-green-500/10 w-min flex-row flex items-center p-2 gap-1 rounded-md">
					<Info size={16} color="#70CC7A" />

					<Text className="text-[#70CC7A] font-normal text-sm">
						average range in your area is ₦32 - ₦55
					</Text>
				</View>

				<View className="relative flex flex-1 items-center justify-center pr-9">
					<MultiSlider
						isMarkersSeparated={true}
						customMarkerLeft={(e) => (
							<CustomSliderMarkerLeft
								currentValue={e.currentValue}
							/>
						)}
						customMarkerRight={(e) => (
							<CustomSliderMarkerRight
								currentValue={e.currentValue}
							/>
						)}
						enabledOne={true}
						enabledTwo={true}
						min={10}
						max={3000}
						step={10}
						values={[
							Number(careSeekerData.job_data.budget.price_min) ||
								10,
							Number(careSeekerData.job_data.budget.price_max) ||
								3000,
						]}
						sliderLength={320}
						onValuesChange={(values) => {
							updateCareSeekerData({
								job_data: {
									...careSeekerData.job_data,
									budget: {
										...careSeekerData.job_data.budget,
										price_min: values[0].toString(),
										price_max: values[1].toString(),
									},
								},
							});
						}}
					/>

					<View className="w-full flex flex-row items-center justify-between bg-red-500">
						<Text className="text-[#808080] text-sm absolute -top-3 left-0">
							₦10
						</Text>
						<Text className="text-[#808080] text-sm absolute -top-3 -right-5">
							₦3000
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export function SignupModal({
	showModal,
	onClose,
}: {
	showModal: boolean;
	onClose: () => void;
}) {
	const { height } = useWindowDimensions();
	const { careSeekerData, updateCareSeekerData } = useCareSeekerStore();
	return (
		<Portal>
			{showModal && (
				<Pressable
					className="flex-1 bg-black/50 px-4 items-center justify-center"
					onPress={onClose}
				>
					<Pressable className="w-full bg-white gap-2 px-2 py-6">
						<Image
							source={require("@/assets/images/signup-modal-icon.png")}
							resizeMode="cover"
							className="mx-auto"
						/>

						<View className="px-4 items-center gap-3 py-5">
							<Typography
								variant="sm-title"
								className="text-2xl text-center text-[#515151] font-medium leading-7"
							>
								Sign Up to View Care Providers near you
							</Typography>
							<Typography
								className="text-center"
								variant="sm-subtitle"
							>
								Kindly enter your email address below to view
								care providers near you.
							</Typography>
							<Input
								label="Email address"
								placeholder="Input email address"
								value={careSeekerData.user_data.email}
								onChangeText={(value: any) => {
									updateCareSeekerData({
										user_data: {
											...careSeekerData.user_data,
											email: value,
										},
									});
								}}
							/>
							<Button
								title="Sign Up"
								textClassName="text-lg"
								onPress={() => {
									if (!careSeekerData.user_data.email) {
										Toast.error(
											"Please enter your email address"
										);
										return;
									}

									onClose();
								}}
								className="mt-12"
							/>
						</View>
					</Pressable>
				</Pressable>
			)}
		</Portal>
	);
}
