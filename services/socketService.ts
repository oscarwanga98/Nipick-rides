import axios from "axios";
import { io, Socket } from "socket.io-client";

// Configurations
const SOCKET_SERVER_URL = "https://websocket-location-server.onrender.com";
const TOKEN_API_URL =
  "https://websocket-location-server.onrender.com/generate-jwt";
const REFRESH_TOKEN_API_URL =
  "https://websocket-location-server.onrender.com/refresh-token";

let socket: Socket | null = null;

// Token management
const fetchToken = async (userId: string): Promise<string> => {
  try {
    const response = await axios.post(TOKEN_API_URL, { userId });
    console.log(response.data);
    return response.data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw new Error("Failed to obtain JWT token");
  }
};

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await axios.post(REFRESH_TOKEN_API_URL, { refreshToken });
    console.log("Refreshed token:", response.data);
    return response.data.token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh JWT token");
  }
};

// Socket initialization
const initializeSocket = async (userId: string): Promise<void> => {
  try {
    const token = await fetchToken(userId);

    if (!socket) {
      socket = io(SOCKET_SERVER_URL, {
        extraHeaders: {
          authorization: token,
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
    console.error("Initialization failed:", error);
  }
};

const getSocket = (): Socket | null => {
  if (!socket) {
    console.warn(
      "Socket has not been initialized. Call initializeSocket first."
    );
  }
  return socket;
};

// Exported functions for token and socket management
export { initializeSocket, getSocket };
// fetchToken, refreshAccessToken,
