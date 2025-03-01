export interface User {
    authId: string;
    roles: string[];
    otpSecret?: string;
    otpEnabled?: boolean;
    otpConfirmed?: boolean;
    otpRecoveryCodes?: string[];
}