import { PageProps } from "$fresh/server.ts";
import { formatRouteParam } from "../../../../components/utils/formatter/formatRouteParam.ts";
import { updateTimesheetByEmployeeId } from "../../../../components/utils/api-client/clients/timesheetClient.ts";
import { isValidRequestOrigin } from "../../utils/isValidRequestOrigin.ts";

export const handler = async (req: Request, props: PageProps) => {
  if (!isValidRequestOrigin(req)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  const employeeId = formatRouteParam(props);

  if (!employeeId) {
    return new Response(JSON.stringify({ error: "Missing employeeId" }), {
      status: 400,
    });
  }

  let bodyData = null;

  if (req.method === "POST" || req.method === "PUT") {
    bodyData = await req.json();
  }

  if (!bodyData) {
    return new Response(JSON.stringify({ error: "Missing data" }), {
      status: 400,
    });
  }

  try {
    const response = await updateTimesheetByEmployeeId(employeeId, bodyData);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error updating timesheet:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update timesheet" }),
      { status: 500 },
    );
  }
};
