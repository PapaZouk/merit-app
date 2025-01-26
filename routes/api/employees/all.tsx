import { getEmployees } from "../../../components/utils/api-client/clients/employeeClient.ts";

export const handler = async (req: Request) => {
  const origin = req.headers.get("origin") || req.headers.get("referer");
  const allowedOrigin = Deno.env.get("BASE_URL") || "";
  const cacheTimeout = Deno.env.get("CACHE_EXPIRATION") || "60";

  if (!origin || !origin.startsWith(allowedOrigin)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  try {
    const employees = await getEmployees(cacheTimeout);
    return new Response(JSON.stringify(employees), { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch employees" }),
      { status: 500 },
    );
  }
};
