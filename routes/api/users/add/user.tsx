import {addUser} from "../../../../components/utils/api-client/clients/userClient.ts";

export const handler = async (req: Request) => {
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

    let bodyData = null;

    if (req.method === "POST" || req.method === "PUT") {
        bodyData = await req.json();
    }

    if (!bodyData) {
        throw new Error("Missing body data");
    }

    try {
        const response = await addUser(bodyData);

        if (!response) {
            throw new Error("Failed to add user");
        }

        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error("Error adding user:", error);
        return new Response(JSON.stringify({ error: "Failed to add user" }), { status: 500})
    }
}