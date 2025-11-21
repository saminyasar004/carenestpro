import LOCATION from "@/assets/svgs/location.svg";
import { baseURL } from "@/config";
import { useCareProviderStore } from "@/store/careProviderStore";
import { useCareSeekerStore } from "@/store/careSeekerStore";
import axios from "axios";
import * as Device from "expo-device"; // Optional: to check if running on real device
import * as Location from "expo-location";
import { useState } from "react";
import {
	Alert,
	ImageBackground,
	Linking,
	Platform,
	Pressable,
	useWindowDimensions,
	View,
} from "react-native";
import { Portal } from "react-native-portalize";
import { Toast } from "toastify-react-native";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

export function EnableLocationModal({
	showModal,
	onClose,
}: {
	showModal: boolean;
	onClose: () => void;
}) {
	const { height } = useWindowDimensions();
	const [isLoading, setIsLoading] = useState(false);

	const { careProviderData, updateCareProviderData } = useCareProviderStore();
	const { careSeekerData, updateCareSeekerData } = useCareSeekerStore();

	const handleAllowLocation = async () => {
		setIsLoading(true);

		// Quick check: Doesn't work on Android emulators
		if (Platform.OS === "android" && !Device.isDevice) {
			Toast.error(
				"Oops!, Location needs a real device—try on your phone."
			);
			setIsLoading(false);
			return;
		}

		// Step 1: Request foreground permission
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission Needed",
				"We need your location to personalize your experience. You can enable it in settings.",
				[
					{
						text: "Open Settings",
						onPress: () => Linking.openSettings(),
					},
				]
			);
			setIsLoading(false);
			return;
		}

		// Step 2: Get precise current location
		try {
			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High, // Or .Highest for even more precision (uses GPS + WiFi)
				timeInterval: 1000, // Update every second if needed
				distanceInterval: 1, // Minimum distance change to trigger update
			});

			const { latitude, longitude } = location.coords;
			console.log("Precise Coordinates:", { latitude, longitude });

			// Now do something with the coords, e.g., save to state, navigate to next screen, or send to your backend
			// Example: setLocation({ lat: latitude, lng: longitude });

			//   Alert.alert('Success!', `Got your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
			const response = await axios.get(
				`${baseURL}/api/location/reverse-geocode/?lat=${latitude}&lon=${longitude}`
			);
			console.log("Reverse Geolocation response:", response.data);

			if (response.status === 200) {
				updateCareProviderData({
					profile_data: {
						...careProviderData.profile_data,
						country: response.data?.country,
						state: response.data?.state,
						city: response.data?.city,
						zip_code: response.data?.zip_code,
						nationality: response.data?.nationality,
					},
				});
				updateCareSeekerData({
					job_data: {
						...careSeekerData.job_data,
						details: {
							...careSeekerData.job_data.details,
							location_information: {
								...careSeekerData.job_data.details
									.location_information,
								use_current_location: true,
								country: response.data?.country,
								state: response.data?.state,
								city: response.data?.city,
								zip_code: response.data?.zip_code,
								nationality: response.data?.nationality,
							},
						},
					},
				});
				Toast.success("Location successfully fetched");
				onClose();
			} else {
				Toast.error(
					response.data?.message ||
						response.data?.detail ||
						"Location cannot fetched. Please try again later."
				);
			}
		} catch (error: any) {
			console.error("Location error:", error);
			Alert.alert("Error", `Couldn't get location: ${error.message}`);
		}

		setIsLoading(false);
	};

	return (
		<Portal>
			{showModal && (
				<Pressable
					className="flex-1 bg-black/50 px-4 items-center justify-center"
					onPress={onClose}
				>
					<Pressable
						className="w-full bg-white gap-2"
						style={{
							// height: height * 0.6,
							transform: `translateY(${((height * 2) / 3) * 0.2}px)`,
						}}
					>
						<ImageBackground
							source={require("@/assets/images/on-boarding/map.png")}
							width={0}
							className="w-full h-60"
							resizeMode="cover"
						>
							<View className="inset-0 absolute bg-black/30 z-99 flex-1 items-center justify-center">
								<View className="p-4 rounded-full bg-primary/20">
									<View className="p-4 rounded-full bg-primary/20">
										<View className="p-2 rounded-full bg-[#EFF7FB]/40">
											<LOCATION />
										</View>
									</View>
								</View>
							</View>
						</ImageBackground>

						<View className="px-4 items-center gap-2 pb-4">
							<Typography variant="sm-title" className="text-2xl">
								Enable your Location
							</Typography>
							<Typography
								className="text-center"
								variant="sm-subtitle"
							>
								This app requires your location are turned on
								your devices and on this app. You must enable
								them on your phone settings
							</Typography>
							<Button
								textClassName="text-lg"
								title={
									isLoading
										? "Loading..."
										: "Allow only while using this App"
								}
								onPress={handleAllowLocation}
								disabled={isLoading}
							/>
							<Button
								variant="primary-outline"
								title="Don't allow this App"
								textClassName="text-primary text-lg"
								onPress={onClose}
							/>
						</View>
					</Pressable>
				</Pressable>
			)}
		</Portal>
	);
}
