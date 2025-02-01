import {PageProps} from "$fresh/server.ts";
import {isValidRequestOrigin} from "../utils/isValidRequestOrigin.ts";
import {formatRouteParam} from "../../../components/utils/formatter/formatRouteParam.ts";
import {getTimesheetByEmployeeIdYearAndMonth} from "../../../components/utils/api-client/clients/timesheetClient.ts";

export const handler = async (req: Request, props: PageProps) => {
  if (!isValidRequestOrigin(req)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  const url = new URL(props.url);
  const employeeId = formatRouteParam(props);

  if (!employeeId) {
    throw new Error("Missing employee ID parameter");
  }

  const year = url.searchParams.get("year");
  const month = url.searchParams.get("month");

  if (!year || !month) {
    throw new Error("Missing required query parameters");
  }

  const selectedYear = parseInt(year);
  const selectedMonth = parseInt(month);

  try {
    const timesheet = await getTimesheetByEmployeeIdYearAndMonth(
      employeeId,
      selectedYear,
      selectedMonth,
    );
    return new Response(JSON.stringify(timesheet), { status: 200 });
  } catch (error) {
    console.error("Error fetching timesheet:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch timesheet" }),
      { status: 500 },
    );
  }
};
