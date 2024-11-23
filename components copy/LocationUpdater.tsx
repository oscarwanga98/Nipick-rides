import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";


import {
  useLocationStore,
  useSelectedDriverDetailsStore,
  useNearDriverStore,
} from "@/store"; // Zustand store

const LocationUpdater = () => {
  const { userLatitude, userLongitude } = useLocationStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setDriverIds, driverIds } = useNearDriverStore();
  const { selectedDriverDetails, setSelectedDriverDetails } =
    useSelectedDriverDetailsStore();

  useEffect(() => {
    const fetchDriversIDS = async () => {
      try {
        setLoading(true);

        // Construct the URL with query parameters for latitude and longitude
        const url = `https://trinity1-location-matching-service-trial2.onrender.com/nearby-drivers?latitude=${userLatitude}&longitude=${userLongitude}`;

        const response = await fetch(url);

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`Error fetching drivers: ${response.statusText}`);
        }

        const textResponse = await response.text();
        console.log("Response body:", textResponse);

        const data = JSON.parse(textResponse);
        console.log(data.driverIds);
        // setDrivers(data);
        setDriverIds(data.driverIds);

        // Fetch driver details using the obtained driver IDs
        fetchDriversDetails(data.driverIds); // Pass driver IDs to fetch details
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDriversDetails = async (driverIds: string[]) => {
      try {
        // Construct the URL to fetch driver details
        const url = `/(api)/drivers/neardriver?ids=${driverIds.join(",")}`; // Make sure to use the correct API endpoint
        const response = await fetch(url);

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(
            `Error fetching driver details : ${response.statusText}`
          );
        }

        const detailsResponse = await response.json(); // Assuming the response is in JSON format
        console.log(detailsResponse.data[0]);
        setSelectedDriverDetails(detailsResponse.data[0]); // Set the driver details in the state
      } catch (error) {
        console.error(error);
        setError(error.message); // Set the error if fetching details fails
      }
    };

    fetchDriversIDS();
  }, [userLatitude, userLongitude]); // Re-run if the user's location changes

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading drivers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  

  return (
    <View>
      {/* <Text>Driver IDs: {driverIds.join(", ")}</Text>
      <Text>Driver name:{selectedDriverDetails?.first_name} </Text>
      <Text>Driver last name:{selectedDriverDetails?.last_name} </Text>
      <Text>Driver car pic:{selectedDriverDetails?.clerk_id} </Text>
      <Text>Category:{selectedDriverDetails?.car_category} </Text> */}
    </View>
  );
};

export default LocationUpdater;
