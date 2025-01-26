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

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return response.json();
}

export async function getUserByAuthId(
  authId: string,
  url: string,
  token: string,
) {
  const response = await fetch(`${url}/api/auth/user/${authId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user roles");
  }

  return response.json();
}
