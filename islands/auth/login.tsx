import { useEffect, useState } from "preact/hooks";
import FormInput from "../../components/common/forms/FormInput.tsx";
import { useLogin } from "../../components/context/LoginProvider.tsx";
import { mapAppwriteErrorMessage } from "../../components/auth/mapAppwriteErrorMessage.ts";
import ErrorMessage from "../../components/common/messages/ErrorMessage.tsx";

type LoginProps = {
  loginData: {
    login: string;
    password: string;
  };
  setLoginData: (data: (prevData: any) => any) => void;
};

export default function Login(
  { loginData, setLoginData }: LoginProps,
) {
  const { handleLogin, loginError, loginErrorCode } = useLogin();
  const [userCredentials, setUserCredentials] = useState({
    login: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (loginError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5.000);
      return () => clearTimeout(timer);
    }

    if (loginErrorCode) {
      setErrorMessage(mapAppwriteErrorMessage(loginErrorCode));
    }
  }, [loginError, loginErrorCode]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setUserCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setLoginData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = (e: Event): void => {
    e.preventDefault();

    handleLogin(userCredentials.login, userCredentials.password);
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Zaloguj się</h1>
        <form onSubmit={onLogin} class="space-y-4">
          <div>
            <label class="block text-gray-700">Login</label>
            <FormInput
              id="login"
              type="text"
              name="login"
              value={loginData.login}
              handleChange={handleChange}
              extraClass="w-full p-2"
              min={3}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label class="block text-gray-700">Hasło</label>
            <FormInput
              id="password"
              type="password"
              name="password"
              value={loginData.password}
              handleChange={handleChange}
              extraClass="w-full p-2"
              min={8}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-500 mt-6 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Zaloguj
          </button>
        </form>
        {loginError && (
          <ErrorMessage>
            {errorMessage
              ? <strong>{errorMessage}</strong>
              : <strong>Nie udało się zalogować</strong>}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
}
