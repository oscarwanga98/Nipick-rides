import axios from "axios";

export async function GET(request: Request) {
  try {
    // Extract the URL and query parameters
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

    // Make a request to the nearby-drivers endpoint
    const nearbyDriversUrl = `http://192.168.0.102:3000/nearby-drivers?latitude=${latitude}&longitude=${longitude}`;
    const response = await axios.get(nearbyDriversUrl);
    console.log(response)

    // Return the nearby drivers data
    return new Response(JSON.stringify({ data: response.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching nearby drivers:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
