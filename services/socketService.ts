// tokenManager.ts
import axios from "axios";
import { io, Socket } from "socket.io-client";

import { useTokenStore } from "@/store/token";

// Configurations
const SOCKET_SERVER_URL = "https://websocket-location-server.onrender.com";
const TOKEN_API_URL =
  "https://websocket-location-server.onrender.com/generate-jwt";
const REFRESH_TOKEN_API_URL =
  "https://websocket-location-server.onrender.com/refresh-token";

let socket: Socket | null = null;

// Token management
export const fetchToken = async (userId: string): Promise<void> => {
  try {
    const response = await axios.post(TOKEN_API_URL, { userId });
    const { token, refreshToken } = response.data;

    // Store tokens in Zustand store
    const { setAccessToken, setRefreshToken } = useTokenStore.getState();
    setAccessToken(token);
    setRefreshToken(refreshToken);
  } catch (error) {
    console.error("Error fetching token:", error);
    throw new Error("Failed to obtain JWT token");
  }
};

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const { refreshToken } = useTokenStore.getState();
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(REFRESH_TOKEN_API_URL, { refreshToken });
    const { token } = response.data;

    // Update access token in Zustand store
    const { setAccessToken } = useTokenStore.getState();
    setAccessToken(token);
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh JWT token");
  }
};

// Socket initialization
export const initializeSocket = async (userId: string): Promise<void> => {
  try {
    await fetchToken(userId);

    const { accessToken } = useTokenStore.getState();
    if (!accessToken) throw new Error("No access token available");

    if (!socket) {
      socket = io(SOCKET_SERVER_URL, {
        extraHeaders: {
          authorization: accessToken,
        },
        query: {
          clientType: "rider",
        },
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("connect_error", (error: Error) => {
        console.error("Connection error:", error);
      });
    }
  } catch (error) {
    console.error("Socket initialization failed:", error);
  }
};

export const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn(
      "Socket has not been initialized. Call initializeSocket first."
    );
  }
  return socket;
};

// Function to send a message to the WebSocket server
export const sendMessage = (event: string, payload: any): void => {
  if (!socket) {
    console.warn("Socket not initialized. Call initializeSocket first.");
    return;
  }

  socket.emit(event, payload, (response: any) => {
    console.log(`Response from server for event "${event}":`, response);
  });
};

// Function to listen for a specific event from the WebSocket server
export const listenToEvent = (
  event: string,
  callback: (data: any) => void
): void => {
  if (!socket) {
    console.warn("Socket not initialized. Call initializeSocket first.");
    return;
  }

  socket.on(event, callback);
};
