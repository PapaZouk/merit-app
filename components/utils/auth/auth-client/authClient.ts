import { Account, Client } from "npm:appwrite";

export type AuthClientConfig = {
  config: {
    projectId: string;
    endpoint: string;
  };
};

export function getAuthClient({ config }: AuthClientConfig) {
  const authClient = new Client();
  authClient.setProject(config.projectId);
  authClient.setEndpoint(config.endpoint);

  return new Account(authClient);
}
