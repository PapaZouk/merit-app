import {Account} from "npm:appwrite";

export default async function createUserAccount(
  request: {
    email: string;
    password: string;
    userId: string,
  },
  authClient: Account,
) {
  try {
    const result = await authClient.create(
      request.userId,
      request.email,
      request.password,
    );

    return result.$id;
  } catch (error) {
    console.error((error as Error).message, request);
  }
}
