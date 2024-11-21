import axios from "axios";

export async function POST(request: Request) {
  try {
    // Parse the request body to extract necessary data
    const requestBody = await request.json();
    const {
      distance,
      duration,
      origin,
      destination,
      tripTime,
      latitude,
      longitude,
    } = requestBody;

    // Validate that the required parameters are provided
    if (
      !distance ||
      !duration ||
      !origin ||
      !destination ||
      !latitude ||
      !longitude
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Distance, duration, origin, destination, latitude, and longitude are required",
        }),
        { status: 400 }
      );
    }

    // Prepare the payload for the pricing API
    const payload = {
      distance,
      duration,
      origin,
      destination,
      tripTime, // Optional
      latitude,
      longitude,
    };

    // Make a request to the calculate-prices endpoint
    const calculatePricesUrl = `https://pricing-trinity-api.onrender.com/calculate-prices`;
    const response = await axios.post(calculatePricesUrl, payload);

    // Return the calculated prices data
    return new Response(
      JSON.stringify({
        baseFare: response.data.baseFare,
        distanceCost: response.data.distanceCost,
        timeCost: response.data.timeCost,
        surgeMultiplier: response.data.surgeMultiplier,
        weatherAdjustment: response.data.weatherAdjustment,
        driverRatingAdjustment: response.data.driverRatingAdjustment,
        prices: response.data.prices,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error calculating prices:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
