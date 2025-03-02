import * as OTPAuth from "jsr:@hectorm/otpauth";
import * as base32 from "jsr:@quentinadam/base32";

export function convertOtpSecret(secret: string): OTPAuth.Secret {
    // Add padding to the right if needed
    const paddedSecret = secret.padEnd(secret.length + (8 - secret.length % 8) % 8, "=");

    try {
        const base32Secret = base32.decode(paddedSecret);

        return new OTPAuth.Secret({
            buffer: base32Secret.buffer,
            size: base32Secret.byteLength,
        });
    } catch (error) {
        console.error("Error decoding secret:", error);
        throw error;
    }
}
