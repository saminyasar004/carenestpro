import { Image, Pressable, Text, View } from "react-native";
import { Portal } from "react-native-portalize";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

export default function SubscribeModal({
	showModal,
	onClose,
}: {
	showModal: boolean;
	onClose: () => void;
}) {
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
								Subscribe to have unlimited access to Care
								Provider
							</Typography>
							<Typography
								className="text-center"
								variant="sm-subtitle"
							>
								Kindly select preferred payment option
							</Typography>

							<View className="w-full flex flex-row items-center gap-3 mt-5">
								<View className="w-[31%] flex flex-col items-center gap-3 bg-[#F7FBFD] border border-[#C9E3F3] p-4 rounded-lg">
									<Text className="text-base font-semibold text-[#666666]">
										Free
									</Text>
									<Text className="text-2xl font-medium text-[#354A55]">
										$00.00
									</Text>

									<Button
										title="Limited"
										className="bg-[#DAECF7] border-[#CDE5F4] py-1 w-full"
										textClassName="text-[#6CB3DD] text-base"
									/>
								</View>

								<View className="w-[31%] flex flex-col items-center gap-3 bg-[#0D99C9] border border-[#2B91CF] p-4 rounded-lg">
									<Text className="text-base font-semibold text-[#E6E6E6]">
										Quarterly
									</Text>
									<Text className="text-2xl font-medium text-[#FFFFFF]">
										$68.99
									</Text>

									<Button
										title="32% off"
										className="bg-[#DAECF7] border-[#CDE5F4] py-1 w-full"
										textClassName="text-[#6CB3DD] text-base"
									/>
								</View>

								<View className="w-[31%] flex flex-col items-center gap-3 bg-[#F7FBFD] border border-[#C9E3F3] p-4 rounded-lg">
									<Text className="text-base font-semibold text-[#666666]">
										Monthly
									</Text>
									<Text className="text-2xl font-medium text-[#354A55]">
										$23.99
									</Text>

									<Button
										title="10% off"
										className="bg-[#DAECF7] border-[#CDE5F4] py-1 w-full"
										textClassName="text-[#6CB3DD] text-base"
									/>
								</View>
							</View>
						</View>
					</Pressable>
				</Pressable>
			)}
		</Portal>
	);
}
