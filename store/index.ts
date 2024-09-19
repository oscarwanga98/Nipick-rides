import { create } from "zustand";

import {
  DriverStore,
  LocationStore,
  MarkerData,
  CategoryStore,
  CarCategory,
  CarCategoryStore,
  PaymentMethodStore,
  PaymentMethod,
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
      selectedCategory: state.categories.some(
        (category) => category.id === categoryId
      )
        ? categoryId
        : null,
    })),

  // Function to set the categories array
  setCategories: (categories: CarCategory[]) => set(() => ({ categories })),

  // Function to clear the selected category
  clearSelectedCategory: () => set(() => ({ selectedCategory: null })),
}));

// Create the Zustand store
export const useCarCategoryStore = create<CarCategoryStore>((set) => ({
  categories: [], // Initialize with provided categories
  selectedCategory: null, // No category selected initially

  // Function to set the categories
  setCategories: (categories: CarCategory[]) => set({ categories }),

  // Function to set the selected category by passing the entire CarCategory object
  setSelectedCategory: (category: CarCategory) =>
    set({ selectedCategory: category }),

  // Function to select a category by its ID
  selectCategory: (categoryId: number) =>
    set((state) => ({
      selectedCategory:
        state.categories.find((category) => category.id === categoryId) || null,
    })),

  // Function to clear the selected category
  clearSelectedCategory: () => set({ selectedCategory: null }),
}));

export const usePaymentMethodStore = create<PaymentMethodStore>((set) => ({
  paymentMethods: [], // Initialize with predefined payment methods
  selectedPaymentMethod: null, // No payment method selected initially

  // Function to set the payment methods
  setPaymentMethods: (methods: PaymentMethod[]) =>
    set({ paymentMethods: methods }),

  // Function to select a payment method by passing the entire PaymentMethod object
  selectPaymentMethod: (method: PaymentMethod) =>
    set({ selectedPaymentMethod: method }),

  // Function to clear the selected payment method
  clearSelectedPaymentMethod: () => set({ selectedPaymentMethod: null }),
}));
