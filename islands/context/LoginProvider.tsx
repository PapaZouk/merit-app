import { createContext, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { UserRole } from "../../components/utils/auth/types/userRoles.ts";
import {
  AuthClientConfig,
  getAuthClient,
} from "../../components/utils/auth/auth-client/authClient.ts";
import {AuthConfig} from "../auth/getAuthConfig.ts";

type LoginContextProps = {
  userRole: UserRole | string;
  setUserRole: (role: UserRole) => void;
  isLoggedIn: () => boolean;
  handleLogin: (
    login: string,
    password: string,
    config: AuthClientConfig,
  ) => void;
  handleLogout: () => void;
  isLoading: boolean;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

type LoginProviderProps = {
    children: h.JSX.Element;
    authConfig: AuthConfig;
}

export const LoginProvider = ({ children, authConfig }: LoginProviderProps) => {
  const [userRole, setUserRole] = useState<UserRole | string>("guest");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await getAuthClient({ config: authConfig}).get();
        const role = user.labels[0];
        setUserRole(role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        setUserRole("guest");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const isLoggedIn = (): boolean => userRole !== "guest";

  const handleLogin = async (
    login: string,
    password: string,
    config: AuthClientConfig,
  ) => {
    try {
      await getAuthClient(config).createEmailPasswordSession(login, password);
      const user = await getAuthClient(config).get();
      const role = user.labels[0];
      setUserRole(role);
    } catch (e) {
      console.error("Error during login:", e);
      setUserRole("guest");
    }
  };

  const handleLogout = async () => {
    try {
      await getAuthClient({ config: authConfig }).deleteSessions();
      setUserRole("guest");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        userRole,
        setUserRole,
        isLoggedIn,
        handleLogin,
        handleLogout,
        isLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};