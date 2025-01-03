import { useEffect } from "react";
import { router } from "expo-router";

import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import axios from "axios";
import { Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import LocationUpdater from "@/components/LocationUpdater";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import {
  useDriverStore,
  useLocationStore,
  useSelectedDriverDetailsStore,
  useRidePhaseStore,
} from "@/store";
import { SelectedDriverDetails } from "@/types/type";

import {
  initializeSocket,
  fetchToken,
  sendMessage,
  listenToEvent,
} from "@/services/socketService";
import { useTokenStore } from "@/store/token";

const BookRide = () => {
  const { accessToken, refreshToken } = useTokenStore();
  const { userId } = useAuth();

  useEffect(() => {
    if (accessToken) {
      console.log("Access Token:", accessToken);
    }
  }, [accessToken]);

  const handleConnect = async (userId: string) => {
    try {
      // setStatus("Connecting...");
      await initializeSocket(userId);
      // setStatus("Connected to WebSocket server");
    } catch (error) {
      // setStatus("Connection failed");
      console.error(error);
    }
  };
  const requestRide = () => {
    sendMessage("rider-request", {
      riderId: "rider001",
      driverId: "user_2mKgwoeCAE2J8IiD3I5DjGX4FrP",
      latitude: -1.2709027,
      longitude: 36.8925431,
    });
    console.log('rider001 +user_2mKgwoeCAE2J8IiD3I5DjGX4FrP')
  };

  const { userAddress, destinationAddress, userLatitude, userLongitude } =
    useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  const { selectedDriverDetails } = useSelectedDriverDetailsStore();
  const { setPhase } = useRidePhaseStore();
  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver
  )[0];
  //double caal for matched driver detials
  const fetchDriverData = async (latitude: number, longitude: number) => {
    try {
      console.log("Initiating first API call to find driver...");
      const response = await axios.get(
        `http://192.168.0.102:8081/(api)/drivers/find-driver`,
        {
          params: {
            latitude: latitude,
            longitude: longitude,
          },
        }
      );

      // Extract driver data from the first response
      const driverData = response.data.data;
      console.log("Driver data received:", driverData);

      // Log specific data points
      console.log("THIS IS THE DATA WE WANT :::", driverData);

      // Check if driverId exists
      if (!driverData.driverId) {
        throw new Error("Driver ID not found in response");
      }

      // Make a second call to Neon SQL database using clerk_id
      const driverDetailsResponse = await axios.get(
        `http://192.168.0.102:8081/(api)/drivers/driver-dits`,
        {
          params: {
            clerk_id: driverData.driverId,
          },
        }
      );

      // Log the second response data
      const detailedDriverData = driverDetailsResponse.data.data[0]; // Assuming the response has a data array
      console.log("Driver details from Neon SQL:", detailedDriverData);

      // Construct SelectedDriverDetails object
      const driverDetails: SelectedDriverDetails = {
        car_image_url: detailedDriverData.car_image_url,
        car_seats: detailedDriverData.car_seats,
        clerk_id: detailedDriverData.clerk_id,
        first_name: detailedDriverData.first_name,
        id: detailedDriverData.id,
        last_name: detailedDriverData.last_name,
        profile_image_url: detailedDriverData.profile_image_url,
        rating: detailedDriverData.rating,
      };

      // Update the store with the driver details
      const { setSelectedDriverDetails } =
        useSelectedDriverDetailsStore.getState();
      setSelectedDriverDetails(driverDetails);

      console.log("Driver details updated in the store:", driverDetails);
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };
  // const fetchDriverData = async (latitude: number, longitude: number) => {
  //   try {
  //     console.log("Initiating first API call to find driver...");
  //     const response = await axios.get(
  //       `http://192.168.0.102:8081/(api)/drivers/find-driver`,
  //       {
  //         params: {
  //           latitude: latitude,
  //           longitude: longitude,
  //         },
  //       }
  //     );

  //     // Extract driver data from the first response
  //     const driverData = response.data.data;
  //     console.log("Driver data received:", driverData);

  //     // Log specific data points
  //     console.log("THIS IS THE DATA WE WANT :::", driverData);

  //     // Check if driverId exists
  //     if (!driverData.driverId) {
  //       throw new Error("Driver ID not found in response");
  //     }

  //     // Make a second call to Neon SQL database using driverId
  //     const driverDetailsResponse = await axios.get(
  //       `http://192.168.0.102:8081/(api)/drivers/driver-dits`,
  //       {
  //         params: {
  //           clerk_id: driverData.driverId,
  //         },
  //       }
  //     );

  //     // Log the second response data
  //     console.log("Driver details from Neon SQL:", driverDetailsResponse.data);

  //     // Return combined data
  //     return {
  //       ...driverData,
  //       additionalDetails: driverDetailsResponse.data,
  //     };
  //   } catch (error) {
  //     console.error("Error fetching driver data:", error);
  //   }
  // };

  useEffect(() => {
    // Call the function with sample coordinates (replace with dynamic location in a real app)
    fetchDriverData(userLatitude || -1.2709027, userLongitude || 36.8925431);
  }, [userLatitude, userLongitude]);
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.com.uber"
      urlScheme="myapp"
    >
      <RideLayout title="Book Ride">
        <>
          <LocationUpdater />
          <Text className="text-xl font-JakartaSemiBold mb-3">
            Ride Information
          </Text>

          <View className="flex flex-col w-full items-center justify-center mt-10">
            <Image
              source={{ uri: selectedDriverDetails?.profile_image_url }}
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold">
                {selectedDriverDetails?.title}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                {/* modify these ad find its use */}
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular">
                  {selectedDriverDetails?.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Ride Price</Text>
              <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                {/* work  from pricing service */}KSH
                {selectedDriverDetails?.price}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
              <Text className="text-lg font-JakartaRegular">
                {/* work  from pricing service */}
                {formatTime(driverDetails?.time!)}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Car Seats</Text>
              <Text className="text-lg font-JakartaRegular">
                {selectedDriverDetails?.car_seats}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-JakartaRegular">Phone Number</Text>
              {/* <DialerButton phoneNumber="0719788033" /> */}
              <Text>{selectedDriverDetails?.first_name}</Text>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center mt-5 mb-5">
            <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
              <Image source={icons.to} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {userAddress}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3 px-">
              <Image source={icons.point} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {destinationAddress}
              </Text>
            </View>
          </View>

          {/* <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.id}
            rideTime={driverDetails?.time!}
          /> */}
          <CustomButton
            title="Request"
            onPress={() => {
              setPhase("pick-up");
              handleConnect(userId || "");
              requestRide();
              router.push("/(root)/ride-mode");
            }}
          />
        </>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;
