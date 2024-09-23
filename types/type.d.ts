import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
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

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
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

interface CarCategory {
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
  id: number;
  name: string;
  maxPassengers: number;
  engineCapacity: number;
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
interface PaymentCardProps {
  PaymentMethod: PaymentMethod; // The payment method object passed to the card
  selected: boolean; // Whether this payment method is selected
  setPaymentMethods: () => void; // Function to set the selected payment method
}