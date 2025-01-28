import { addEmployee } from "../../../../components/utils/api-client/clients/employeeClient.ts";
import {isValidRequestOrigin} from "../../utils/isValidRequestOrigin.ts";

export const handler = async (req: Request) => {
  if (!isValidRequestOrigin(req)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  let bodyData = null;

  if (req.method === "POST" || req.method === "PUT") {
    bodyData = await req.json();
  }

  if (!bodyData) {
    throw new Error("Missing body data");
  }

  try {
    const response = await addEmployee(bodyData);
    const { id } = response;
    return new Response(JSON.stringify({ id }), { status: 200 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return new Response(JSON.stringify({ error: "Failed to add employee" }), {
      status: 500,
    });
  }
};
