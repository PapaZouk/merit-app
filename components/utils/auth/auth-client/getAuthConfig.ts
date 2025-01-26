export type AuthConfig = {
    projectId: string;
    endpoint: string;
}

export function getAuthConfig(): AuthConfig {
    const PROJECT_ID = Deno.env.get("AUTH_PROJECT_ID") || '';
    const ENDPOINT = Deno.env.get("AUTH_ENDPOINT") || '';

    return {
        projectId: PROJECT_ID,
        endpoint: ENDPOINT
    }
}