import {createContext, h} from "preact";
import {useContext, useEffect, useState} from "preact/hooks";
import {UserRole, UserRoleEnum,} from "../../components/utils/auth/types/userRoles.ts";
import {AuthClientConfig, getAuthClient,} from "../../components/utils/auth/auth-client/authClient.ts";
import {AuthConfig} from "../auth/getAuthConfig.ts";
import {getUserByAuthId} from "../../components/utils/api-client/clients/userClient.ts";
import {User} from "../../components/utils/api-client/types/User.ts";

type LoginContextProps = {
  userId: string|null;
  user: User|null;
  userRoles: UserRole[] | string[];
  setUserRole: (roles: UserRole[]) => void;
  isLoggedIn: () => boolean;
  handleLogin: (
    login: string,
    password: string,
    config: AuthClientConfig,
  ) => void;
  handleLogout: () => void;
  isLoading: boolean;
  loginError: boolean;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

type LoginProviderProps = {
  children: h.JSX.Element;
  authConfig: AuthConfig;
  apiConfig: {
    url: string;
    token: string;
  };
};

export const LoginProvider = (
  { children, authConfig, apiConfig }: LoginProviderProps,
) => {
  const [userId, setUserId] = useState<string|null>(null);
  const [user, setUser] = useState<User|null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[] | string[]>([
    UserRoleEnum.GUEST,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await getAuthClient({ config: authConfig }).get();

        const userByAuthId = await getUserByAuthId(
          user.$id,
          apiConfig.url,
          apiConfig.token,
        );
        setUser(userByAuthId.result);
        setUserId(user.$id);

        const roles = userByAuthId.result.roles;
        setUserRoles(roles);
      } catch (_error) {
        setUserRoles([UserRoleEnum.GUEST]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const isLoggedIn = (): boolean => {
    return !(userRoles.length === 0 ||
      (userRoles.length === 1 && userRoles[0] === UserRoleEnum.GUEST));
  };

  const handleLogin = async (
    login: string,
    password: string,
    config: AuthClientConfig,
  ) => {
    try {
      await getAuthClient(config).createEmailPasswordSession(login, password);
      const user = await getAuthClient(config).get();


      const userByAuthId = await getUserByAuthId(
          user.$id,
          apiConfig.url,
          apiConfig.token,
      );

      const roles = userByAuthId.result.roles;
      setUserRoles(roles);
      setLoginError(false);
    } catch (e) {
      console.error("Error during login:", e);
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 3000);
      setUserRoles([UserRoleEnum.GUEST]);
    }
  };

  const handleLogout = async () => {
    try {
      await getAuthClient({ config: authConfig }).deleteSessions();
      setUserRoles([UserRoleEnum.GUEST]);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        userId: userId,
        user: user,
        userRoles: userRoles,
        setUserRole: setUserRoles,
        isLoggedIn,
        handleLogin,
        handleLogout,
        isLoading,
        loginError,
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
