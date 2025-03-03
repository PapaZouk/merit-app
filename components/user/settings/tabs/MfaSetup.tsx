import GenerateQRCode from "../../../../islands/auth/GenerateQRCode.tsx";

export default function MfaSetup() {
  return (
    <div class="w-full">
      <div class="mt-4">
        <GenerateQRCode />
      </div>
    </div>
  );
}
