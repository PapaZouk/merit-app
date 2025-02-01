import {createContext, h} from "preact";
import {Signal, useSignal} from "@preact/signals";
import {useContext, useEffect} from "preact/hooks";
import {UserRole, UserRoleEnum} from "../utils/auth/types/userRoles.ts";
import {getAuthClient,} from "../utils/auth/auth-client/authClient.ts";
import {User} from "../utils/api-client/types/User.ts";

type LoginContextProps = {
  userId: string | null;
  user: User | null;
  userRoles: UserRole[] | string[];
  setUserRole: (roles: UserRole[]) => void;
  isLoggedIn: () => boolean;
  handleLogin: (
    login: string,
    password: string,
  ) => void;
  handleLogout: () => void;
  validateUserRoles: (roles: string[], expectedRoles: UserRoleEnum[]) => boolean;
  isLoading: boolean;
  loginError: boolean;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

type LoginProviderProps = {
  children: h.JSX.Element;
};

export const LoginProvider = (
  { children }: LoginProviderProps,
) => {
  const userId: Signal<string | null> = useSignal<string | null>(null);
  const user: Signal<User | null> = useSignal<User | null>(null);
  const userRoles: Signal<UserRole[]|string[]> = useSignal<UserRole[] | string[]>([
    UserRoleEnum.GUEST,
  ]);
  const isLoading: Signal<boolean> = useSignal<boolean>(true);
  const loginError: Signal<boolean> = useSignal<boolean>(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userResponse = await getAuthClient().get();

        const response = await fetch(`/api/users/roles/${userResponse.$id}`);
        userRoles.value = await response.json();

        user.value = {
          authId: userResponse.$id,
          roles: userRoles.value,
        };

        userId.value = userResponse.$id;
      } catch (_error) {
        userRoles.value = [UserRoleEnum.GUEST];
      } finally {
        isLoading.value = false;
      }
    };

    fetchUserRole();
  }, []);

  const isLoggedIn = (): boolean => {
    return !(userRoles.value.length === 0 ||
      (userRoles.value.length === 1 && userRoles.value[0] === UserRoleEnum.GUEST));
  };

  const handleLogin = async (
    login: string,
    password: string,
  ) => {
    try {
      await getAuthClient().createEmailPasswordSession(login, password);
      const user = await getAuthClient().get();

      userRoles.value = user.labels;
      loginError.value = false;
    } catch (e) {
      console.error("Error during login:", e);
      loginError.value = true;
      setTimeout(() => {
        loginError.value = false;
      }, 3000);
      userRoles.value = [UserRoleEnum.GUEST];
    }
  };

  const handleLogout = async () => {
    try {
      await getAuthClient().deleteSessions();
      userRoles.value = [UserRoleEnum.GUEST];
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const setUserRoles = (roles: UserRole[]) => {
    userRoles.value = roles;
  }

  const validateUserRoles = (roles: string[], expectedRoles: UserRoleEnum[]): boolean => {
    return roles.some((role: string) => expectedRoles.includes(role as UserRoleEnum));
  }

  return (
    <LoginContext.Provider
      value={{
        userId: userId.value,
        user: user.value,
        userRoles: userRoles.value,
        setUserRole: setUserRoles,
        isLoggedIn,
        handleLogin,
        handleLogout,
        validateUserRoles: validateUserRoles,
        isLoading: isLoading.value,
        loginError: loginError.value,
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
