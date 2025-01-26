import {WidgetsLayout} from "../islands/layouts/WidgetsLayout.tsx";
import {LoginProvider} from "../components/context/LoginProvider.tsx";

export default function Home() {
  return (
    <LoginProvider>
      <WidgetsLayout />
    </LoginProvider>
  );
}
