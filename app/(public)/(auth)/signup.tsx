import SafeView from "@/components/layout/safe-view";
import { Input, InputPassword } from "@/components/ui/input";
import { useCareProviderStore } from "@/store/careProviderStore";
import { useCareSeekerStore } from "@/store/careSeekerStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Toast } from "toastify-react-native";

export default function Page() {
	const router = useRouter();
	const [confirmPassword, setConfirmPassword] = useState("");
	const { register, updateCareProviderData, careProviderData } =
		useCareProviderStore();
	const {
		generatePreview,
		careSeekerData,
		updateCareSeekerData,
		error,
		isLoading,
	} = useCareSeekerStore();
	const { role } = useLocalSearchParams<{ role?: string }>();

	console.log("Role: ", role);

	const seekerSignupHandler = async () => {
		try {
			if (careSeekerData.user_data.password === "") {
				Toast.error("Please enter your password.");
				return;
			}
			if (careSeekerData.user_data.password !== confirmPassword) {
				Toast.error("Passwords do not match");
				return;
			}

			const response = await generatePreview(careSeekerData.job_data);

			console.log(response);
			console.log(error);
			if (!response) {
				Toast.error("Something went wrong. Please try again.");
				return;
			}

			if (response?.status === 200) {
				Toast.success(
					response?.data?.message || "Preview generated successfully"
				);
				router.push("/seeker/near-care-providers");
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const providerSignupHandler = async () => {
		try {
			if (careProviderData.user_data.email === "") {
				Toast.error("Please enter your email.");
				return;
			}
			if (careProviderData.user_data.password === "") {
				Toast.error("Please enter your password.");
				return;
			}
			if (careProviderData.user_data.password !== confirmPassword) {
				Toast.error("Passwords do not match");
				return;
			}

			console.log("Signup handler");

			console.log("data ", careProviderData);

			const response = await register(careProviderData);

			console.log(response);

			if (response?.status === 201) {
				Toast.success(response?.data?.message || "Signup successful.");
				router.push("/login");
			} else if (response?.status === 400) {
				Toast.error(
					response?.data?.message ||
						response?.data?.detail ||
						response?.data?.error ||
						"Signup failed."
				);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		<>
			<SafeView>
				<View className="p-6 gap-8">
					<View className="gap-4">
						<Text className="text-4xl text-title">Sign Up</Text>
						<Text className="text-xl text-foreground">
							Kindly enter your password
						</Text>
					</View>

					{role &&
						[
							"childcare",
							"elderly",
							"tutoring",
							"housekeeping",
						].includes(role) && (
							<Input
								label="Email address"
								placeholder="Input email address"
								value={careProviderData.user_data.email}
								onChangeText={(value: any) => {
									updateCareProviderData({
										user_data: {
											email: value,
										},
									});
								}}
							/>
						)}

					{role === "seeker" ? (
						<InputPassword
							label="Password"
							placeholder="Input Password"
							value={careSeekerData.user_data.password}
							onChangeText={(value: any) => {
								updateCareSeekerData({
									user_data: {
										password: value,
									},
								});
							}}
						/>
					) : (
						<InputPassword
							label="Password"
							placeholder="Input Password"
							value={careProviderData.user_data.password}
							onChangeText={(value: any) => {
								updateCareProviderData({
									user_data: {
										password: value,
									},
								});
							}}
						/>
					)}

					<InputPassword
						label="Confirm Password"
						placeholder="Input Password"
						value={confirmPassword}
						onChangeText={(value: any) => {
							setConfirmPassword(value);
						}}
					/>

					<View className="mt-10 items-center gap-2">
						<Pressable
							style={({ pressed }) => ({
								opacity: pressed ? 0.7 : 1,
								transform: [{ scale: pressed ? 0.98 : 1 }],
							})}
							onPress={
								role === "seeker"
									? seekerSignupHandler
									: providerSignupHandler
							}
							className="bg-primary items-center py-3 rounded-lg w-full"
						>
							<Text className="text-center text-lg text-white font-semibold">
								Sign Up
							</Text>
						</Pressable>
					</View>
				</View>

				{isLoading && (
					<View className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
						<View className="bg-white p-6 rounded-2xl flex items-center justify-center shadow-lg">
							<ActivityIndicator size="large" color="#0D99C9" />
							<Text className="mt-3 text-[#333] font-medium text-base">
								Generating preview...
							</Text>
						</View>
					</View>
				)}
			</SafeView>
		</>
	);
}
