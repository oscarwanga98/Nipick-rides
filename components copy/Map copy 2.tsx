import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import {
  useDriverStore,
  useLocationStore,
  useSelectedDriverDetailsStore,
  useRideStatusStore,
} from "@/store";
import { Driver, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
    driverLatitude,
    driverLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const { isWaitingForRide, setWaitingForRide, isRideStarted, setRideStarted } =
    useRideStatusStore();

  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Fetch and set driver markers
  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  // Calculate driver times for the "waiting" state
  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
        setWaitingForRide(true); // Start the waiting state
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  // When the driver arrives, switch to the ride state
  useEffect(() => {
    if (driverLatitude && driverLongitude && isWaitingForRide) {
      // Logic to detect when driver arrives, e.g., check if close to user location
      const driverHasArrived = true; // Add arrival logic here

      if (driverHasArrived) {
        setWaitingForRide(false);
        setRideStarted(true); // Start the ride state
      }
    }
  }, [driverLatitude, driverLongitude, isWaitingForRide]);

  // Define the region for the map
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          {isRideStarted ? (
            // Show directions from driver location to destination
            <MapViewDirections
              origin={{
                latitude: driverLatitude!,
                longitude: driverLongitude!,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={directionsAPI!}
              strokeColor="#0286FF"
              strokeWidth={2}
            />
          ) : isWaitingForRide ? (
            // Show directions from user to driver while waiting
            <MapViewDirections
              origin={{
                latitude: userLatitude!,
                longitude: userLongitude!,
              }}
              destination={{
                latitude: driverLatitude!,
                longitude: driverLongitude!,
              }}
              apikey={directionsAPI!}
              strokeColor="#FF6347"
              strokeWidth={2}
            />
          ) : null}

          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
