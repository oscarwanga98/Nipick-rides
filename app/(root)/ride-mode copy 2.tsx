import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAuth } from "@clerk/clerk-expo";

import { useSelectedDriverDetailsStore, useLocationStore } from "@/store";

let ws: WebSocket | null = null;

const RiderApp = () => {
  const ws = useRef<WebSocket | null>(null);
  const navigation = useNavigation();
  const { userId } = useAuth();
  const { selectedDriverDetails } = useSelectedDriverDetailsStore();
  const { setDriverLocation, driverLatitude, driverLongitude } =
    useLocationStore();

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket("ws://192.168.0.11:8080");

    // Handle WebSocket connection open
    ws.current.onopen = () => {
      console.log("WebSocket connected");

      // Subscribe to driver location updates
      const subscriptionMessage = {
        type: "rider-subscribe",
        riderId: userId, // Unique rider identifier
        driverId: selectedDriverDetails?.clerk_id, // The driver rider wants to track
      };
      ws.current.send(JSON.stringify(subscriptionMessage));
    };

    // Handle incoming messages (location updates)
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "driver-location-update") {
        console.log("Received driver location update:", message.location);

        // Update the driver's location in state

        setDriverLocation({
          latitude: message.location.latitude,
          longitude: message.location.longitude,
          address: "Unknown Address",
        });
      }
    };

    // Handle WebSocket connection close
    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Clean up WebSocket connection on unmount
    return () => {
      ws.current?.close();
    };
  }, [userId, selectedDriverDetails?.clerk_id]);

  return (
    <View style={{ flex: 1 }}>
      {/* Map view to show driver's location */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: driverLatitude || 37.7749,
          longitude: driverLongitude || -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Render driver marker */}
        {driverLatitude && (
          <Marker
            coordinate={{
              latitude: driverLatitude | 37.7749,
              longitude: driverLongitude || 37.7749,
            }}
            title="Driver Location"
            description="This is the current location of your driver"
          />
        )}
      </MapView>

      {/* Button to navigate back to home */}
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 20,
          right: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#000",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RiderApp;
