import { useState } from "preact/hooks";
import OtpForm from "../../components/auth/form/OtpForm.tsx";
import challengeOtp from "./ChallengeOtp.tsx";
import { useLogin } from "../../components/context/LoginProvider.tsx";
import { convertOtpSecret } from "../../components/auth/utils/convertOtpSecret.ts";

export default function OtpAuth() {
  const { user, handleOtpVerification, handleLogout } = useLogin();
  const [code, setCode] = useState<string>("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );

  const handleChallenge = (event: Event) => {
    event.preventDefault();

    const secret = convertOtpSecret(user?.otpSecret ?? "");

    const isVerified = challengeOtp(code, secret);

    if (isVerified) {
      handleOtpVerification();
      // globalThis.location.reload();
      console.log("OTP verification successful");
    } else {
      setVerificationError("Niepoprawny kod weryfikacji");
      handleLogout();
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Weryfikacja OTP</h1>
        <OtpForm
          handleChallenge={handleChallenge}
          setCode={setCode}
        />
        {verificationError && (
          <p class="mt-4 text-red-500 text-center">{verificationError}</p>
        )}
      </div>
    </div>
  );
}
