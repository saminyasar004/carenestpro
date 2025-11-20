import { baseURL } from "@/config";
import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

export interface CareProviderUserProps {
	id: number;
	full_name: string;
	profile_image_url: string | null;
}

export interface NearestCareProvidersPayload {
	id: number;
	user: CareProviderUserProps;
	profile_title: string;
	city: string;
	country: string;
	service_category_name: string;
	hourly_rate: string;
	years_of_experience: number;
	average_rating: number;
}

export interface DetailsNearestCareProvidersPayload {
	id: number;
	user: CareProviderUserProps;
	city: string;
	country: string;
	title: string;
	summary: string;
	years_of_experience: number;
	hourly_rate: string;
	average_rating: number;
	skills: string[];
	testimonials: {
		id: number;
		comment: string;
		reviewer: string;
	}[];
}

export interface NearestCareProvidersState {
	nearestCareProviders: NearestCareProvidersPayload[];
	detailsNearestCareProviders: DetailsNearestCareProvidersPayload;
	isLoading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
	fetchNearestCareProviders: () => Promise<void>;
	fetchDetailsNearestCareProviders: (id: number) => Promise<void>;
}

export const useNearestCareProvidersStore = create<NearestCareProvidersState>(
	(set, get) => ({
		nearestCareProviders: [],
		detailsNearestCareProviders: {
			id: 0,
			user: {
				id: 0,
				full_name: "",
				profile_image_url: null,
			},
			city: "",
			country: "",
			title: "",
			summary: "",
			years_of_experience: 0,
			hourly_rate: "",
			average_rating: 0,
			skills: [],
			testimonials: [],
		},
		isLoading: false,
		error: null,
		setError: (error: string | null) => set({ error }),
		fetchNearestCareProviders: async () => {
			try {
				set({ isLoading: true });
				const { accessToken } = useAuthStore.getState();
				const response = await axios.get(
					`${baseURL}/api/browse-providers/`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				console.log("Nearest Care Providers response:", response.data);
				set({
					nearestCareProviders: response.data,
					isLoading: false,
					error: null,
				});
			} catch (err: any) {
				console.log(
					"Nearest Care Providers fetch error: ",
					err?.response?.data
				);
				set({
					isLoading: false,
					error:
						err?.response?.data?.detail ||
						"Failed to load nearest care providers",
				});
			}
		},

		fetchDetailsNearestCareProviders: async (id: number) => {
			try {
				set({ isLoading: true });
				const { accessToken } = useAuthStore.getState();
				const response = await axios.get(
					`${baseURL}/api/providers_details/${id}/`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				console.log(
					"Details Nearest Care Providers response:",
					response.data
				);
				set({
					detailsNearestCareProviders: response.data,
					isLoading: false,
					error: null,
				});
			} catch (err: any) {
				console.log(
					"Details Nearest Care Providers fetch error: ",
					err?.response?.data
				);
				set({
					isLoading: false,
					error:
						err?.response?.data?.detail ||
						"Failed to load nearest care providers",
				});
			}
		},
	})
);
