import * as OTPAuth from "jsr:@hectorm/otpauth";
import {getOtpAuthClient} from "./getOtpAuthClient.ts";

export default function generateOtp() {
    const secret = new OTPAuth.Secret({ size: 20 });

    const totp = getOtpAuthClient(secret);

    const uri = OTPAuth.URI.stringify(totp);

    return {
        qrUrl: uri,
        secret: secret,
    };
}