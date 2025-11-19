import { baseURL } from "@/config";
import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

export interface SeekerDashboardPayload {
	greeting_name: string;
	new_care_provider_requests: number;
	total_amount_spent: number;
}

export interface SeekerDashboardState {
	dashboardData: SeekerDashboardPayload;
	isLoading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
	fetchDashboardData: () => Promise<void>;
}

export const useSeekerDashboardStore = create<SeekerDashboardState>(
	(set, get) => ({
		dashboardData: {
			greeting_name: "",
			new_care_provider_requests: 0,
			total_amount_spent: 0,
		},
		isLoading: false,
		error: null,
		setError: (error: string | null) => set({ error }),
		fetchDashboardData: async () => {
			try {
				set({ isLoading: true });
				const { accessToken } = useAuthStore.getState();
				const response = await axios.get(
					`${baseURL}/api/seeker/dashboard/`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				console.log("Dashboard response:", response.data);
				set({
					dashboardData: response.data,
					isLoading: false,
					error: null,
				});
			} catch (err: any) {
				console.log("Dashboard fetch error: ", err?.response?.data);
				set({
					isLoading: false,
					error:
						err?.response?.data?.detail ||
						"Failed to load dashboard",
				});
			}
		},
	})
);
