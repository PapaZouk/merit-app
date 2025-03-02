import {LoginProvider} from "../../../../components/context/LoginProvider.tsx";
import GenerateQRCode from "../../../../islands/auth/GenerateQRCode.tsx";

export default function generateToken() {
  return (
    <LoginProvider>
      <GenerateQRCode />
    </LoginProvider>
  );
}
