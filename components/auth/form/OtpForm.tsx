import { useState } from "preact/hooks";
import VerifyButton from "../../buttons/VerifyButton.tsx";
import FormInput from "../../forms/FormInput.tsx";

type OtpFormProps = {
  handleChallenge: (event: Event) => void;
  setCode: (code: string) => void;
};

export default function OtpForm(
  { handleChallenge, setCode }: OtpFormProps,
) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const handleChange = (event: Event, index: number) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setCode(newOtp.join(""));

      if (value !== "" && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  return (
    <form onSubmit={handleChallenge} className="space-y-4">
      <div className="flex space-x-2 justify-center">
        {otp.map((value, index) => (
          <FormInput
            type="text"
            name={`otp-input-${index}`}
            max={1}
            value={value}
            handleChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <div className="flex justify-center">
        <VerifyButton />
      </div>
    </form>
  );
}
