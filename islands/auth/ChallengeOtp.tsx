import * as OTPAuth from "jsr:@hectorm/otpauth";
import { getOtpAuthClient } from "../../components/auth/getOtpAuthClient.ts";

type OtpChallengeProps = {
  code: string;
  secret: OTPAuth.Secret;
};

export default function challengeOtp(code: string, secret: OTPAuth.Secret): boolean {
  const totp = getOtpAuthClient(secret);
  const delta = totp.validate({ token: code, window: 1 });
  return delta === 0;
}
