import {Account, Permission, Role} from "npm:appwrite";

export default async function createUserAccount(
  request: {
    email: string;
    password: string;
    userId: string;
    role: string;
  },
  authClient: Account,
) {
  try {
    const result = await authClient.create(
      request.userId,
      request.email,
      request.password,
    );
    result.labels = [request.role];

    Permission.update(Role.user(result.$id, request.role));

    return result.$id;
  } catch (error) {
    console.error((error as Error).message, request);
  }
}
