import { PageProps } from "$fresh/server.ts";
import { deleteEmployeeById } from "../../../../components/utils/api-client/clients/employeeClient.ts";
import {isValidRequestOrigin} from "../../utils/isValidRequestOrigin.ts";
import {formatRouteParam} from "../../../../components/utils/formatter/formatRouteParam.ts";

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
