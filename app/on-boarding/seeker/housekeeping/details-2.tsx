import DropDown from "@/components/ui/dropdown";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useCareSeekerStore } from "@/store/careSeekerStore";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView } from "react-native";
import { Toast } from "toastify-react-native";

const getDefaultHousekeepingInfo = () => ({
	kind_of_housekeeping: [],
	size_of_your_house: "",
	number_of_bedrooms: "",
	number_of_bathrooms: "",
	number_of_toilets: "",
	pets_present: "",
	specify_pet_present: "",
	additional_care: [],
});

export default function Page() {
	const router = useRouter();

	const { careSeekerData, updateCareSeekerData } = useCareSeekerStore();

	const housekeepingInfo =
		careSeekerData.job_data.details.housekeeping_information ||
		getDefaultHousekeepingInfo();

	const onSubmit = async () => {
		try {
			console.log("Housekeeping Details Submit:", housekeepingInfo);

			if (
				!housekeepingInfo.kind_of_housekeeping ||
				housekeepingInfo.kind_of_housekeeping.length === 0
			) {
				Toast.show({
					type: "error",
					text1: "Please select at least one kind of housekeeping",
				});
				return;
			}

			if (!housekeepingInfo.size_of_your_house) {
				Toast.show({
					type: "error",
					text1: "Please select the size of your house",
				});
				return;
			}

			if (!housekeepingInfo.number_of_bedrooms) {
				Toast.show({
					type: "error",
					text1: "Please enter the number of bedrooms",
				});
				return;
			}

			if (!housekeepingInfo.number_of_bathrooms) {
				Toast.show({
					type: "error",
					text1: "Please enter the number of bathrooms",
				});
				return;
			}

			if (!housekeepingInfo.number_of_toilets) {
				Toast.show({
					type: "error",
					text1: "Please enter the number of toilets",
				});
				return;
			}

			if (!housekeepingInfo.pets_present) {
				Toast.show({
					type: "error",
					text1: "Please select whether pets are present",
				});
				return;
			}

			if (
				housekeepingInfo.pets_present === "Others" &&
				!housekeepingInfo.specify_pet_present
			) {
				Toast.show({
					type: "error",
					text1: "Please specify the pet present",
				});
				return;
			}

			router.push("/on-boarding/seeker/housekeeping/details-3");
		} catch (err: any) {
			console.log("Error:", err.message);
			Toast.show({
				type: "error",
				text1: "Something went wrong, please try again.",
			});
		}
	};

	return (
		<SafeAreaView className="w-full h-full bg-white">
			<Header
				title="Housekeeping details"
				subtitle="Kindly select options to help us understand your preferences"
			/>
			<ScrollView
				className="p-6 bg-white"
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 60,
				}}
				contentContainerClassName="gap-6"
			>
				<DropDown
					list={[
						"House keeper",
						"Cook",
						"Laundry Support",
						"Cleaner",
						"Others",
					]}
					title="What kind of Housekeeping"
					isMulti={true}
					values={housekeepingInfo.kind_of_housekeeping}
					onChange={(value: any) => {
						const existingSeekerInfo = careSeekerData.job_data
							.details.housekeeping_information || {
							kind_of_housekeeping: [],
							size_of_your_house: "",
							number_of_bedrooms: "",
							number_of_bathrooms: "",
							number_of_toilets: "",
							pets_present: "",
							specify_pet_present: "",
							additional_care: [],
						};

						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...existingSeekerInfo,
										kind_of_housekeeping: value,
									},
								},
							},
						});
					}}
				/>
				<DropDown
					list={[
						"Bungalow",
						"Duplex",
						"2 storey building",
						"3 storey building",
						"Others",
					]}
					title="Size of your house"
					value={housekeepingInfo.size_of_your_house}
					onChange={(value: string) =>
						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...housekeepingInfo,
										size_of_your_house: value,
									},
								},
							},
						})
					}
				/>

				<Input
					label="Number of Bedrooms"
					placeholder="Input number of bedrooms"
					value={housekeepingInfo.number_of_bedrooms}
					onChangeText={(value: string) =>
						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...housekeepingInfo,
										number_of_bedrooms: value,
									},
								},
							},
						})
					}
				/>
				<Input
					label="Number of Bathrooms"
					placeholder="Input number of bathrooms"
					keyboardType="number-pad"
					value={housekeepingInfo.number_of_bathrooms}
					onChangeText={(value: string) =>
						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...housekeepingInfo,
										number_of_bathrooms: value,
									},
								},
							},
						})
					}
				/>
				<Input
					label="Number of Toilets"
					placeholder="Input number of Toilets"
					keyboardType="number-pad"
					value={housekeepingInfo.number_of_toilets}
					onChangeText={(value: string) =>
						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...housekeepingInfo,
										number_of_toilets: value,
									},
								},
							},
						})
					}
				/>

				<DropDown
					list={["Yes", "No"]}
					title="Pets present"
					value={housekeepingInfo.pets_present}
					onChange={(value: string) =>
						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...housekeepingInfo,
										pets_present: value,
									},
								},
							},
						})
					}
				/>

				<Input
					label="(If yes) Specify Pet present"
					placeholder="Input pet name"
					value={housekeepingInfo.specify_pet_present}
					onChangeText={(value: string) =>
						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...housekeepingInfo,
										specify_pet_present: value,
									},
								},
							},
						})
					}
				/>

				<DropDown
					list={["Child Care", "Elderly Care", "Tutoring"]}
					title="Additional Care"
					isMulti={true}
					values={housekeepingInfo.additional_care}
					onChange={(value: any) => {
						const existingSeekerInfo = careSeekerData.job_data
							.details.housekeeping_information || {
							kind_of_housekeeping: [],
							size_of_your_house: "",
							number_of_bedrooms: "",
							number_of_bathrooms: "",
							number_of_toilets: "",
							pets_present: "",
							specify_pet_present: "",
							additional_care: [],
						};

						updateCareSeekerData({
							job_data: {
								...careSeekerData.job_data,
								details: {
									...careSeekerData.job_data.details,
									housekeeping_information: {
										...existingSeekerInfo,
										additional_care: value,
									},
								},
							},
						});
					}}
				/>

				<Pressable
					style={({ pressed }) => ({
						opacity: pressed ? 0.7 : 1,
						transform: [{ scale: pressed ? 0.98 : 1 }],
					})}
					onPress={onSubmit}
					className="bg-primary items-center py-3 rounded-lg w-full"
				>
					<Typography
						variant="subtitle"
						className="text-center text-lg text-white font-semibold"
					>
						Next
					</Typography>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
}
