import {useLogin} from "../context/LoginProvider.tsx";
import {useState} from "preact/hooks";
import FormInput from "../../components/employee/forms/FormInput.tsx";
import {AuthConfig} from "./getAuthConfig.ts";

type LoginProps = {
  loginData: {
    login: string;
    password: string;
  };
  setLoginData: (data: (prevData: any) => any) => void;
  authConfig: AuthConfig;
};

export default function Login({ loginData, setLoginData, authConfig }: LoginProps) {
  const { handleLogin } = useLogin();
  const [userCredentials, setUserCredentials] = useState({
    login: "",
    password: "",
  });

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

    handleLogin(userCredentials.login, userCredentials.password, {
      config: authConfig,
    });
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Zaloguj się</h1>
        <form onSubmit={onLogin} class="space-y-4">
          <div>
            <label class="block text-gray-700">Login</label>
            <FormInput
              type={"text"}
              name={"login"}
              value={loginData.login}
              handleChange={handleChange}
              min={3}
              required={true}
            />
          </div>
          <div>
            <label class="block text-gray-700">Hasło</label>
            <FormInput
              type={"password"}
              name={"password"}
              value={loginData.password}
              handleChange={handleChange}
              min={8}
              required={true}
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-500 mt-6 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}
