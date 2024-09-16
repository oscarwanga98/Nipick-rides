import { create } from "zustand";

import {
  DriverStore,
  LocationStore,
  MarkerData,
  CategoryStore,
  CarCategory
} from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [], // Initial categories array
  selectedCategory: null, // Initially, no category is selected

  // Function to set the selected category by ID
  setSelectedCategory: (categoryId: number) =>
    set((state) => ({
      selectedCategory:
        state.categories.find((category) => category.id === categoryId) || null,
    })),

  // Function to set the categories array
  setCategories: (categories: CarCategory[]) => set(() => ({ categories })),

  // Function to clear the selected category
  clearSelectedCategory: () => set(() => ({ selectedCategory: null })),
}));
