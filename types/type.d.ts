import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  longitude: number | null;
  latitude: number | null;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  driverLatitude: number | null;
  driverLongitude: number | null;
  driverAddress: string | null;

  setUserLocation: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;

  setDestinationLocation: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;

  setDriverLocation: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;

  clearDriverLocation: () => void;
}

declare interface DriverStore {
  drivers: MarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}

declare interface CarCategory {
  id: number;
  name: string;
  maxPassengers: number;
  engineCapacity: number;
}

declare interface CategoryCardProps {
  category: CarCategory;
  selected: boolean;
  setSelected: () => void;
}

// Define the structure of the store
declare interface CategoryStore {
  categories: CarCategory[]; // Array to store all categories
  selectedCategory: number | null; // Selected category
  setSelectedCategory: (categoryId: number) => void; // Function to set selected category
  setCategories: (categories: CarCategory[]) => void; // Function to set all categories
  clearSelectedCategory: () => void; // Function to clear the selected category
}

declare interface CarCategory {
  category: string;
  name: string;
  maxPassengers: number;
  engineCapacity: number;
  price: string;
}

// Define the Zustand store for car categories
declare interface CarCategoryStore {
  categories: CarCategory[]; // Array of car categories
  selectedCategory: CarCategory | null; // Currently selected category
  setCategories: (categories: CarCategory[]) => void; // Function to set categories
  setSelectedCategory: (category: CarCategory) => void; // Function to set the selected category
  clearSelectedCategory: () => void; // Function to clear selected category
  selectCategory: (categoryId: number) => void; // New function to select a category by ID // Function to set the selected category
}

// Define the props interface for the CategoryCard2 component
declare interface CategoryCard2Props {
  item: CarCategory; // The category item (type of car)
  setSelected: () => void; // Function to set the selected category
  selected: boolean; // Whether the current category is selected or not
}

declare interface PaymentMethod {
  id: number;
  name: string;
  description: string;
  icon: any;
}

declare interface PaymentMethodStore {
  paymentMethods: PaymentMethod[]; // Array of payment methods
  selectedPaymentMethod: PaymentMethod | null; // Currently selected payment method
  setPaymentMethods: (methods: PaymentMethod[]) => void; // Function to set the payment methods
  selectPaymentMethod: (method: PaymentMethod) => void; // Function to set selected payment method
  clearSelectedPaymentMethod: () => void; // Function to clear selected payment method
}
declare interface PaymentCardProps {
  PaymentMethod: PaymentMethod; // The payment method object passed to the card
  selected: boolean; // Whether this payment method is selected
  setPaymentMethods: () => void; // Function to set the selected payment method
}

declare interface NearDriverStore {
  driverIds: number[]; // Array of driver IDs
  addDriverIds: (ids: number[]) => void; // Add multiple driver IDs
  setDriverIds: (ids: number[]) => void; // Set the entire array of driver IDs
  removeDriverId: (id: number) => void; // Remove a driver ID
  clearDriverIds: () => void; // Clear all driver IDs
}
declare interface SelectedDriverDetails {
  car_image_url: string;
  car_seats: number;
  clerk_id: string;
  first_name: string;
  id: number;
  last_name: string;
  profile_image_url: string;
  rating: string;
}

declare interface SelectedDriverDetailsStore {
  selectedDriverDetails: SelectedDriverDetails | null;
  setSelectedDriverDetails: (driverDetails: SelectedDriverDetails) => void;
  clearSelectedDriverDetails: () => void;
}
declare interface RideStatusState {
  isWaitingForRide: boolean;
  setWaitingForRide: (waiting: boolean) => void;

  isRideStarted: boolean;
  setRideStarted: (started: boolean) => void;
}
declare type RidePhase = "pickup" | "ride";

declare interface RideState {
  phase: RidePhase;
  setPhase: (phase: RidePhase) => void;
}

declare interface DriverPin {
  driverId: string;
  location: {
    h3Index: string;
    latitude: number;
    longitude: number;
  };
}
declare interface DriverPinStore {
  drivers: DriverPin[];
  setDrivers: (drivers: DriverPin[]) => void;
  clearDrivers: () => void;
}

declare interface PriceCategory {
  category: string;
  maxPassengers: number;
  engineCapacity: number;
  price: string;
}

declare interface PricingStore {
  baseFare: number;
  distanceCost: number;
  timeCost: number;
  surgeMultiplier: string;
  weatherAdjustment: number;
  driverRatingAdjustment: string;
  prices: {
    category: string;
    maxPassengers: number;
    engineCapacity: number;
    price: string;
  }[];
  setBaseFare: (baseFare: number) => void;
  setDistanceCost: (distanceCost: number) => void;
  setTimeCost: (timeCost: number) => void;
  setSurgeMultiplier: (surgeMultiplier: string) => void;
  setWeatherAdjustment: (weatherAdjustment: number) => void;
  setDriverRatingAdjustment: (driverRatingAdjustment: string) => void;
  setPrices: (
    prices: {
      category: string;
      maxPassengers: number;
      engineCapacity: number;
      price: string;
    }[]
  ) => void;
  setPricingData: (
    data: Omit<
      PricingStore,
      | "setBaseFare"
      | "setDistanceCost"
      | "setTimeCost"
      | "setSurgeMultiplier"
      | "setWeatherAdjustment"
      | "setDriverRatingAdjustment"
      | "setPrices"
      | "setPricingData"
    >
  ) => void;
}
