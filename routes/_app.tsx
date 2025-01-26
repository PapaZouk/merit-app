import {type PageProps} from "$fresh/server.ts";
import RootLayout from "../islands/layouts/RootLayout.tsx";
import {getApiConfig} from "../components/utils/api-client/config/getApiConfig.ts";
import {LoginProvider} from "../components/context/LoginProvider.tsx";

export default function App({ Component }: PageProps) {
  const appName = Deno.env.get("APP_NAME") || "";
  const pageSubtitle = Deno.env.get("APP_SUBTITLE") || "";
  const apiConfig = getApiConfig();

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{appName}{pageSubtitle && ` - ${pageSubtitle}`}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <LoginProvider apiConfig={apiConfig}>
          <RootLayout
            apiConfig={apiConfig}
            appName={appName}
          >
            <Component />
          </RootLayout>
        </LoginProvider>
      </body>
    </html>
  );
}
