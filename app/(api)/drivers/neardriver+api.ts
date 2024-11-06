import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    // Extract the URL and query parameters
    const url = new URL(request.url);
    const idsParam = url.searchParams.get("ids");

    // Ensure that the idsParam is valid
    if (!idsParam) {
      return new Response(JSON.stringify({ error: "No driver IDs provided" }), {
        status: 400,
      });
    }

    // Split the idsParam into an array of driver IDs, trim whitespace, and ensure they are valid strings
    const driverIds = idsParam
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0); // Ensure non-empty strings

    // Ensure that driverIds is a valid array of strings
    if (driverIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid driverIds array" }),
        { status: 400 }
      );
    }

    // Create a Neon SQL instance
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Prepare the SQL query string, ensuring the IDs are treated as strings in the query
    const query = `SELECT * FROM drivers WHERE clerk_id IN (${driverIds.map((id) => `'${id}'`).join(", ")})`;

    // Execute the query using the driver IDs as parameters
    const response = await sql(query); // Execute the SQL query

    return new Response(JSON.stringify({ data: response }), { status: 200 });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}


// import { neon } from "@neondatabase/serverless";

// export async function GET(request: Request) {
//   try {
//     // Extract the URL and query parameters
//     const url = new URL(request.url);
//     const idsParam = url.searchParams.get("ids");

//     // Ensure that the idsParam is valid
//     if (!idsParam) {
//       return Response.json(
//         { error: "No driver IDs provided" },
//         { status: 400 }
//       );
//     }

//     // Split the idsParam into an array of driver IDs, trim whitespace, and convert to numbers
//     const driverIds = idsParam
//       .split(",")
//       .map((id) => {
//         const trimmedId = id.trim();
//         const parsedId = Number(trimmedId);
//         return isNaN(parsedId) ? null : parsedId; // Return null if parsing fails
//       })
//       .filter((id) => id !== null); // Filter out any invalid IDs

//     // Ensure that driverIds is an array of valid numbers
//     if (driverIds.length === 0) {
//       return Response.json(
//         { error: "Invalid driverIds array" },
//         { status: 400 }
//       );
//     }

//     // Create a Neon SQL instance
//     const sql = neon(`${process.env.DATABASE_URL}`);
//     // Prepare the SQL query string
//     const query = `SELECT * FROM drivers WHERE clerk_id IN (${driverIds.map((id) => id).join(", ")})`;
//     // const query = `SELECT * FROM drivers WHERE clerk_id IN ("user_2mKgwoeCAE2J8IiD3I5DjGX4FrP")`;
//     // const query = `SELECT * FROM drivers WHERE clerk_id IN (${driverIds.map((id) => `'${id}'`).join(", ")})`;

//     // Execute the query using the driver IDs as parameters
//     const response = await sql(query); // Pass query and parameters directly

//     return Response.json({ data: response });
//   } catch (error) {
//     console.error("Error fetching drivers ggg:", error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
