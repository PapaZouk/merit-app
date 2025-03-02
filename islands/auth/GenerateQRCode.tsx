import { ShieldCheck, CircleAlert } from "https://esm.sh/lucide-preact@latest";
import QRCode from "npm:qrcode";
import * as OTPAuth from "jsr:@hectorm/otpauth";
import { useEffect, useState } from "preact/hooks";
import challengeOtp from "./ChallengeOtp.tsx";
import generateOtp from "../../components/auth/generateOtp.tsx";
import { useLogin } from "../../components/context/LoginProvider.tsx";
import OtpForm from "../../components/auth/form/OtpForm.tsx";
import { User } from "../../components/utils/api-client/types/User.ts";

export default function GenerateQRCode() {
  const [qrUrl, setUrl] = useState("");
  const [secret, setSecret] = useState<OTPAuth.Secret | null>(null);
  const [code, setCode] = useState<string>("");
  const [isValidOtp, setValidOtp] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userId, user } = useLogin();
  const [userData, setUserData] = useState<User | null>(user);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const responseData = await response.json();
        const data = responseData.result as User;
        console.log("QR, User data: ", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    async function generateQrCode() {
      const otp = generateOtp();
      setSecret(otp.secret);

      try {
        const url = await QRCode.toDataURL(otp.qrUrl);
        setUrl(url);
      } catch (error) {
        console.error(error);
      }
    }

    if (userData && !userData.otpConfirmed) {
      generateQrCode();
    } else {
      fetchUserDetails();
    }
  }, [user]);

  const handleChallenge = async (event: Event) => {
    event.preventDefault();

    if (!secret) {
      console.error("Secret not set");
      return;
    }

    const isValidated = challengeOtp(code, secret);

    if (isValidated) {
      setValidOtp(isValidated);

      const request = {
        ...user,
        otpSecret: secret.base32,
        otpEnabled: true,
        otpConfirmed: true,
      };

      try {
        const response = await fetch(`/api/users/update/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        if (response.status === 200) {
          console.log("User updated successfully");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setError("Failed to update user");
      }
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      {userData && userData.otpEnabled
        ? (
          <>
            <div className="flex items-center space-x-2 text-green-500">
              <div className="flex justify-center items-center h-48">
                <ShieldCheck className="w-24 h-24 text-green-500 animate-check" />
              </div>
              <h2 className="text-green-500 text-2xl font-bold ml-4">
                Weryfikacja dwuetapowa włączona
              </h2>
            </div>
          </>
        )
        : (
          <>
            <h1 className="text-2xl font-bold mb-4">
              Zeskanuj kod QR w aplikacji uwierzytelniającej
            </h1>
            {!isValidOtp
              ? (
                qrUrl
                  ? (
                    <img
                      src={qrUrl}
                      alt="OTP QR Code"
                      className="mb-4 mx-auto"
                    />
                  )
                  : <p className="text-gray-500">Generowanie kodu QR...</p>
              )
              : (
                (
                  <div className="flex items-center space-x-2 text-green-500">
                    <div className="flex justify-center items-center h-48">
                      <ShieldCheck className="w-24 h-24 text-green-500 animate-check" />
                      Uwierzytelnianie zakończone
                    </div>
                  </div>
                )
              )}
            {!userData?.otpEnabled && !isValidOtp && (
                <div>
                  <OtpForm
                      handleChallenge={handleChallenge}
                      setCode={setCode}
                  />
                </div>
            )}
          </>
          )}
      {error && <p className="mt-4 text-red-500">
        <CircleAlert size={16} className="w-24 h-24 text-red-500 animate-check"/> {error}
      </p>}
    </div>
  );
}
