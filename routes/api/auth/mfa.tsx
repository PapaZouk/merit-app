import GenerateQRCode from "../../../islands/auth/GenerateQRCode.tsx";
import {LoginProvider} from "../../../components/context/LoginProvider.tsx";

export default function generateToken() {
  return (
    <LoginProvider>
      <GenerateQRCode />
    </LoginProvider>
  );
}
