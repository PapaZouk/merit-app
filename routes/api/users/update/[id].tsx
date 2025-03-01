import { PageProps } from "$fresh/server.ts";
import { isValidRequestOrigin } from "../../utils/isValidRequestOrigin.ts";
import { formatRouteParam } from "../../../../components/utils/formatter/formatRouteParam.ts";
import {updateUserByAuthId} from "../../../../components/utils/api-client/users/userClient.ts";

export const handler = async (req: Request, props: PageProps) => {
  if (!isValidRequestOrigin(req)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  const userId = formatRouteParam(props);

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
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
    const response = await updateUserByAuthId(userId, bodyData);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update user" }),
      { status: 500 },
    );
  }
};
