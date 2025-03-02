import * as OTPAuth from "jsr:@hectorm/otpauth";

export function getOtpAuthClient(secret: OTPAuth.Secret) {
    return new OTPAuth.TOTP({
        issuer: "Merit-App",
        label: "User",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: secret,
    });
}