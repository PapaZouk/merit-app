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
