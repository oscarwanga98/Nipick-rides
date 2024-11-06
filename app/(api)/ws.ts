import { useNearDriverStore } from "@/store"; // Zustand store for managing nearby driver IDs

let ws: WebSocket | null = null;

export const connectWebSocket = (driverId: string) => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    // ws = new WebSocket("https://websocket-location-server.onrender.com");
    // ws = new WebSocket(
    //   "ws://trinity1-location-matching-service-trial2.onrender.com"
    // );
    ws = new WebSocket("ws://192.168.0.102:8080");

    https: ws.onopen = () => {
      console.log("WebSocket connection established");

      // Send the driver ID or any initial registration message
      const initialMessage = JSON.stringify({
        type: "register-driver",
        driverId,
      });
      ws.send(initialMessage);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Wrap Zustand store usage in a function call
      handleWebSocketMessage(data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed...");
      ws = null; // Reset WebSocket reference when closed
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }
};

// Separate function to handle WebSocket messages
const handleWebSocketMessage = (data: any) => {
  const { setDriverIds } = useNearDriverStore.getState(); // Access Zustand store directly
  if (data.type === "nearby-drivers") {
    // Extract driver IDs from the nearby drivers
    const driverIds = data.drivers.map((driver: any) => driver.driverId);
    console.log("Nearby driver IDs received:", driverIds);
    setDriverIds(driverIds); // Update Zustand store with driver IDs
  } else if (data.type === "error") {
    console.error("Error from server:", data.message);
  }
};

export const sendLocationUpdate = (
  driverId: string,
  latitude: number,
  longitude: number
) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
      type: "driver-location-update",
      driverId,
      latitude,
      longitude,
    });

    ws.send(message);
    console.log("Location sent to WebSocket:", message);
  } else {
    console.error("WebSocket is not open");
  }
};

export const sendRiderRequest = (
  riderId: string,
  latitude: number,
  longitude: number
) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
      type: "rider-request",
      riderId,
      latitude,
      longitude,
    });

    ws.send(message);
    console.log("Rider request sent:", message);
  } else {
    console.error("WebSocket is not open");
  }
};
