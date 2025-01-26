import { PageProps } from "$fresh/server.ts";
import { updateEmployeeById } from "../../../../components/utils/api-client/clients/employeeClient.ts";

export const handler = async (req: Request, props: PageProps) => {
  const origin = req.headers.get("origin") || req.headers.get("referer");
  const allowedOrigin = Deno.env.get("BASE_URL") || "";

  if (!origin || !origin.startsWith(allowedOrigin)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  const url = new URL(props.url);
  const pathElements = url.pathname.split("/").filter(Boolean);
  const employeeId = pathElements[pathElements.length - 1].split("?")[0];

  if (!employeeId) {
    throw new Error("Missing employeeId");
  }

  let bodyData = null;

  if (req.method === "POST" || req.method === "PUT") {
    bodyData = await req.json();
  }

  if (!bodyData) {
    throw new Error("Missing body data");
  }

  try {
    const response = await updateEmployeeById(employeeId, bodyData);

    if (response.status !== 200) {
      throw new Error("Failed to update employee");
    }

    const employees = response.json();
    return new Response(JSON.stringify(employees), { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch employees" }),
      { status: 500 },
    );
  }
};
