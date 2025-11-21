import SafeView from "@/components/layout/safe-view";
import { Input, InputPassword } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Toast } from "toastify-react-native";

export default function Page() {
	const router = useRouter();
	const { login, isLoading } = useAuthStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async () => {
		try {
			if (!email) {
				Toast.error("Please enter your email address");
				return;
			}
			if (!password) {
				Toast.error("Please enter your password");
				return;
			}
			const user = await login({ email, password });

			if (user) {
				Toast.success("Login successful");

				if (user.user_type === "provider") {
					router.push("/provider/(tabs)/home");
				} else {
					router.push("/seeker/(tabs)/home");
				}
				return;
			}

			Toast.error("Login failed. Please check your credentials.");
		} catch (err: any) {
			console.log("Error occured during login.");
			console.log(err.message);
		}
	};

	return (
		<>
			<SafeView>
				<View className="p-6 gap-8">
					<View className="gap-4">
						<Typography variant="title">Log In</Typography>
						<Typography variant="subtitle">
							Welcome back, Please enter your login details
						</Typography>
					</View>
					<Input
						label="Email Address"
						placeholder="Input email address"
						value={email}
						onChangeText={(value: any) => {
							setEmail(value);
						}}
					/>
					<View className="gap-2">
						<InputPassword
							label="Password"
							placeholder="Input Password"
							value={password}
							onChangeText={(value: any) => {
								setPassword(value);
							}}
						/>
						<Link
							href={"/forgot-password"}
							className="text-primary"
						>
							Forgot password?
						</Link>
					</View>

					<View className="mt-16 items-center gap-2">
						<Pressable
							style={({ pressed }) => ({
								opacity: pressed ? 0.7 : 1,
								transform: [{ scale: pressed ? 0.98 : 1 }],
							})}
							className="bg-primary items-center py-3 rounded-lg w-full border-2 border-primary"
							onPress={onSubmit}
						>
							<Typography
								variant="subtitle"
								className="text-center text-lg text-white font-semibold"
							>
								{isLoading ? "Logging in..." : "Login"}
							</Typography>
						</Pressable>

						<Text className="text-foreground text-lg">
							Don&apos;t have an account yet?{" "}
							<Link
								href={"/choose"}
								replace
								className="text-primary"
							>
								Sign Up
							</Link>
						</Text>
					</View>
				</View>
			</SafeView>
		</>
	);
}
