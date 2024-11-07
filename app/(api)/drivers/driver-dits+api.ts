import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const clerkId = url.searchParams.get("clerk_id");

    if (!clerkId) {
      return Response.json({ error: "clerk_id is required" }, { status: 400 });
    }

    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
      SELECT * 
      FROM drivers 
      WHERE clerk_id = ${clerkId}
    `;

    if (response.length === 0) {
      return Response.json(
        { error: "No drivers found with the provided clerk_id" },
        { status: 404 }
      );
    }

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
