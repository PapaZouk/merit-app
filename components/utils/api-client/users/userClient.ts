import { getApiConfig } from "../config/getApiConfig.ts";

type AddUserRequest = {
  authId: string | undefined;
  roles: string[];
};

export async function addUser(
  user: AddUserRequest,
) {
  if (!user.authId || user.authId === "") {
    throw new Error("User authId is required");
  }

  if (!user.roles || user.roles.length === 0) {
    throw new Error("User roles are required");
  }

  const { url, token } = getApiConfig();
  const response = await fetch(`${url}/api/auth/user/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (response.status !== 200) {
    throw new Error("Failed to add user");
  }

  return response.json();
}

export async function getUserByAuthId(authId: string) {
  const { url, token } = getApiConfig();
  console.log("URL: ", url);
  const response = await fetch(`${url}/api/auth/user/${authId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    console.log(`Failed to fetch user with authId: ${authId}`, response);
    throw new Error("Failed to fetch user roles");
  }

  return response.json();
}

export async function updateUserByAuthId(authId: string, data: any) {
    const { url, token } = getApiConfig();
    const response = await fetch(`${url}/api/auth/user/update/${authId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 200) {
        console.log(`Failed to update user with authId: ${authId}`, response);
        throw new Error("Failed to update user roles");
    }

    return response.json();
}
