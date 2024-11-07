import axios from "axios";

export async function GET(request: Request) {
  try {
    // Extract latitude and longitude from the request URL
    const url = new URL(request.url);
    const latitude = url.searchParams.get("latitude");
    const longitude = url.searchParams.get("longitude");

    // Validate that both latitude and longitude are provided
    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude are required" }),
        { status: 400 }
      );
    }

    // Define the find-driver endpoint
    const findDriverUrl = `http://localhost:3000/find-driver?latitude=${latitude}&longitude=${longitude}`;

    // Make a GET request to fetch the best driver’s data
    const response = await axios.get(findDriverUrl);

    // Check if the response contains the driver data
    if (response.data && response.data.driverId) {
      // Return the driver data in the expected format
      return new Response(JSON.stringify({ data: response.data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Driver data not found in response" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching driver:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
