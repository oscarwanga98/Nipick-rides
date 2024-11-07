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
  NearDriverStore,
  SelectedDriverDetailsStore,
  SelectedDriverDetails,
  RideState,
  DriverPinStore,
} from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  driverLatitude: null,
  driverLongitude: null,
  driverAddress: null,

  setUserLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // Access driver state from useDriverStore
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();

    // If a driver is selected, clear the selection
    if (selectedDriver) {
      clearSelectedDriver();
    }
  },

  setDestinationLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // Access driver state from useDriverStore
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();

    // If a driver is selected, clear the selection
    if (selectedDriver) {
      clearSelectedDriver();
    }
  },

  setDriverLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      driverLatitude: latitude,
      driverLongitude: longitude,
      driverAddress: address,
    }));
  },

  clearDriverLocation: () => {
    set(() => ({
      driverLatitude: null,
      driverLongitude: null,
      driverAddress: null,
    }));
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

export const useNearDriverStore = create<NearDriverStore>((set) => ({
  driverIds: [], // Initialize with an empty array
  addDriverIds: (ids) =>
    set((state) => ({ driverIds: [...state.driverIds, ...ids] })),
  setDriverIds: (ids) => set(() => ({ driverIds: ids })),
  removeDriverId: (id) =>
    set((state) => ({
      driverIds: state.driverIds.filter((driverId) => driverId !== id),
    })),
  clearDriverIds: () => set(() => ({ driverIds: [] })),
}));

export const useSelectedDriverDetailsStore = create<SelectedDriverDetailsStore>(
  (set) => ({
    selectedDriverDetails: null,

    setSelectedDriverDetails: (driverDetails: SelectedDriverDetails) =>
      set({ selectedDriverDetails: driverDetails }),

    clearSelectedDriverDetails: () => set({ selectedDriverDetails: null }),
  })
);

export const useRidePhaseStore = create<RideState>((set) => ({
  phase: "request",
  setPhase: (phase) => set({ phase }),
}));

export const useDriverPinStore = create<DriverPinStore>((set) => ({
  drivers: [],

  // Action to set drivers in the store
  setDrivers: (drivers) => set({ drivers }),

  // Action to clear drivers from the store
  clearDrivers: () => set({ drivers: [] }),
}));

