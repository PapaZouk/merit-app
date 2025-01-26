import { Account, Client } from "npm:appwrite";

export type AuthClientConfig = {
  config: {
    projectId: string;
    endpoint: string;
  };
};

export function getAuthClient() {
  const authClient = new Client();
  const projectId = "673792e0002648d5ee7f";
  const endpoint = "https://cloud.appwrite.io/v1";
  authClient.setProject(projectId);
  authClient.setEndpoint(endpoint);

  return new Account(authClient);
}
