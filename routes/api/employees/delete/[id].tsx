import { PageProps } from "$fresh/server.ts";
import { deleteEmployeeById } from "../../../../components/utils/api-client/clients/employeeClient.ts";

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

  try {
    await deleteEmployeeById(employeeId);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete employee" }),
      { status: 500 },
    );
  }
};
