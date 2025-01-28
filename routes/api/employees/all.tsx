import { getEmployees } from "../../../components/utils/api-client/clients/employeeClient.ts";
import {isValidRequestOrigin} from "../utils/isValidRequestOrigin.ts";

export const handler = async (req: Request) => {
  if (!isValidRequestOrigin(req)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  const cacheTimeout = Deno.env.get("CACHE_EXPIRATION") || "60";

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
